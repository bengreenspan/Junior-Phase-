import React, { Component } from "react";
import { connect } from "react-redux";
import {updateStudent, refreshPage} from './store'

class UpdateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            campusId: '',
            imageURL: '',
            gpa: '',
            error: ''
            };
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    }

      async componentDidMount() {
        const { student } = this.props;
        if (student.id) {
          this.setState({
            id: student.id,
            name: student.name,
            lastName: student.lastName,
            email: student.email,
            campusId: student.campusId || "",
            imageURL: student.imageURL,
            gpa: student.gpa,
          });
        }
      }

    onChange(ev){
        const change = {};
            change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

   async onSave(ev){
    ev.preventDefault();
    try {
       await this.props.updateStudent({...this.state, });
       window.location.reload(); 
        }
    catch(er){
        this.setState({error: er.response.data.error.errors[0].message})
        }
    }

    render(){
        const { name, lastName, email, campusId, imageURL, gpa, error } = this.state
        const { onChange, onSave} = this
        return (
        <div>
            <form onSubmit={onSave}>  
                <pre>{!!error  && JSON.stringify(error, null, 2)}</pre>
                    <input name='name' value={ name} onChange={ onChange} placeholder="First Name"/> <br />
                    <input name='lastName' value={ lastName} onChange={ onChange} placeholder="Last Name"/>  <br />
                    <input name='email' value={ email} onChange={ onChange} placeholder="Email" /> <br />
                    <input name='imageURL' value={ imageURL} onChange={ onChange} placeholder="Profile Picture URL" /> <br />
                    <input type='number' name='gpa' value={gpa} onChange={ onChange} step='.1' placeholder="GPA" min='0' max='4.0' ></input>
                        <select value={campusId} name='campusId' onChange={ onChange}>
                            <option value=''>Select Campus </option> 
                                {this.props.campuses.map((campus) => (
                                <option key={campus.id} value = {campus.id}>
                                {campus.campusName}</option>
                            ))}
                        </select>
                    <br />
                <button disabled={!email || !lastName || !name || !campusId} >Update Details! </button>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        updateStudent: (student) => {
            dispatch(updateStudent(student, history)); 
        },
   };
};

export default connect((state) => state, mapDispatchToProps)(UpdateStudent)

