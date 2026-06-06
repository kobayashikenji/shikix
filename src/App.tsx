import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BottomNav } from './components/BottomNav'
import { HomePage } from './pages/HomePage'
import { HotPage } from './pages/HotPage'
import { ShowDetailPage } from './pages/ShowDetailPage'
import { ReviewFormPage } from './pages/ReviewFormPage'
import { CastsPage } from './pages/CastsPage'
import { CastDetailPage } from './pages/CastDetailPage'
import { MyPage } from './pages/MyPage'
import { TheaterPage } from './pages/TheaterPage'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isFullscreen = location.pathname.includes('/review/new')

  return (
    <>
      <div className="max-w-lg mx-auto px-4 pb-20 min-h-screen">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/hot" element={<PageWrapper><HotPage /></PageWrapper>} />
          <Route path="/shows/:id" element={<PageWrapper><ShowDetailPage /></PageWrapper>} />
          <Route path="/shows/:id/review/new" element={<PageWrapper><ReviewFormPage /></PageWrapper>} />
          <Route path="/casts" element={<PageWrapper><CastsPage /></PageWrapper>} />
          <Route path="/casts/:id" element={<PageWrapper><CastDetailPage /></PageWrapper>} />
          <Route path="/my" element={<PageWrapper><MyPage /></PageWrapper>} />
          <Route path="/theaters/:id" element={<PageWrapper><TheaterPage /></PageWrapper>} />
        </Routes>
      </div>
      {!isFullscreen && <BottomNav />}
      {isFullscreen && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
