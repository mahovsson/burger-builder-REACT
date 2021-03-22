import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

const INGREDIENTS_PRICES = {
  salat: 0.7,
  cheese:1.2,
  meat:2,
  bacon: 0.5
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
   }

  /* componentDidMount () {
    axios.get('https://react-burger-cecec-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true});
      })
  } */


  updatePurchaseState (ingredients) {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum,el) => {
      return sum + el;
    },0);
    this.setState({purchaseable: sum > 0 });
  }

  addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice+ priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
      const queryParams = [];
      for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
      }
      queryParams.push('price=' + this.state.totalPrice);
      const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/Checkout',
        search: '?' + queryString
      });
  }



  render() {
  let orderSummary = null
  let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />
  if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ingredients={this.props.ings}
            purchaseable={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
  );
   orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
  }
  if(this.state.loading) {
    orderSummary = <Spinner />
  }


    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
          {burger}
      </Aux>
     );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (igName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:igName}),
    onIngredientRemoved: (igName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:igName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));