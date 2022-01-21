import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusUpdate from './CampusUpdate';
import {updateStudent, refreshPage} from './store'

const Campus = ({updateStudent, campuses, match: {params: {id}}}) => {
    const campus = campuses.find(campus => campus.id === id);
 if(!campus){
      return 'Sorry the Campus you are looking for is unreachable';
  }
    return (
        <ul>
              <div id='singlestudent'>
           <h1>{campus.campusName}</h1>
            <img src={campus.campusImageURL} width='200' height='200'></img>
              <h2> Located at:</h2>
              <h3>{campus.campusAddress} </h3>
              <h2>Motto:</h2>
              <h4> {campus.description} </h4>
              <h4> Enrollees:</h4>
                {campus.students.length ? campus.students.map(student => {
                    return(
                      <li key={ student.id}>
                          <Link to={`/students/${student.id}`} >
                        {student.name} 
                        </Link > 
                        &nbsp; 
                        <button onClick={()=> updateStudent({...student, campusId: null}) }>Send abroad</button> 
                      </li>
                    );
                  })
                : `${campus.campusName} needs a better recruiting department`}   
                </div>
                <h4 id='form'> 
          <h3>Edit &nbsp;&nbsp;</h3>  
            <CampusUpdate history={history} campus={campus}/>
            </h4>
     </ul>
    )
}

export default connect(state => state, 
 (dispatch) => {
      return {
          updateStudent: (student)=> {dispatch(updateStudent(student, history)) && dispatch(refreshPage())
        ;},
      }
    }
  )(Campus);