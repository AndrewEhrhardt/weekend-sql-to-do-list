const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
  
    let queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
});

router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
  pool.query(queryText).then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting tasks', error);
    res.sendStatus(500);
  });
});

router.put('/:id', (req,res) => {
  console.log(req.params);
  const taskId = req.params.id;
  const queryText = 'UPDATE "tasks" SET "completed" = True WHERE "id" = $1;';
  pool.query(queryText, [taskId]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error in /tasks PUT', error);
      res.sendStatus(500);
  })
});

module.exports = router;
