import express from "express"
import cors from "cors"
import userRoutes from "./routes/administradores.js"

const app = express()

app.use(express.json())

app.use(cors())

app.use("/", userRoutes)

app.listen('3030',() => {
    console.log("Running serverx");
})
