const express = require('express')
const ejs = require('ejs')
const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
var port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname,'./views')


app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views', viewsPath)


app.get('/', (req, res) => {

    axios.get('https://covid19.mathdro.id/api')
    .then(function(response){
        var infected = response.data
        console.log(response.data)
        res.render('index',{data: infected})
    }).catch(function (err){
        res.send("cannot find such country! check for spellings!!")
    })

})

app.post('/send', (req, res) => {
    var search = req.body.searchCountry
    axios.get(`https://covid19.mathdro.id/api/countries/${search}`)
    .then(function(response){
        var infected = response.data
        console.log(response.data)
        res.render('render',{data: infected,name: search})
    }).catch(function (err){
        res.send("cannot find such country! check for spellings!!")
    })

    console.log(search)
})

app.listen(port, () => {
    console.log('server is up and running on port ' +port)
})