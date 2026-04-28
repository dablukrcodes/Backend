const express = require("express")
const app = express()
app.use(express.json())

const notes = []

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running"
    })
})

app.post("/note" ,(req,res)=>{ 
    console.log(req.body)
    notes.push(req.body)

    res.status(201).json({ 
        message:"Notes created succssfully",
        notes
    })

})


app.get("/note" , (req,res)=>{ 
    res.status(200).json({ 
        notes:notes
    })
})



app.delete("/note/:id" , (req,res)=>{ 
    delete notes[req.params.id]

    res.status(204).json({ 
        message: "notes delete successfully"
    })
})


app.patch("/note/:id",(req,res)=>{ 
    notes[req.params.id].description = req.body.description

    res.status(200).json({ 
        message: "notes update successfully"
    })
})


app.use("*", (req, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

module.exports = app
