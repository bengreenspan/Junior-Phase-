import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({campuses, match: {params: {id}}}) => {
    const campus = campuses.find(campus => campus.id === id);
 if(!campus){
      return null;
  }
    return (
        <ul>
           <h1>{campus.name}</h1>
           <h4> Enrollees</h4>
           {
              campus.students.map(student => {
              return(
                  
                <li key={ student.id}>
                    <Link to={`/students/${student.id}`} >
                   {student.name} 
                   </Link >    
                   
                </li>
              );
            })
          }    
     </ul>
    )
}

// const Student = ({students, match: { params: {id}}}) => {
//     const student = students.find(student => student.id === id);
//     const name = student.name;
//     console.log(student)
//     // {console.log(props)}
  
//         return (
//           <ul>
           
//            <h1>{name}</h1>
//           <h4> {name} attends &nbsp;    
//           <Link to={`/campuses/${student.campus.name}}`} >
//                      {student.campus.name}
//                          </Link >
//            </h4>
  
//        </ul>
//       )
//   }

export default connect(
    state => state
)(Campus);