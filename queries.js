
const config = require('./config');

const Pool = require('pg').Pool;
const pool = new Pool(config);

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const createCustomer = (request, response) => {
  const { name, address } = request.body

  pool.query('INSERT INTO customers (name, address) VALUES ($1, $2)', [name, address], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Customer added with ID: ${result.insertId}`);
  })
};

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, address } = request.body

  pool.query(
    'UPDATE users SET name = $1, address = $2 WHERE id = $3',
    [name, address, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Customer modified with ID: ${id}`);
    }
  )
};

const deleteCustomer = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM cstomers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Customer deleted with ID: ${id}`);
  })
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
}