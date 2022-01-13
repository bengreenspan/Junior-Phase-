import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Student = ({students, match: { params: {id}}}) => {
  const student = students.find(student => student.id === id);
  if(!student){
    return null;
}
  {console.log(student)}

      return (
        <ul>
         
         <h1>{student.name}</h1>
        <h4> {student.name} attends &nbsp;    
        <Link to={`/campuses/${student.campus.id}`} >
                   {student.campus.name}
                       </Link >
         </h4>

     </ul>
    )
}



export default connect(
    state => state
)(Student);