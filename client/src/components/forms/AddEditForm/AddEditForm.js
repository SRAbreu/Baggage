import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import AddButton from '../../display/AddButton';
import API from "../../../utils/ReactApi";
import SaveButton from '../../display/SaveButton';
import CancelButton from '../../display/CancelButton';
import DeleteButton from '../../display/DeleteButton';

 class AddEditForm extends Component {
     //when we click create, we'll "store" the bag info in state
         state = {
             newBag:{},
             BagName: '',
             BagType: '',
             BagDescription: '',
             redirect: false
         }
    //  this is creating a prop to be used in the dropdown menu to select a bag type
     static defaultProps = {
         types: ["Travel", "Shopping", "Errands", "Donation", "Daily", "Special"]
     }

     handleBagNameInput = event => {
        const {name, value} = event.target;
        this.setState({
          [name]: value,
        })
    };
        handleFormSubmit = event => {
            event.preventDefault();
            console.log(event);

            if (this.state.BagName) {
                console.log("insideBagName");
              API.saveNewBag({
            //These keys need to match the DB
                BagName: this.state.BagName,
                BagType: this.state.TypeOfBag,
                BagDescription: this.state.BagDescription,
                BagItems: this.state.BagItems
              })
                .then(res => {
                    console.log("success")
                    this.setState({
                      redirect: true,
                    })
                  })      
                .catch(err => console.log(err));
            } 
        }
  render() {
      //this is mapping through the array of bag types
      let bagTypes = this.props.types.map(typesofbag => {
        return <option key={typesofbag} value={typesofbag}>{typesofbag}</option>
      } );

      if (this.state.redirect) {
          return <Redirect to="/ManageBag" />
      }

    return (
        <Form className="edit-bag-form" onSubmit={this.handleFormSubmit} >
            <FormGroup row>
                <Label for="bag-name" sm={2}>Name</Label>
                <Col sm={10}>
                   <Input type="text" ref="bagname"
                   name="BagName" id="BagName" placeholder="Name"
                   value={this.state.BagName}
                   onChange={this.handleBagNameInput}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="type-of-bag" sm={2}>Type</Label>
                <Col sm={10}>
                {/* this is creating the drop down to choose a type of bag */}
                   <select type="select" ref="typesofbag"
                   value={this.state.TypeOfBag}
                   onChange={this.handleBagNameInput}
                   name="TypeOfBag" id="TypeOfBag" >
                    {bagTypes}
                   </select>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="bag-description" sm={2}>Description</Label>
                <Col sm={10}>
                    <Input type="textarea" ref="bagdescription"
                    name="BagDescription" id="BagDescription"
                    value={this.state.BagDescription}
                   onChange={this.handleBagNameInput}/>
                </Col>
            </FormGroup>
        {/* //for this button to submit properly we'll need an event handler that will be added in the handleFormSubmit */}
            <input className="create-bag-button" type="submit" value="Create" />
        <SaveButton />
        <CancelButton />
        <DeleteButton />
    
        </Form>
        );
    }
}

export default AddEditForm;
