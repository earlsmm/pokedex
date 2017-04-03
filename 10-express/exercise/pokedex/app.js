var express = require('express')
var exphbs = require('express-handlebars')
var app = express()

//way for node to read files, go to fs native function and run fs
var fs = require('fs')

//declare file object, read pokedex json file, then parse string to data
var pokedex;
fs.readFile('pokedex.json', 'utf8', function( err, data){
  if (err) throw err;
  pokedex = JSON.parse(data);

  //console.log('pokedex', pokedex['pokemon'][0])
})


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
   res.render('home', pokedex);
})

app.get('/about', function (req, res) {
  res.render('about')
})

//This is the route for each pokemon page
app.get('/pokemon/:id', function (req, res){
  //id comes from the params of the object request
  var id = req.params.id
  //pokedex is an array the ids are ordered and we can assess by index number
  //we get that by parsing the id string into an integer and substracting by one
  //because the ids start at 1 instead of 0
  var pokemon = pokedex.pokemon[parseInt(id) -1]
  console.log('id!!', id, pokemon)
  //specific pokemon gets rendered by the layout "pokemon"
  res.render('pokemon', pokemon)
})

//launches the server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
