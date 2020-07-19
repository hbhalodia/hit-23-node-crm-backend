const Student = require('../models/student-schema')
exports.addStudents = (req, res) => {
    console.log("******* Save student... : " + JSON.stringify(req.body));
    const std = new Student({
      name : req.body.name,
      branch : req.body.branch,
      email : req.body.email,
      creator : req.userData.userId
      
    })
  
    std.save().then(createdStudent => {
      console.log('Saved successfully... : ' + JSON.stringify(createdStudent))
        res.status(201).json({
          message: "Student added successfully",
          studentId: createdStudent._id,
          student : createdStudent          
        });
        console.log("createdStudent : "+student);
      }).catch(()=>{
        res.status(500).json({
          message: "Unable to save student "
        });
      });
  
}

exports.listStudents =  (req, res) => {
  console.log("Get Reuqest happened...");
  console.log(req.query)
  const pageSize = +req.query.pagesize
  const pageIndex = +req.query.pageindex
  let fetchedStudent;
  const stdQuery = Student.find()
  if(pageSize && pageIndex) {
    stdQuery
      .skip(pageSize * (pageIndex - 1))
      .limit(pageSize)
  }
  stdQuery
    .then(students => {
      fetchedStudent = students;
      return Student.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Student fetched successfully!",
        students: fetchedStudent,
        maxStudents: count
      });
      

    });
}

exports.getStudents = (req, res) => {
  Student.findOne({_id: req.params.id }).then(student => {
    res.status(200).json(student);
  })
}

exports.deleteStudents = (req,res)=>{
  Student.deleteOne({ _id: req.params.id , creator : req.userData.userId}).then(deletedStudent => {
    console.log(deletedStudent);
    if (deletedStudent.n > 0){
    res.status(200).json({
       message: "Student deleted!" });
  }
  else{
    res.status(401).json({
      message: "Not Authorized to delete"
  });
  }
  });
}

/*
exports.get = */

exports.updateStudents = (req, res) => {
  console.log("******* Save student... : " + JSON.stringify(req.body));
  const std = new Student({
      _id : req.params.id,
      name : req.body.name,
      branch : req.body.branch,
      email : req.body.email,
      creator : req.userData.userId
  })

  Student.updateOne({ _id: req.params.id , creator : req.userData.userId }, std).then(updatedStudent => {
      console.log('Updated successfully... : ' + JSON.stringify(updatedStudent))
      if (updatedStudent.nModified >0 ){
        res.status(201).json({
            message: "Student Updated successfully"
        });
      }
      else{
        res.status(401).json({
          message: "Not Authorized to Update"
      });
      }
      });

}

