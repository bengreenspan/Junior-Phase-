import { connect } from "react-redux";
import React, { Component } from "react";
import {createCampus} from './store'


class CreateCampus extends Component {
    constructor() {
        super();
        this.state = {
            campusName: '',
            campusAddress: '',
        };
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
        await this.props.create(this.state.campusName, this.state.campusAddress)
        }
        catch(ex){
            this.setState({ error: ex.response.data});
        }
        
    }

    render(){
        const { campusName, campusAddress} = this.state
        const { onChange, onSave} = this
        return (
            <div>
        <form onSubmit={onSave}>
            {/* <pre>
            {
                !!error  && JSON.stringify(error, null, 2)
            }
            </pre> */}
            
            <input name='campusName' value={ campusName} onChange={ onChange} placeholder="Campus Name"/> <br />
            <input name='campusAddress' value={ campusAddress} onChange={ onChange} placeholder="Campus Address"/>  <br />
            <button disabled={!campusName || !campusAddress} >Build the Institute! </button>
        </form>
        <pre>
            {JSON.stringify(this.state, null, 2)}
        </pre>
        </div>
        );
    }
}

export default connect(
    null,
    (dispatch)=> {
        return {
            create: (campus) => dispatch(createCampus(campus))
        }
    } 
)(CreateCampus);
