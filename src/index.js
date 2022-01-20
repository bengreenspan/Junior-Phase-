import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import store, { loadStudents, loadCampuses} from './store';
import { HashRouter as RoutyRoute, Route, Link } from 'react-router-dom';
import Nav from './Nav'
import Students from './Students' 
import Campuses from './Campuses' 
import Student from './Student' 
import Campus from './Campus' 

// const Campuses = () => <hr />;

class _App extends Component{
    componentDidMount(){
      this.props.bootstrap();
    }
render(){
    return (
    <RoutyRoute>
    <div>
  
        <Route component={ Nav } />
        <Route component={ Students } path ='/' exact />
        <Route component={ Campuses } path ='/campuses' exact />

        <Route component={ Student } path ='/students/:id' exact />
        <Route component={ Campus } path ='/campuses/:id' exact />
    </div>
    </RoutyRoute>
    );
  }
}

    const App = connect(
    ({ students, campuses }) => ({ students, campuses }),
    (dispatch)=> {
      return { 
        bootstrap: ()=> 
          dispatch(loadStudents()) &&
          dispatch(loadCampuses())
        }; 
      }
  )(_App);

  render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));