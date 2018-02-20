const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req,res)=>res.send({status:200, message:"ok"}))

app.get('/',(req,res)=>{
    res.send('batata')
})

app.listen( port, () => {
  console.log('We are live on ' + port);
});