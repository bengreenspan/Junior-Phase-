import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyCampus } from './store';

const Campuses = ({campuses, destroy}) => {
    return ( 
        <ul>
            
            {
              campuses.map(campus => {
              return(
                    <li key={ campus.id}>
                        <Link to={`/campuses/${campus.id}`} >
                       {campus.campusName}  
                       </Link >
                       &nbsp; 
                       Total Enrollment is  &nbsp;
                        {campus.students.length}
                        <button onClick={()=> destroy(campus)}>Unaccredit</button> 
                    </li>
              );
            })
          }    
     </ul>
    )
}

export default connect(
    state => state,
        (dispatch, otherProps)=> {
          return {
              destroy: (campus)=> dispatch(destroyCampus(campus, history))
          }
      }
)(Campuses);