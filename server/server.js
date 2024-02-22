const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());

// import db.js
const pool = require('./db');

// middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Express');
});

// get all users
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});

// get one of the users
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});

// add users
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  // check if user exists
  pool.query(
    'SELECT s from users s WHERE s.email = $1',
    [email],
    (error, results) => {
      if (results.rows.length) {
        return res.send('user exists');
      }

      pool.query(
        'INSERT INTO users(name, email, age) values($1, $2, $3)',
        [name, email, age],
        (error, results) => {
          if (error) throw error;
          res.status(201).send('user created');
        }
      );
    }
  );
});

// delete users
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  // check if there is...
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw new error();

    const isUserExisted = results.rows.length;
    if (!isUserExisted) {
      return res.send('user does not exist');
    }

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) throw new error();
      return res.status(200).send('user deleted');
    });
  });
});

// update users
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;

    const isUserExised = results.rows.length;
    if (!isUserExised) {
      return res.send('user does not exist');
    }

    pool.query(
      'UPDATE users SET name = $1 WHERE id = $2',
      [name, id],
      (error, results) => {
        if (error) throw error;
        return res.status(200).send('user updated');
      }
    );
  });
});

// server
app.listen(PORT, () => {
  console.log('server is running');
});
