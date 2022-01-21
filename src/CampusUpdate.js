import { connect } from "react-redux";
import React, { Component } from "react";
import {updateCampus} from './store'


class UpdateCampus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campusName: '', 
            campusAddress: '',
            campusImageURL: '',
            description: '',
            error: ''
            // campusName: this.props.campus.id ? this.props.campus.campusName : '',
            // campusAddress: this.props.campus.id ? this.props.campus.campusAddress : '',
            // campusImageURL: this.props.campus.id ? this.props.campus.campusImageURL : '',
            // description: this.props.campus.id ? this.props.campus.description : '',
            // error: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    // componentDidUpdate(prevProps){
    //     if(!prevProps.campus.id && this.props.campus.id)
    //     this.setState({
    //     campusName: campus.campusName,
    //     campusAddress: campus.campusAddress,
    //     campusImageURL: campus.campusImageURL,
    //     description: campus.description,
    //     })
    // }

    async componentDidMount() {
        const { campus } = this.props;
          this.setState({
            id: campus.id,
            campusName: campus.campusName,
            campusAddress: campus.campusAddress,
            campusImageURL: campus.campusImageURL,
            description: campus.description,
          });
        }
      

    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

     async onSave(ev){
        ev.preventDefault();
        try {
        await this.props.updateCampus({...this.state})
        window.location.reload(); 
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
            <br />
            <button disabled={!campusName || !campusAddress} >Update the Institute! </button>
        </form>
        </div>
        );
    }
}


const mapDispatchToProps = (dispatch, {history}) => {
    return {
        updateCampus: (campus) => 
        {
    dispatch(updateCampus(campus, history)); 
},
};
};




export default connect((state => state), mapDispatchToProps)(UpdateCampus)

