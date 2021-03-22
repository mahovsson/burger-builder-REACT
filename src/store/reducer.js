import * as actionTypes from './actions'

const initialState = {
  ingredients: {
    salat: 0,
    bacon: 0,
    meat: 0,
    cheese:0
  },
  totalPrice: 4
}

const INGREDIENTS_PRICES = {
  salat: 0.7,
  cheese:1.2,
  meat:2,
  bacon: 0.5
}

const reducer = ( state = initialState, action) => {
      switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
          return {
              ...state,
              ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName]+1
              },
              totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
          }
        case actionTypes.REMOVE_INGREDIENT:
          return {
            ...state,
            ingredients:{
              ...state.ingredients,
              [action.ingredientName]:state.ingredients[action.ingredientName]-1
            },
            totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
          }
        default:
          return state
      }
}

export default reducer;