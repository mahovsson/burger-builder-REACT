import React, { useState, useEffect } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-order'


const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients()
  },[])


  const updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum,el) => {
      return sum + el;
    },0);
    return sum > 0 ;
  }



  const purchaseHandler = () => {
    if(props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
      props.onInitPurchase();
      props.history.push('/Checkout');
  }


  let orderSummary = null
  let burger = props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />
  if(props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={props.ings}/>
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            ingredients={props.ings}
            purchaseable={updatePurchaseState(props.ings)}
            price={props.price}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
          />
        </Aux>
  );
   orderSummary = <OrderSummary
            ingredients={props.ings}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            price={props.price}
          />
  }

    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}>
            {orderSummary}
        </Modal>
          {burger}
      </Aux>
     );
  }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));