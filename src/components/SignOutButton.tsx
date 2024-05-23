import { supabase } from "@/createClient"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function SignOutButton() {
  const navigate = useNavigate()

  async function signOutUser() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    }
    navigate('/signin')
  }

  return <Button onClick={signOutUser}>Sair</Button>
}
