import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({campuses}) => {
    
    return ( 
        <ul>
            
            {
              campuses.map(campus => {
              return(
                    <li key={ campus.id}>
                        <Link to={`/campuses/${campus.id}`} >
                       {campus.name}  
                       </Link >
                       &nbsp; 
                       Total Enrollment is  &nbsp;
                        {campus.students.length}
                    
                    </li>
              );
            })
          }    
     </ul>
    )
}



export default connect(
    state => state
)(Campuses);