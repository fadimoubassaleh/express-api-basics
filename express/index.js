const express = require('express')
const app = express()
const port = 3000


app.get((""), (req, res)=>{
    res.send('Batata')
})

app.get(("/test"), (req, res)=>{
    res.send('{status:200, message:"ok"}')
})

app.get(("/time"), (req, res)=>{
    console.log(Date.now())
    function nowTime() {
        const test = new Date();
        const result = test.getHours() + `:` + test.getMinutes()
        return result
    }
    res.send(`{status:200, message:`+nowTime()+`}`)
})

app.listen(port,(err)=>{
    if(err){
        console.log('something bad happened', err)
    }else{
        console.log(`server is listening on port ${port}`)
    }
});