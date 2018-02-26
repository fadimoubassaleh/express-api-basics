const express = require('express')
const app = express()
const port = 3000

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
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
    res.status(200)
    res.send(nowTime())
})

app.get(("/hello/:id"), (req, res)=>{
    res.status(200)
    res.write(req.params.id)
    res.end()
})

app.get(('/search'), (req, res)=>{
    // const myURL = new URL('https://example.org/?abc=123');
    // console.log(myURL.searchParams.get('abc'));
    // console.log('hi')
    // console.log(req.searchParams.get())
    // res.send(req.searchParams.get())
    console.log(req.query.s)
    // res.send(req.query.s)
    if (!req.query.s){
        res.status(500);
        res.write('you have to provide a search')
        res.err = true
        res.end()
    }else{
        res.status(200)
        res.write('ok')
        res.data = req.query.s
        res.end()
    }
})
function listOfMovies(){
var list = `Title: ` + movies[0].title + `<br />`
for (i = 1;i < movies.length;i++){
    list += `Title: ` + movies[i].title + `<br />`
}return list
}
app.get(('/movies/:test?'), (req, res)=>{
    if (!req.params.test){
        res.status(200)
        console.log(movies)
        res.send(listOfMovies())
    }else if (req.params.test == 'create')
        res.send(req.params.test)
    else if(req.params.test == 'read')
        res.send(req.params.test)
    else if(req.params.test == 'update')
        res.send(req.params.test)
    else if(req.params.test == 'delete')
        res.send(req.params.test)
})
// app.get((''), (req, res)=>{})
app.listen(port,(err)=>{
    if(err){
        console.log('something bad happened', err)
    }else{
        console.log(`server is listening on port ${port}`)
    }
});