import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentUpdate from './StudentUpdate';

const Student = ({students, match: { params: {id}}}) => {
  const student = students.find(student => student.id === id);
  if(!student){
return 'Sorry the Student you are looking for is unreachable';
    }
    return (
    <ul>
      <div id='singlestudent'>
        <h1>{student.name} {student.lastName}</h1>
          <img src={student.imageURL} width='150' height='150'></img>
              <h4> <h3>{student.name} attends: </h3>
                <div>{student.campus ? 
                <Link to={`/campuses/${student.campus.id}`}>
                   {student.campus.campusName}</Link > 
                  : 'Community College, and is looking to reapply next fall.'}
                </div>
            </h4>
          <h4> Contact: {student.email} </h4>
          <h4> GPA: {student.gpa}</h4>
          </div>
          <div id='enroll'>
            <div id='studentform'>
        <h4>Edit</h4> &nbsp;&nbsp;

      <StudentUpdate history={history} student={student}/>
      </div>
      </div>
    </ul>
    )
}

export default connect(state => state)(Student);