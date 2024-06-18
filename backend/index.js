import express from "express"
import cors from "cors"
import administradorRoutes from "./routes/administradores.js"
import atendenteRoutes from "./routes/atendentes.js"
import alunosRoutes from "./routes/alunos.js"

const app = express()

app.use(express.json())

app.use(cors())

app.use("/", administradorRoutes)
app.use("/", atendenteRoutes)
app.use("/", alunosRoutes)


app.listen('3030',() => {
    console.log("Running server");
})
