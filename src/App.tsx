import { AppRoutes } from "./routes/AppRoutes"
import { Footer } from "./templates/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
