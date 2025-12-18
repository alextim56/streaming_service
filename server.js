const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

//app.set('view engine', 'ejs');
//console.log('view engine', app.get('view engine'));
// Set the directory for views
//app.set('views', path.join(__dirname, 'dist')); 
//console.log('views', app.get('views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', routes);

/*app.get('/', (req, res) => {
  res.render('index');
});*/

//app.use("/tracks", routes);

/*app.get('/tracks', routes);
app.get('/favorites', routes);*/

/*app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json('Server is working!');
});*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
