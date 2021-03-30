import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENTS_PRICES = {
  salat: 0.7,
  cheese:1.2,
  meat:2,
  bacon: 0.5
}

const addIngredient = ( state, action ) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]+1}
  const updatedIngredients = updateObject (state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building: true
  }
  return updateObject ( state, updatedState );
}

const removeIngredient = ( state, action ) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
  const updatedIngs = updateObject (state.ingredients, updatedIng);
  const updatedState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building:true
  }
  return updateObject ( state, updatedState );
}

const setIngredients = ( state, action ) => {
  return updateObject( state, {
     ingredients:{
                salat: action.ingredients.salat,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
              },
              totalPrice: 4,
              error: false,
              building:false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {error:true});
};

const reducer = ( state = initialState, action) => {
      switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient (state, action);
          case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
          case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action)
        default:
          return state
      }
}

export default reducer;