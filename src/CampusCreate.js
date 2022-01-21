import { connect } from "react-redux";
import React, { Component } from "react";
import {createCampus, refreshPage} from './store'


class CreateCampus extends Component {
    constructor() {
        super();
        this.state = {
            campusName: '',
            campusAddress: '',
            campusImageURL: '',
            description: '',
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

     async onSave(ev){
        ev.preventDefault();
        try {
        await this.props.createCampus({...this.state})
        }
        catch(er){
            this.setState({ error: er.response.data.error.errors[0].message});
        }
        
    }

    render(){
        const { campusName, campusAddress, campusImageURL, description, error} = this.state
        const { onChange, onSave} = this
        return (
            <div>
        <form onSubmit={onSave}>
            <pre>
            {
                !!error  && JSON.stringify(error, null, 2)
            }
            </pre>
            
            <input name='campusName' value={ campusName} onChange={ onChange} placeholder="Campus Name"/> <br />
            <input name='campusAddress' value={ campusAddress} onChange={ onChange} placeholder="Campus Address"/>  <br />
            <input name='campusImageURL' value={ campusImageURL} onChange={ onChange} placeholder="Campus Image URL"/>  <br />
            <input name='description' value={ description} onChange={ onChange} placeholder="Description"/>  <br />
            <button disabled={!campusName || !campusAddress} >Build the Institute! </button>
        </form>
       
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    createCampus: (campus)=> dispatch(createCampus(campus))&&
    dispatch(refreshPage())
});

export default connect((state => state), mapDispatchToProps)(CreateCampus)

