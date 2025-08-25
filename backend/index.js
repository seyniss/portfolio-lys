const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors(
    {
        origin:process.env.FRONT_ORIGIN,
        credentials:true
    }
))

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB 연결 성공")).catch((err) => console.log("연결 실패", err))

// const userRoutes = require("./routes/user")
// app.use("/api.user", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello Express!")
})

app.listen(PORT, () => {
    console.log("Server is Running")
})