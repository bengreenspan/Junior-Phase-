import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_STUDENT = 'LOAD_STUDENT';
const LOAD_CAMPUS = 'LOAD_CAMPUS';

const studentsReducer = (state = [], action)=> {
    if(action.type === LOAD_STUDENT){
      state = action.students; 
    }
    return state;
  };
  
const campusesReducer = (state = [], action)=> {
    if(action.type === LOAD_CAMPUS){
      state = action.campuses; 
    }
    return state;
  };


  const reducer = combineReducers({
    students : studentsReducer,
    campuses: campusesReducer
  });

const _loadStudents = students=> ({ type: LOAD_STUDENT, students}); 
const _loadCampuses = campuses=> ({ type: LOAD_CAMPUS, campuses}); 

const loadStudents = ()=> {
  return async(dispatch)=> {
    const students = (await axios.get('/api/students')).data;
    dispatch(_loadStudents(students));
  };
};

const loadCampuses = ()=> {
  return async(dispatch)=> {
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_loadCampuses(campuses));
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { loadStudents,loadCampuses 
  //createFish, deleteFish, updateFish 
};