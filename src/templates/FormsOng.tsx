import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/createClient"

export function FormsOng() {
  const [timeOpen, setTimeOpen] = useState("")
  const [timeClosed, setTimeClosed] = useState("")
  const [adress, setAdress] = useState("")
  const [city, setCity] = useState("")
  const [cep, setCep] = useState("")
  const [phone, setPhone] = useState("")
  const [owner, setOwner] = useState("")
  const [stock, setStock] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }

    fetchUser()
  }, [])

  const handleChangeTimeOpen = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      let formattedValue = value
      if (value.length > 2) {
        formattedValue = `${value.slice(0, 2)}:${value.slice(2)}`
      }
      setTimeOpen(formattedValue)
    }
  }

  const handleChangeTimeClosed = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      let formattedValue = value
      if (value.length > 2) {
        formattedValue = `${value.slice(0, 2)}:${value.slice(2)}`
      }
      setTimeClosed(formattedValue)
    }
  }

  async function handleAddOng(event: { preventDefault: () => void }) {
    event.preventDefault()

    if (!userId) {
      console.log("User not authenticated")
      return
    }

    const { error } = await supabase.from("ong").insert({
      user_id: userId,
      adress,
      city,
      cep,
      phone,
      owner,
      open: timeOpen,
      closed: timeClosed,
      capacity_stock: stock,
    })
    if (error) {
      console.log(error)
    } else {
      console.log("Data inserted successfully")
    }
  }

  return (
    <form className="flex flex-col w-full gap-5" onSubmit={handleAddOng}>
      <h1 className="text-3xl font-bold">Dados da ONG</h1>

      {/* endereço */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="adress">Endereço</Label>
        <Input
          type="text"
          id="adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
      </div>

      {/* complemento do endereço */}
      <div className="flex w-full items-center gap-5 max-[425px]:flex-wrap">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="adress-city-uf">Cidade - UF</Label>
          <Input
            type="text"
            id="adress-city-uf"
            placeholder="Santos - SP"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="adress-cep">CEP</Label>
          <Input
            type="number"
            id="adress-cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>
      </div>

      {/* contato */}
      <div className="flex w-full items-center gap-5 max-[425px]:flex-wrap">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="ong-cellphone">Telefone</Label>
          <Input
            type="number"
            id="ong-cellphone"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="ong-ceo">Responsável</Label>
          <Input
            type="text"
            id="ong-ceo"
            placeholder="Seu nome"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
      </div>

      {/* horários */}
      <div className="flex w-full items-center gap-5 max-[425px]:flex-wrap">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="hour-open">Horário de abertura</Label>
          <Input
            value={timeOpen}
            onChange={handleChangeTimeOpen}
            type="text"
            id="hour-open"
            placeholder="08:00"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="hour-closed">Horário de fechamento</Label>
          <Input
            value={timeClosed}
            onChange={handleChangeTimeClosed}
            type="text"
            id="hour-closed"
            placeholder="19:00"
          />
        </div>
      </div>

      {/* estoque */}
      <div className="flex w-full items-center gap-5">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="stock-capacity">Capacidade de estoque</Label>
          <Input
            type="number"
            id="stock-capacity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit">Inscrever-se</Button>
    </form>
  )
}
