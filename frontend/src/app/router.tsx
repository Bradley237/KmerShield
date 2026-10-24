import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { PrivateLayout } from '../layouts/PrivateLayout'

import { Home } from '../pages/public/Home'
import { Privacy } from '../pages/public/Privacy'
import { Terms } from '../pages/public/Terms'
import { Contact } from '../pages/public/Contact'
import { NotFound } from '../pages/public/NotFound'

import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { ForgotPassword } from '../pages/auth/ForgotPassword'
import { ResetPassword } from '../pages/auth/ResetPassword'

import { Overview } from '../pages/dashboard/Overview'
import { NewAnalysis } from '../pages/dashboard/NewAnalysis'
import { Analyses } from '../pages/dashboard/Analyses'
import { AnalysisDetail } from '../pages/dashboard/AnalysisDetail'
import { History } from '../pages/dashboard/History'
import { Alerts } from '../pages/dashboard/Alerts'
import { Profile } from '../pages/dashboard/Profile'
import { Settings } from '../pages/dashboard/Settings'
import { Forbidden } from '../pages/dashboard/Forbidden'
import { DashboardNotFound } from '../pages/dashboard/DashboardNotFound'

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
  // Private Dashboard Routes (Guarded by PrivateLayout)
  {
    path: '/dashboard',
    element: <PrivateLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'analyses', element: <Analyses /> },
      { path: 'analyses/nouveau', element: <NewAnalysis /> },
      { path: 'analyses/:id', element: <AnalysisDetail /> },
      { path: 'historique', element: <History /> },
      { path: 'alertes', element: <Alerts /> },
      { path: 'profil', element: <Profile /> },
      { path: 'parametres', element: <Settings /> },
      { path: '403', element: <Forbidden /> },
      { path: '*', element: <DashboardNotFound /> },
    ],
  },
  // Dev-Only Design System Showcase
  {
    path: '/_design',
    element: <DesignSystemPage />,
  },
])
