import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_STUDENT = 'LOAD_STUDENT';
const LOAD_CAMPUS = 'LOAD_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const DESTROY_CAMPUS = 'DESTROY_CAMPUS';

const studentsReducer = (state = [], action)=> {
    if(action.type === LOAD_STUDENT){
      state = action.students; 
    }
    if(action.type === CREATE_STUDENT){
      state = [...state, action.student];
    }
    if(action.type === DESTROY_STUDENT){
      state = state.filter(student => student.id !== action.student.id)
    }
    return state;
  };
  
const campusesReducer = (state = [], action)=> {
    if(action.type === LOAD_CAMPUS){
      state = action.campuses; 
    }
    if(action.type === CREATE_CAMPUS){
      state = [...state, action.campus];
    }
    if(action.type === DESTROY_CAMPUS){
      state = state.filter(campus => campus.id !== action.campus.id)
    }
    return state;
  };


  const reducer = combineReducers({
    students : studentsReducer,
    campuses: campusesReducer
  });

const _loadStudents = students=> ({ type: LOAD_STUDENT, students}); 
const _loadCampuses = campuses=> ({ type: LOAD_CAMPUS, campuses}); 
const _createStudent = student=> ({ type: CREATE_STUDENT, student}); 
const _createCampus = campus=> ({ type: CREATE_CAMPUS, campus}); 
const _destroyStudent = student=> ({ type: DESTROY_STUDENT, student}); 
const _destroyCampus = campus=> ({ type: DESTROY_CAMPUS, campus}); 


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

const createStudent = (student)=> {
  return async(dispatch)=> {
    const { data: createdStudent }  = await axios.post('/api/students', student);
    dispatch(_createStudent(createdStudent));
  };
};

const createCampus = (campus)=> {
  return async(dispatch)=> {
    const { data: createdCampus }  = await axios.post('/api/campuses', campus);
    dispatch(_createCampus(createdCampus));
  };
};


const destroyStudent = (student)=> {
  return async(dispatch)=> {
  dispatch(_destroyStudent(student));
  await axios.delete(`/api/students/${student.id}`)
 
  // history.push('/')

  };
};

const destroyCampus = (campus)=> {
  return async(dispatch)=> {
    dispatch(_destroyCampus(campus));
    await axios.delete(`/api/campuses/${campus.id}`)

    //history not pushing
  };
};



const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { 
  loadStudents,loadCampuses, 
  createStudent, createCampus, 
  destroyStudent, destroyCampus
};