import * as actionTypes from '../actions/actionTypes';
import axions from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData:orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error:error
  };
};

export const purchaseBurgetStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      });
  }
}