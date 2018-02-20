const express = require('express')
const app = express()
const port = 3000

app.get('/test', (req,res) => res.send({status:200, message:"ok"}))

app.get('/time', (req, res) => { 
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const message = hours+":"+minutes
  res.send({status:200, message})
})

app.get('/hello/:thing?', ( req, res ) => {
    const thing = req.params.thing
    const message = 'hello, '+thing
    res.send({status:200, message})
})

app.get('/search', (req, res)=>{
    const query = req.query.s
    if(query){
        res.send({status:200, data:query})
    }else{
        res.status(500).send({status:500, error:true, message:"You have to provide a search"})
    }
})

app.get('/',(req,res)=>{
    res.send('batata')
})

app.listen( port, () => {
  console.log('We are live on ' + port);
});