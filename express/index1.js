const express = require('express')
const app = express()
const port = 3000

//      Arrays

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

//      Functions

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
        var nameA = a.title.toUpperCase(); 
        var nameB = b.title.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
    });
    return newArray
}

function listOfMovies(arrayList){
    var list = `Title: ` + arrayList[0].title + ` Year: `+ arrayList[0].year + ` Rating: ` + arrayList[0].rating + `<br />`
    for (i = 1;i < arrayList.length;i++){
        list += `Title: ` + arrayList[i].title + ` Year: `+ arrayList[i].year + ` Rating: ` + arrayList[i].rating+ `<br />`
    }return list
}

//      APP.get

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

app.get(('/movies/:test?/:test2?/:test3?'), (req, res)=>{
    // 1
    if (!req.params.test){
        res.status(200)
        console.log(movies)
        res.send(listOfMovies(movies))
    }else if (req.params.test == 'create')
        res.send(req.params.test)
    
    // 2
    else if(req.params.test == 'read'){
        if(!req.params.test2){
            res.send(listOfMovies(movies))
        }
        // 2.1 SORT by
        else if(req.params.test2 == 'by-date'){
            var newArray = byYear(movies)
            res.send(listOfMovies(newArray))
        }else if(req.params.test2 == 'by-rating'){
            var newArray = byRate(movies)
            res.send(listOfMovies(newArray))
        }else if(req.params.test2 == 'by-title'){
            var newArray = byName(movies)
            res.send(listOfMovies(newArray))
        }

        // 2.2 SHOW movie bye id
        else if(req.params.test2 == 'id'){
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
        }
    }
    // 3 ADD new Movie
    else if (req.params.test == 'add'){
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
            res.send(listOfMovies(movies))
        }
    }
    // 4 DELETE exist movie
    else if (req.params.test == 'delete'){
        if (!req.params.test2){
            res.send('Please enter the id of movie you want to delete')
        }else if (!isNaN(req.params.test2) && req.params.test2 <= movies.length){
            var result = parseInt(req.params.test2) - 1
            movies.splice(result,1)
            res.send(listOfMovies(movies))
        }else{
            res.status(404)
            res.err = true
            res.send(`the movie ${req.params.test2} does not exist`)
        }
    }
    // 5 UPDATE exist movie
    else if (req.params.test == 'update'){
        var result = parseInt(req.params.test2) - 1
        if (!req.params.test2){
            res.send('Please enter the id of movie you want to update')
        }else if(!req.query.title && !req.query.rating){
            res.send(`please enter what you want to update like <br /><br /> {localhost:3000/movies/update/${req.params.test2}?title=Hello} or {localhost:3000/movies/update/${req.params.test2}?rating=4} <br /><br /> OR {localhost:3000/movies/update/${req.params.test2}?rating=4&&?title=Hello}`)
        }else{
            if(!!req.query.title && !!req.query.rating){
                movies[result].title = req.query.title;
                movies[result].rating = req.query.rating;
                res.send(movies[result])
            }
            if(!!req.query.title){
                console.log('hi')
                movies[result].title = req.query.title;
                res.send(movies[result])
            }if(!!req.query.rating){
                console.log('hi2')
                movies[result].rating = req.query.rating;
                res.send(movies[result])
            }
        }
    }
})

//      END OF SERVER

app.listen(port,(err)=>{
    if(err){
        console.log('something bad happened', err)
    }else{
        console.log(`server is listening on port ${port}`)
    }
});