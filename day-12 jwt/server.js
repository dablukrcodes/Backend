require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/databse")

connectToDB()
app.listen(3000 , ()=>{ 
    console.log("server is rumming on port : 3000")
})