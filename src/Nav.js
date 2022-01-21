import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({students, campuses, location: { pathname }  }) => {
    return (
        <>
            <h4>
                Zovio Campus Enrollment Portal
            </h4>
        <nav>
            <Link to='/' className={ pathname === '/' ? 'selected' : ''}>Students ({students.length})</Link>
            <Link to='/campuses' className={ pathname === '/campuses' ? 'selected' : ''}>Campuses ({campuses.length}) </Link>
        </nav>
       </>
    );
}

export default connect(state => state )(Nav);