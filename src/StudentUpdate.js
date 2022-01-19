import { connect } from "react-redux";
import React, { Component } from "react";


class StudentUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: ''
        };
        console.log(this.props.student)
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    onChange(ev){
        const change = {};
            change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSave(ev){
        ev.preventDefault();
        try {
          await this.props.create(this.state.name)
        }
        catch(ex){
            this.setState({ error: ex.response.data});
        }
        
    }

    render(){
        const { name, error } = this.state
        const { onChange, onSave} = this
        return (
        <form onSubmit={onSave}>
            <pre>
            {
                !!error  && JSON.stringify(error, null, 2)
            }
            </pre>
            <input name='name' value={ name} onChange={ onChange}/>
            <button>Update </button>
        </form>
        );
    }
}

export default connect(
   (state, otherProps) => {
    const student = state.students.find(student => student.id === otherProps.match.params.id*1) || {};
        return {
            student
   };
},
    (dispatch)=> {
        return {
            create: (name) => dispatch(createStudent(name))
        }
    } 
)(StudentUpdate);



