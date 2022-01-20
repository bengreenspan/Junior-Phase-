import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {destroyStudent, refreshPage, loadStudents} from './store'
import StudentCreate from "./StudentCreate"


const Students = ({students, destroy}) => {
    return (
        <ul>
            {students.length ? '': 'All students got sick! Add more below'}
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
          <h4>Enroll a student</h4>
     <StudentCreate />
     </ul>
    )
}

const mapStateToProps = (  state => state) 
const mapDispatchToProps =  (dispatch, {history})=> {
  return {
      destroy: (student)=> 
      dispatch(destroyStudent(student, history)) &&
      dispatch(refreshPage())
        
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
     
)(Students);