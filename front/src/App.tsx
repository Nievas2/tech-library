import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
import HomePage from "./pages/home/HomePage"

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from "./pages/landing/LandingPage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import FavoritesPage from "./pages/favorites/FavoritesPage"
import UserDashboardPage from "./pages/userDashboard/UserDashboardPage"
import AdminDashboardPage from "./pages/adminDashboard/AdminDashboard"

function App() {
  const location = useLocation();
  const noPadding = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <main className="bg-light dark:bg-dark">
      <section className="w-full font-poppins flex flex-col justify-center items-center min-h-screen">
        <Navbar />

        <div className={`flex flex-col justify-start items-center gap-7 flex-1 max-w-7xl ${!noPadding ? 'pt-16' : ''}`}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/favorites' element={<FavoritesPage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<RegisterPage />} />

            <Route path='/user-dashboard' element={<UserDashboardPage />} />
            <Route path='/admin-dashboard' element={<AdminDashboardPage />} />

            <Route path='/404' element={<h1>Not found</h1>} />
            <Route path="/*" element={ <Navigate to="/404" replace />} />
          </Routes>
        </div>
        
        <Footer />
      </section>
    </main>
      
  )
}

export default App