import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from '../ContactData/ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactDetails extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
      city: '',
    },
    loading: false
   }

   orderHandler = (e) => {
     e.preventDefault();
     this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name:'John Snow',
        address: {
          street: 'Kubicka 4',
          zipCode: '12456',
          country: 'Germany'
        },
        email: 'johnsnow@seznam.cz'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading:false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading:false});
      });
   }

  render() {
    let form = (
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
          <input className={classes.Input} type="email" name="email" placeholder="Your Email"></input>
          <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
          <input className={classes.Input} type="text" name="postal" placeholder="Postal"></input>
          <input className={classes.Input} type="text" name="city" placeholder="City"></input>
          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
          {form}
      </div>
     );
  }
}

export default ContactDetails;