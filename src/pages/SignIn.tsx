import { useEffect, useState } from "react"
import { supabase } from "@/createClient"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    async function getSessionUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        navigate("/profile")
      }
    }
    getSessionUser()
  }, [navigate])

  async function signInUser(e: { preventDefault: () => void }) {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      if (data.session) {
        navigate("/profile")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-full px-5 mt-10">
        <form
          onSubmit={signInUser}
          className="flex flex-col max-w-[500px] w-full gap-5">
          <h1 className="flex text-3xl justify-center font-bold mb-5 gap-5">
            Entre em sua conta
          </h1>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-muted-foreground text-sm">
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-black font-semibold">
                Crie agora
              </Link>
            </p>
          </div>
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </>
  )
}
