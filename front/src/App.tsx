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
import { useAuthContext } from "./contexts"
import AuthPage from "./pages/auth/AuthPage"

function App() {
  const location = useLocation();
  const noPadding = ['/', '/login', '/signup', '/home'].includes(location.pathname);

  const { authUser } = useAuthContext();
  return (
    <main className="bg-light dark:bg-dark text-dark dark:text-light">
      <section className="w-full font-poppins flex flex-col justify-center items-center min-h-screen">
        <Navbar />

        <div className={`flex flex-1 max-w-7xl ${!noPadding ? 'pt-[120px]' : 'pt-24'}`}>
          <Routes>
            <Route path='/' element={ authUser ? <LandingPage /> : <Navigate to={"/login"} /> } />
            <Route path='/home' element={ authUser ? <HomePage /> : <Navigate to={"/login"} /> } />
            <Route path='/favorites' element={<FavoritesPage />} />

            <Route path='/login' element={ authUser ? <Navigate to='/home' /> : <LoginPage /> } />
            <Route path='/login/auth' element={ <AuthPage /> } />
            <Route path='/signup' element={ authUser ? <Navigate to='/home' /> : <RegisterPage /> } />

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
