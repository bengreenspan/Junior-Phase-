import React, { Component } from "react";
import { connect } from "react-redux";
import {createStudent} from './store'


class CreateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            campus: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

       onSave(ev){
        ev.preventDefault();
        this.props.createStudent({...this.state});
    
    }

    render(){
        const { name, lastName, email, campus, error } = this.state
        const { onChange, onSave} = this
        return (
            <div>
        <form onSubmit={onSave}>
            <pre>
            {
                !!error  && JSON.stringify(error, null, 2)
            }
            </pre>
        
    


            
            <input name='name' value={ name} onChange={ onChange} placeholder="First Name"/> <br />
            <input name='lastName' value={ lastName} onChange={ onChange} placeholder="Last Name"/>  <br />
            <input name='email' value={ email} onChange={ onChange} placeholder="Email" /> <br />
            <select value={campus} name='campus' onChange={ onChange}>
                <option value=''>Select Campus </option> 
            {this.props.campuses.map((campus) => (
                <option key={campus.id} value = {campus.id}>
                {campus.campusName}
                </option>
            ))}

            </select>
            <br />
            <button disabled={!email || !lastName || !name || !campus} >Submit </button>
        </form>
        <pre>
            {JSON.stringify(this.state, null, 2)}
        </pre>
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    createStudent: (student)=> dispatch(createStudent(student))
});

export default connect(  (state => state), mapDispatchToProps)(CreateStudent)

//     null,
//     (dispatch)=> {
//         return {
//             createStudent: (student) => 
//            dispatch(createStudent
//             //console.log
//             (student)
//             )
//         }
//     } 
// )(CreateStudent);
