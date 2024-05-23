import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function SignUpButton() {
  const navigate = useNavigate()
  
  return (
    <Button
      onClick={() => navigate("/signup")}
      variant={"outline"}
      className="hover:bg-primary hover:text-white">
      Cadastre-se
    </Button>
  )
}
