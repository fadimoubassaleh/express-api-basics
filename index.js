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
  const title = req.query.title
  const year = parseInt(req.query.year)
  const _rating = parseFloat(req.query.rating)
  if(!title || !year || req.query.year.length!==4 || isNaN(year)){
    return res.status(403).send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
  }
  const rating = (!_rating || isNaN(_rating) ? 4 : _rating )
  const new_movie = {title, year, rating}
  movies.push(new_movie)
  res.send({status:200, data:movies})
})

app.get('/movies/get/id/:id', ( req, res ) => {
  const id = req.params.id
  if(movies[id]){
    const movie = movies[id]
    res.send({status:200, data:movie})
  }else{
    res.status(404).send({status:404, error:true, message:'the movie '+id+' does not exist'})
  }
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

app.get('/movies/edit/:id', ( req, res ) => {
  const id = req.params.id
  if(movies[id]){
    const _title = req.query.title
    const _year = parseInt(req.query.year)
    const _rating = parseFloat(req.query.rating)
    if(!_year && !_title && !_rating){
      return res.status(403).send({status:403, error:true, message:'you need to change at least one property'})
    }
    const title = (! _title ) ? movies[id].title : _title
    const rating = (!_rating || isNaN(_rating) ? movies[id].rating : _rating )
    const year = (!_year || isNaN(_year) ? movies[id].year : _year )
    const new_movie = {title, rating, year}
    movies[id] = new_movie
    res.send({status:200, data:movies})
  }else{
    res.status(404).send({status:404, error:true, message:'the movie '+id+' does not exist'})
  }
})

app.get('/movies/delete/:id', ( req, res ) => {
  const id = req.params.id
  if(movies[id]){
    movies.splice(id,1)
    res.send({status:200, data:movies})
  }else{
    res.status(404).send({status:404, error:true, message:'the movie '+id+' does not exist'})
  }
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