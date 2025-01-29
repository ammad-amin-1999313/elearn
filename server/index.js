import express from "express"
import cors from "cors"
import connectDB from "./db/connect.js";
import UserRoutes from "./routes/user/user.routes.js"

const corsOptions = {
    origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // List of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

//User Routes
app.use('api/user',UserRoutes)

connectDB()

const Port = process.env.PORT_NO

app.listen(Port,()=>{
    console.log('Server is running');
})
