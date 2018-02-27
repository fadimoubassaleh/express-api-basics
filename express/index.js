const express = require('express')
const app = express()
const port = 3000

//          ****

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

//          ****

function byYear(test){
    var newArray = test.sort(function (a, b) {
                    return a.year - b.year;
                    });
    return newArray
}
function byRate(test){
    var newArray = test.sort(function (a, b) {
                    return a.rating - b.rating;
                    });
    return newArray
}
function byName(test){
    var newArray = test.sort(function(a, b) {
        var nameA = a.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    });
    return newArray
}

//          ****

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
function listOfMovies(arrayList){
var list = `Title: ` + arrayList[0].title + ` Year: `+ arrayList[0].year + ` Rating: ` + arrayList[0].rating + `<br />`
for (i = 1;i < arrayList.length;i++){
    list += `Title: ` + arrayList[i].title + ` Year: `+ arrayList[i].year + ` Rating: ` + arrayList[i].rating+ `<br />`
}return list
}
app.get(('/movies/:test?/:test2?/:test3?'), (req, res)=>{
    if (!req.params.test){
        res.status(200)
        console.log(movies)
        res.send(listOfMovies(movies))
    }else if (req.params.test == 'create')
        res.send(req.params.test)


    else if(req.params.test == 'read'){
        if(req.params.test2 == 'by-date'){
            var newArray = byYear(movies)
            res.send(listOfMovies(newArray))
        }else if(req.params.test2 == 'by-rating'){
            var newArray = byRate(movies)
            res.send(listOfMovies(newArray))
        }else if(req.params.test2 == 'by-title'){
            var newArray = byName(movies)
            res.send(listOfMovies(newArray))
        }else if(req.params.test2 == 'id'){
            if (!req.params.test3){
                res.send('Please enter your ID')
            }else if(req.params.test3 <= movies.length){
                res.status(200)
                res.send(movies[req.params.test3 - 1])
            }else{
                res.status(404).err
                // res.err(true)
                res.send(`the movie ${req.params.test3} does not exist`)
            }
    }}else if (req.params.test == 'add'){
        if (!req.query.title || !req.query.year || req.query.year.length != 4 || isNaN(req.query.year)){
            res.status(403).err
            res.write(`you cannot create a movie without providing a title and a year`)
            res.end()
        }else if (!req.query.rating){
            var result = {title: req.query.title, year: req.query.year, rating: 4}
            movies.push(result)
            res.send(listOfMovies(movies))
        }else{
            var result = {title: req.query.title, year: req.query.year, rating: req.query.rating}
            movies.push(result)
            res.send(listOfMovies(movies))}
    }else if (req.params.test == 'delete'){
        if (!req.params.test2){
            res.send('Please enter the id of movie you want to delete')
        }else if (!isNaN(req.params.test2) && req.params.test2 < movies.length){
            var result = parseInt(req.params.test2) - 1
            movies.splice(result,1)
            res.send(listOfMovies(movies))
        }else{
            res.status(404)
            res.err = true
            res.send(`the movie ${req.params.test2} does not exist`)
        }
    }


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