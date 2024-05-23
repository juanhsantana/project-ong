import { supabase } from "@/createClient"
import { ReactNode, useEffect, useState } from "react"

import { Home } from "@/pages/Home"
import { Profile } from "@/pages/Profile"
import { SignIn } from "@/pages/SignIn"
import { SignUp } from "@/pages/SignUp"
import { Routes, Route, Navigate } from "react-router-dom"

interface PrivateRouteProps {
  children: ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getSessionUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }
    getSessionUser()
  }, [])

  if (loading) return null

  return isAuthenticated ? children : <Navigate to="/signin" />
}

export function AppRoutes() {
  // const [token, setToken] = useState<string | undefined>(undefined)

  // useEffect(() => {
  //   getSessionUser()
  // })

  // async function getSessionUser() {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession()
  //   setToken(session?.access_token)
  // }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
