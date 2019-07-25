const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Total-Count, Accept");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
   
  res.header("X-Total-Count", "3");
  next();
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/customers', db.getCustomers);
app.get('/customers/:id', db.getCustomerById);
app.post('/customers', db.createCustomer);
app.put('/customers/:id', db.updateCustomer);
app.delete('/customers/:id', db.deleteCustomer);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})