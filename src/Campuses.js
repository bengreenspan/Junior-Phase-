import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyCampus, refreshPage } from './store';
import CampusCreate from './CampusCreate';

const Campuses = ({campuses, destroy}) => {
    return ( 
        <ul>
           {!!campuses.length ? '': 'All classes have been postponed due to COVID-19 restrictions, add schools with mask mandates to continue.'}
            {
              campuses.map(campus => {
              return(
                    <li key={ campus.id}>
                       <Link to={`/campuses/${campus.id}`} > {campus.campusName} </Link >&nbsp; 
                          {!!campus.students ? `Total Enrollment is ${campus.students.length}` 
                         : 'Total Enrollment is 0'}
                       <button onClick={()=> destroy(campus)}>Unaccredit</button> 
                    </li>
              );
            })
          }    
    <h4>Create education</h4>
     <CampusCreate />
     </ul>
    )
}

export default connect(
    state => state,
        (dispatch, {history})=> {
          return {
              destroy: (campus)=> dispatch(destroyCampus(campus, history))&&
              dispatch(refreshPage())
          }
      }
)(Campuses);