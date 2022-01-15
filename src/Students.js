import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {destroyStudent} from './store'

const Students = ({students, destroy}) => {
    return (
        <ul>
            {
              students.map(student => {
              return(
                <li key={ student.id}>
                    <Link to={`/students/${student.id}`} >
                   {student.name} 
                   </Link >  attends &nbsp;   
                           <Link to={`/campuses/${student.campus.id}`} >
                   {student.campus.campusName}
                       </Link >
                       &nbsp;
                       <button onClick={()=> destroy(student)}>Expell</button> 
                </li>
              );
            })
          }    
    
     </ul>
    )
}

export default connect(
    state => state,
        (dispatch)=> {
          return {
              destroy: (student)=> dispatch(destroyStudent(student))
          }
      }
)(Students);