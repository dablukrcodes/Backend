const express = require("express")
const app = express()
app.use(express.json())

const notes = []



app.post("/note" ,(req,res)=>{ 
    console.log(req.body)
    notes.push(req.body)

   res.send("notes created successfully")

})

app.get("/note" , (req,res)=>{
    res.send(notes)
})




app.delete("/note/:id" , (req,res)=>{ 
    delete notes[req.params.id]
    res.send("notes delete successfully")
})


app.patch("/note/:id",(req,res)=>{ 
    notes[req.params.id].description = req.body.description

   res.send("notes updated successfully")
})


app.use("*", (req, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

module.exports = app
