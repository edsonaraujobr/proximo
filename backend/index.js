import express from "express"
import cors from "cors"
import administratorRoutes from "./routes/administrators.js"
import clerkRoutes from "./routes/clerks.js"
import studentRoutes from "./routes/students.js"
import path from "path";

const app = express()

app.use(express.json())

app.use(cors())

app.use("/", administratorRoutes)
app.use("/", clerkRoutes)
app.use("/", studentRoutes)


app.listen('3030',() => {
    console.log("Running server port 3030");
})
