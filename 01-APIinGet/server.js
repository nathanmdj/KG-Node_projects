const express = require('express');
const app = express();

app.get('/home', (req, res) => {
  const home = [
    {
      home_disp: 'My first arithmetic web services API'
    }
  ]
  res.json(home)
})

app.get('/:operation/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const operation = req.params.operation;
  let result = 0;

  switch(operation) {
    case 'add':
      result = num1 + num2;
      break;
    
    case 'subtract':
      result = num1 - num2;
      break;
    
    case 'multiplication':
      result = num1 * num2;
      break;
    
    case 'division':
      result = num1 / num2;
      break;

    default:
      result = "NOT FOUND"
  }

  const resultJSON = [
    {
      result: result
    }
  ]

  res.json(resultJSON)
})

app.all('*', (req, res) => {
  res.status(404).send(`
    <h1>PAGE NOT FOUND</h1>
    <a href='/home'>Go Back Home</a>
  `)
})

app.listen(5000, () => {
  console.log('Server is running in port 5000......')
})