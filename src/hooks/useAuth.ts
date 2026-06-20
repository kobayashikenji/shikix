import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  linkWithPopup,
  linkWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const googleProvider = new GoogleAuthProvider()

const hasCode = (err: unknown, code: string): boolean =>
  err instanceof Error && 'code' in err && (err as { code: string }).code === code

export function useAuth() {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u ? { ...u } : null)
      setLoading(false)
    })
    return unsub
  }, [])

  const isAnonymous = user?.isAnonymous ?? true
  const isLoggedIn  = !!user && !isAnonymous

  /**
   * 匿名アカウントにGoogleアカウントをリンクしてアップグレード。
   * すでにそのアカウントで別端末からログイン済みの場合は通常ログインにフォールバック。
   */
  const signInWithGoogle = async () => {
    const current = auth.currentUser
    try {
      const result = current?.isAnonymous
        ? await linkWithPopup(current, googleProvider)
        : await signInWithPopup(auth, googleProvider)
      setUser({ ...result.user })
    } catch (err: unknown) {
      if (hasCode(err, 'auth/credential-already-in-use')) {
        const result = await signInWithPopup(auth, googleProvider)
        setUser({ ...result.user })
      } else {
        throw err
      }
    }
  }

  /**
   * メールアドレス + パスワードで新規登録。
   * 匿名アカウントにリンクしてレビュー履歴を引き継ぐ。
   * 登録済みのメールアドレスの場合は通常ログインにフォールバック。
   */
  const emailSignUp = async (email: string, password: string) => {
    const current = auth.currentUser
    const credential = EmailAuthProvider.credential(email, password)
    try {
      const result = current?.isAnonymous
        ? await linkWithCredential(current, credential)
        : await createUserWithEmailAndPassword(auth, email, password)
      setUser({ ...result.user })
    } catch (err: unknown) {
      if (hasCode(err, 'auth/email-already-in-use') || hasCode(err, 'auth/credential-already-in-use')) {
        const result = await signInWithEmailAndPassword(auth, email, password)
        setUser({ ...result.user })
      } else {
        throw err
      }
    }
  }

  /**
   * メールアドレス + パスワードでログイン。
   */
  const emailSignIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    setUser({ ...result.user })
  }

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email)

  const signOut = () => firebaseSignOut(auth)

  return {
    user, loading, isLoggedIn, isAnonymous,
    signInWithGoogle, emailSignUp, emailSignIn, resetPassword, signOut,
  }
}
