const express = require('express')
const app = express()
const port = 3000

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }  
]

app.get('/movies/add', ( req, res ) => {
  res.send('ok')
})

app.get('/movies/get/by-date', ( req, res ) => {
  const sortByDate = (a, b) => {
    return a.year - b.year
  }
  const moviesSorted = movies.sort(sortByDate)
  res.send({status:200, data:moviesSorted})
})

app.get('/movies/get/by-rating', ( req, res ) => {
  const sortByRating = (a, b) => {
    return b.rating - a.rating
  }
  const moviesSorted = movies.sort(sortByRating)
  res.send({status:200, data:moviesSorted})
})

app.get('/movies/get/by-title', ( req, res ) => {
  const sortByTitle = (a, b) => {
  const x = a.title.toLowerCase()
  const y = b.title.toLowerCase()
  return x<y ? -1 : x>y ? 1 : 0;
  }
  const moviesSorted = movies.sort(sortByTitle)
  res.send({status:200, data:moviesSorted})
})

app.get('/movies/get', ( req, res ) => {
  res.send({status:200, data:movies})
})

app.get('/movies/add', ( req, res ) => {
  res.send('ok')
})

app.get('/movies/edit', ( req, res ) => {
  res.send('ok')
})

app.get('/movies/delete', ( req, res ) => {
  res.send('ok')
})

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