import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'
import { AuthLayout } from '../layouts/AuthLayout'

import { Home } from '../pages/public/Home'
import { Privacy } from '../pages/public/Privacy'
import { Terms } from '../pages/public/Terms'
import { Contact } from '../pages/public/Contact'
import { NotFound } from '../pages/public/NotFound'

import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { ForgotPassword } from '../pages/auth/ForgotPassword'
import { ResetPassword } from '../pages/auth/ResetPassword'

import { DesignSystemPage } from '../pages/dev/DesignSystemPage'

export const router = createBrowserRouter([
  // Public Routes with Header + Footer
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/confidentialite', element: <Privacy /> },
      { path: '/conditions', element: <Terms /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // Auth Split-Screen Routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/connexion', element: <Login /> },
      { path: '/inscription', element: <Register /> },
      { path: '/mot-de-passe-oublie', element: <ForgotPassword /> },
      { path: '/reinitialisation', element: <ResetPassword /> },
    ],
  },
  // Dev-Only Design System Showcase
  {
    path: '/_design',
    element: <DesignSystemPage />,
  },
])
