import "reflect-metadata"
import express from "express"
import usersRoutes from "./router/users.routes"
import sessionRoutes from "./router/session.routes"

const app = express()

app.use(express.json())
app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)

export default app