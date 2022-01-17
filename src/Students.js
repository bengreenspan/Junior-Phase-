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
                


                   {student.campus ? <Link to={`/campuses/${student.campus.id}`}>
                   {student.campus.campusName}</Link >
                    : 'a disaccredited university'}



                       &nbsp;
                       <button onClick={()=> destroy(student)}>Expell</button> 
                </li>
              );
            })
          }    
    
     </ul>
    )
}

const mapStateToProps = (  state => state) 
const mapDispatchToProps =  (dispatch, {history})=> {
  return {
      destroy: (student)=> 
      dispatch(
        destroyStudent
      // console.log
        (student, history)
        )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
     
)(Students);