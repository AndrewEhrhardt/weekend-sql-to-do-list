const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//adds a task to the database 
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


//gets the tasks from the database 
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

//updates the completed status of tasks depending on whether 
//the task is being marked completed, or if the task has been 
//changed back to uncompleted
router.put('/:id', (req,res) => {
  let toggleState = req.body;
  const taskId = req.params.id;
  const queryText = 'UPDATE "tasks" SET "completed" = $2 WHERE "id" = $1;';
  pool.query(queryText, [taskId, toggleState.toggle]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error in /tasks PUT', error);
      res.sendStatus(500);
  })
});

//removes a task from the database
router.delete('/:id', (req, res) => { 
  const taskId = req.params.id;
  const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;';
  pool.query(queryText, [taskId]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error in /tasks DELETE', error);
      res.sendStatus(500);
  })
});

module.exports = router;
