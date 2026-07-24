import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// This code is the Protected wrapper component for react Router
// It act as a guard for specific pages of react application
// If a user is logged in , it let them view the pages like document upload
// Otherwise he will be redirected to login page

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}