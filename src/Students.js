import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Students = ({students}) => {

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
                   {student.campus.name}
                       </Link >
                
                </li>
              );
            })
          }    
     </ul>
    )
}

export default connect(
    state => state
)(Students);