import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Flame, Users, BookOpen } from 'lucide-react'

const NAV = [
  { path: '/',       icon: Home,     label: '公演' },
  { path: '/hot',    icon: Flame,    label: 'Hot' },
  { path: '/casts',  icon: Users,    label: 'キャスト' },
  { path: '/my',     icon: BookOpen, label: 'マイページ' },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
                    flex justify-around items-center h-16 px-2 z-50
                    max-w-lg mx-auto">
      {NAV.map(({ path, icon: Icon, label }) => {
        const active = pathname === path
        return (
          <button
            key={path}
            onClick={() => nav(path)}
            className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition-colors
              ${active
                ? path === '/hot' ? 'text-orange-500' : 'text-shiki-accent'
                : 'text-gray-400 hover:text-gray-700'}`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
