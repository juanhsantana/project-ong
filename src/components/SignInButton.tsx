import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function SignInButton() {
  const navigate = useNavigate()
  
  return (
    <Button onClick={() => navigate("/signin")} className="">
      Entrar
    </Button>
  )
}
