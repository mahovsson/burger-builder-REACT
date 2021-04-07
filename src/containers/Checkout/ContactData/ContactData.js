import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button'
import classes from '../ContactData/ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

const contactData = props => {

  const [orderForm, setOrderForm] = useState({
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value:'',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type:'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type:'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type:'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value:'fastes',
        validation: {},
        valid: true,
      }
    });
    const [formIsValid, setFormIsValid] = useState(false);


   const orderHandler = event => {
     event.preventDefault(); // prevent default action

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    } // make array from object for input elements

     const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    } // order for axios to put post request

    props.onOrderBurger(order, props.token)
   }

   const checkValidity = (value, rules) => {
     let isValid = true;
      if(!rules) {
        return true;
      }
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
      }

      if(rules.isEmail) {
        const patter = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = patter.test(value) && isValid
      }

      if (rules.isNumeric) {
        const patter = /^\d+$/;
        isValid = patter.test(value) && isValid
      }

      return isValid;
   }

   const inputChangedHandler = (event, inputIdentifier) => {
     const updateOrderForm = {
       ...orderForm
     };
     const updatedFormElement = {
       ...updateOrderForm[inputIdentifier]
     };
     updatedFormElement.value = event.target.value;
     updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
     updatedFormElement.touched = true;
     updateOrderForm[inputIdentifier] = updatedFormElement;

     let formIsValid = true;
     for(let inputIdentifier in updateOrderForm) {
       formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
     }
     setOrderForm(updateOrderForm);
     setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    }


    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success" disabled={setFormIsValid(!formIsValid)}>ORDER</Button>
      </form>
    );

    if( props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
          {form}
      </div>
     );
  }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData, axios));