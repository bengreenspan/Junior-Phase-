import React, { Component } from "react";
import { connect } from "react-redux";
import {updateStudent} from './store'


class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            campus: '',
            error: '',
            imageURL: '',
            gpa: '',
            error: ''
        };
        console.log(this.props)
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    componentDidUpdate(){
        // this.setState({ name: this.props.student.name})
        // console.log(this.props)
    }

    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

   async onSave(ev){
        ev.preventDefault();
        try {
       await this.props.createStudent({...this.state, });
    }
    catch(er){
        this.setState({error: er.response.data.error.errors[0].message})
    }
    }

    render(){
        const { name, lastName, email, campus, imageURL, gpa, error } = this.state
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
            <input name='imageURL' value={ imageURL} onChange={ onChange} placeholder="Profile Picture URL" /> <br />
            {/* <input name='gpa' value={ gpa} onChange={ onChange} placeholder="Grade Point Average" /> <br /> */}
           
           {/* <label htmlFor='gpa'>Grade Point Average</label> */}
            <input type='number' name='gpa' value={gpa} onChange={ onChange} step='.1' placeholder="GPA" min='0' max='4.0' ></input>
           
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
        {console.log(this.state.students.find(student => student.id === otherProps.match.params.id) )}
        </div>
        );
    }
}

{/* <pre>
{JSON.stringify(this.state, null, 2)}
</pre> */}
export default connect(
    state => state
)(UpdateStudent);

// export default connect(
//     (state, otherProps) => {
//     const student = state.students.find(student => student.id === otherProps.match.params.id) || {};
// return {
//     student
//     };
// },
// (dispatch, {history}) => {
//     return {
//         createStudent: (student)=> dispatch(createStudent(student))
//         }
//     }
//  )(UpdateStudent)
