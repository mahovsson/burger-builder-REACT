import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

const auth = props => {
  const [controls, setControls] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });

    const [isSignup, setIsSignup] = useState(true);

  const {buildingBurger, authRedirectPath, onSetAuthRedirectpath} = props;

  useEffect(() => {
      if (!buildingBurger && authRedirectPath !=='/') {
      onSetAuthRedirectpath();
    }
  },[buildingBurger, authRedirectPath, onSetAuthRedirectpath])



  const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value,controls.password.value,isSignup)
  };

   const inputChangedHandler = (event, controlName ) => {
      const updatedControls = {
        ...controls,
        [controlName]: {
          ...controls[controlName],
          value: event.target.value,
          valid: checkValidity(event.target.value, controls[controlName].validation),
          touched:true
        }
      };
      setControls(updatedControls);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  }

    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)} />
    ))

      if (props.loading) {
        form = <Spinner />
      }

      let errorMessage = null;

      if (props.error) {
        errorMessage = (
          <p>{props.error.message}</p>
        )
      }

      let authRedirect = null;
      if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
      }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={switchAuthModeHandler}>Switch to {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
     );
  }


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email,password, isSignup) => dispatch(actions.auth(email,password, isSignup)),
    onSetAuthRedirectpath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);