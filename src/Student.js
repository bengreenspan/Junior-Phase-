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
        <h1>{student.name}</h1>
          <img src={student.imageURL} width='100' height='100'></img>
              <h4> {student.name} {student.lastName}   
                <div>{student.campus ? 
                <Link to={`/campuses/${student.campus.id}`}>
                  attends {student.campus.campusName}</Link > 
                  : 'Is looking to transfer'}
                </div>
            </h4>
          <pre> Contact: {student.email} </pre>
          <pre> Current gpa is {student.gpa}</pre>
        <h3>Change student details</h3>
      <StudentUpdate history={history} student={student}/>
    </ul>
    )
}

export default connect(state => state)(Student);