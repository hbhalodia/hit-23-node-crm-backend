var bodyParser = require('body-parser')
const express = require('express')
const stdRoute = express.Router()
const Student = require('../models/student-schema')
const userController = require('../controllers/studentt')
const authMw = require('../middleware/auth-mid')

// create application/json parser
var jsonParser = bodyParser.json()

stdRoute.post('/addStudent', authMw ,jsonParser, userController.addStudents)

stdRoute.get('/listStudents',userController.listStudents)

stdRoute.delete('/:id',authMw,userController.deleteStudents)

stdRoute.get('/:id', authMw , userController.getStudents)
/*
stdRoute.get('/:id', authMw ,(req, res) => {
    Student.findOne({_id: req.params.id }).then(student => {
      res.status(200).json(student);
    })
  })
*/
stdRoute.put('/:id', authMw,jsonParser,userController.updateStudents)
/*
stdRoute.get('/student/:id', (req, res) => {
    students = [
      {id: "1", name:"Bhaumik", branch: "ICT"},
      {id: "2", name:"Rutvik", branch: "ICT"},
      {id: "3", name:"Nipun", branch: "AWS"},
    ];
    console.log("Passed Id is: " + req.params.id);
    const foundStudent = students.filter(student =>
      student.id == req.params.id
    );
    res.status(200).send(foundStudent);
  }
)

stdRoute.get('/student/:id', (req, res) => {
    students = [
      {id: "1", name:"Bhaumik", branch: "ICT"},
      {id: "2", name:"Rutvik", branch: "ICT"},
      {id: "3", name:"Nipun", branch: "AWS"},
    ];
    console.log("Passed Id is: " + req.params.id);
    const foundStudent = students.filter(student =>
      student.id == req.params.id
    );
    res.status(200).send(foundStudent);
  })

*/
module.exports = stdRoute
