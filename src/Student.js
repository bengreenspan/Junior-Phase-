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
        <h4> {student.name} {student.lastName} attends &nbsp;   
         
        <div>
        <Link to={`/campuses/${student.campus.id}`}>
                   {student.campus.campusName}</Link >
        </div>
      </h4>
      <pre> contact him at {student.email} </pre>




    </ul>
    )
}



export default connect(
    state => state
)(Student);