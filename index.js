const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('batata')
})

app.listen( port, () => {
  console.log('We are live on ' + port);
});