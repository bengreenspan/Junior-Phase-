import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({campuses, match: {params: {id}}}) => {
    const campus = campuses.find(campus => campus.id === id);
 if(!campus){
      return 'Sorry the Campus you are looking for is unreachable';
  }
    return (
        <ul>
           <h1>{campus.campusName}</h1>
           <img src={campus.campusImageURL}></img>
           <h2> located at {campus.campusAddress} </h2>
           <h3> {campus.description} </h3>
           <h4> Enrollees</h4>
           {campus.students.length ? 
           
              campus.students.map(student => {
              return(
                  
                <li key={ student.id}>
                    <Link to={`/students/${student.id}`} >
                   {student.name} 
                   </Link > 
                </li>
              );
            })
          
          : `${campus.campusName} needs a better recruiting department`}     
     </ul>
    )
}

export default connect(
    state => state
)(Campus);