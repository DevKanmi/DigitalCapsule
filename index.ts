
import { app } from "./src/app"

import { config } from "dotenv"
import { DBconnection } from "./src/config/DBConnection"
config()

const PORT = process.env.PORT
app.listen(PORT, async() =>{
    await DBconnection()
    console.log(`Server is running on localhost:${PORT}`)
})

