import { useEffect, useState } from "react"
import { supabase } from "@/createClient"

import { SignOutButton } from "@/components/SignOutButton"
import { SignInButton } from "@/components/SignInButton"
import { SignUpButton } from "@/components/SignUpButton"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getSessionUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setIsAuthenticated(true)
      }
    }
    getSessionUser()
  }, [])

  return (
    <div className="flex justify-between items-center w-full px-5 py-3 mb-5">
      <Link to="/" className="text-2xl font-bold ">
        ZF
      </Link>

      <div className="flex items-center gap-5">
        {isAuthenticated ? (
          <nav>
            <Button className="px-2" variant={"link"} onClick={() => navigate("/")}>
              Início
            </Button>
            <Button className="px-2" variant={"link"} onClick={() => navigate("/profile")}>
              Acessar perfil
            </Button>
          </nav>
        ) : (
          <SignUpButton />
        )}
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  )
}
