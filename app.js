import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import sample from 'lodash.sample';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS)
  const bodyObject = { 
    name: name,
    compliment: compliment
}
  res.render('greet.html.njk', bodyObject);
});

app.get(`/game`, (req, res) => {
  let wantsToPlay = req.query.play
  if(wantsToPlay === "no") {
    res.render('goodbye.html.njk')
  } else if(wantsToPlay === "yes") {
    res.render('game.html.njk')
  }
})

app.get(`/madlib`, (req, res) => {
  console.log(req.query)
  const bodyObject = {
    person: req.query.nameInput,
    color: req.query.colorInput,
    noun: req.query.nounInput,
    adjective: req.query.adjectiveInput
  }
  res.render(`madlib.html.njk`, bodyObject)
})