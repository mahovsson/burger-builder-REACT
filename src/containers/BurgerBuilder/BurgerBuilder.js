import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICES = {
  salat: 0.7,
  cheese:1.2,
  meat:2,
  bacon: 0.5
}


class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salat: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
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
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients })

  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    console.log(disabledInfo)

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        price={this.state.totalPrice}
        />
      </Aux>
     );
  }
}

export default BurgerBuilder;