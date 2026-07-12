import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import AppShell from '@/components/layout/AppShell'
import { FullPageSpinner } from '@/components/ui/Spinner'

// Public pages
const Landing = lazy(() => import('@/pages/Landing'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Protected pages
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const AssetList = lazy(() => import('@/pages/assets/AssetList'))
const AddAsset = lazy(() => import('@/pages/assets/AddAsset'))
const EditAsset = lazy(() => import('@/pages/assets/EditAsset'))
const AssetDetails = lazy(() => import('@/pages/assets/AssetDetails'))
const IssueList = lazy(() => import('@/pages/issues/IssueList'))
const ReportIssue = lazy(() => import('@/pages/issues/ReportIssue'))
const QRScanner = lazy(() => import('@/pages/QRScanner'))
const Profile = lazy(() => import('@/pages/Profile'))
const Settings = lazy(() => import('@/pages/Settings'))

function PublicOnlyRoute({ children }) {
  const { currentUser, loading } = useAuth()
  if (loading) return <FullPageSpinner />
  return currentUser ? <Navigate to="/dashboard" replace /> : children
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<PublicOnlyRoute><Landing /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />

        {/* Protected — wrapped in AppShell */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AppShell>
                <AssetList />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets/new"
          element={
            <ProtectedRoute>
              <AppShell>
                <AddAsset />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets/:id"
          element={
            <ProtectedRoute>
              <AppShell>
                <AssetDetails />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assets/:id/edit"
          element={
            <ProtectedRoute>
              <AppShell>
                <EditAsset />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/issues"
          element={
            <ProtectedRoute>
              <AppShell>
                <IssueList />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/issues/new"
          element={
            <ProtectedRoute>
              <AppShell>
                <ReportIssue />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <AppShell>
                <QRScanner />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppShell>
                <Profile />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppShell>
                <Settings />
              </AppShell>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
