const express = require('express')
const app = express()
const port = 3000


app.get((""), (req, res)=>{
    res.send('hi')
})

app.listen(port,(err)=>{
    if(err){
        console.log('something bad happened', err)
    }else{
        console.log(`server is listening on port ${port}`)
    }
});