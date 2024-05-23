import { Button } from "@/components/ui/button"
import { Navbar } from "@/templates/Navbar"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="container flex flex-col max-w-[1000px]">
        <section className="flex w-full justify-center items-center">
          <div className="flex flex-col items-center gap-3 w-full">
            <h1 className="text-4xl font-bold text-center">
              Sua Ajuda Pode Transformar Vidas
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Uma simples ação pode fazer a diferença e acabar com a fome no
              mundo.
            </p>
            <Button
              onClick={() => navigate("/signup")}
              className="w-fit text-md">
              Fazer a diferença
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
