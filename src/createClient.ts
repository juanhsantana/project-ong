import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dyftpufmedxxifwbbnle.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5ZnRwdWZtZWR4eGlmd2JibmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MDY5ODksImV4cCI6MjAzMTk4Mjk4OX0.i_xddprVX0rcwo7Sv0AK7WCdM7Aw-yK63MbCduYGmkk"
export const supabase = createClient(supabaseUrl, supabaseKey)
