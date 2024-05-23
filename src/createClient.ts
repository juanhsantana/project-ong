import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xcqyclynrjcxvcwlmsim.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcXljbHlucmpjeHZjd2xtc2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0ODkyMzksImV4cCI6MjAzMjA2NTIzOX0.Oq3ojorU02BfmZ-PC_ILXafehyFVzIolUPQolOaw6vk"
export const supabase = createClient(supabaseUrl, supabaseKey)
