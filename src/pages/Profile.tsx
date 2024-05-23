import { supabase } from "@/createClient"
import { FormsOng } from "@/templates/FormsOng"
import { Navbar } from "@/templates/Navbar"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { HandHeart } from "lucide-react"
import { Button } from "@/components/ui/button"

type OngDataProps = {
  id: number
  adress: string
  city: string
  cep: number
  phone: number
  owner: string
  open: string
  closed: string
  capacity: number
}

export function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [ongData, setOngData] = useState<OngDataProps[] | null>([])

  useEffect(() => {
    async function getSessionUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    getSessionUser()
  }, [])

  useEffect(() => {
    async function getOngData() {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("ong")
            .select("*")
            .eq("user_id", user.id)
          if (error) {
            throw error
          }
          setOngData(data)
        } catch (error) {
          console.error("Error fetching ONG data:", error)
        }
      }
    }
    getOngData()
  }, [user])

  async function handleDeleteOng(id: number) {
    try {
      const { error } = await supabase.from("ong").delete().eq("id", id)

      if (error) {
        throw error
      }

      if (user) {
        const { data, error: fetchError } = await supabase
          .from("ong")
          .select("*")
          .eq("user_id", user.id)

        if (fetchError) {
          throw fetchError
        }

        setOngData(data)
      }
    } catch (error) {
      console.error("Error deleting ONG:", error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-[1000px]">
        <h2 className="text-xl font-semibold max-[425px]:text-base">
          Olá, <span className="text-cyan-500">{user?.email} 👋</span>
        </h2>
        <br />
        <FormsOng />
        <br />
        <Separator />
        <br />
        <h1 className="text-xl font-bold">Minhas ONG's</h1>
        <br />
        <div className="flex flex-col gap-5">
          {ongData &&
            ongData.map((item) => (
              <Card key={item.id} className="shadow-md">
                <CardHeader className="flex flex-row items-center gap-4 px-3 pt-3 pb-0">
                  <div className="flex justify-center items-center w-8 h-8 rounded-full bg-purple-700">
                    <HandHeart color="white" size={20} />
                  </div>
                  <span className="text-base font-semibold">
                    ONG em {item.city}
                  </span>
                </CardHeader>
                <CardContent className="flex flex-col p-3 gap-1">
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Endereço</h2>
                    <span className="text-muted-foreground">
                      {item.adress} - {item.city}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Horários</h2>
                    <span className="text-muted-foreground">
                      {item.open} às {item.closed}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold">Contato</h2>
                    <span className="text-muted-foreground">
                      {item.phone} - {item.owner}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-3">
                  <Button
                    onClick={() => handleDeleteOng(item.id)}
                    className="w-full bg-red-600">
                    Deletar
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  )
}
