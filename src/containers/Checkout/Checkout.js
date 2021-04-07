import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const checkout = props => {

  const checkoutCancelHandler = () => {
     props.history.goBack();
   }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }


    let summary = <Redirect to="/" />
      if (props.ings) {
      const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null

        summary = (
          <div>
              {purchasedRedirect}
              <CheckoutSummary
              ingredients={props.ings}
              checkoutCancel={checkoutCancelHandler}
              checkoutContinue={checkoutContinueHandler}
            />
            <Route
              path={props.match.path + '/contact-data'}
              component={ContactData}
            />
        </div>
        )
      }

    return summary;
  }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
};



export default connect(mapStateToProps)(checkout);