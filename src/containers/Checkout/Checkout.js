import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {

   checkoutCancelHandler = () => {
     this.props.history.goBack();
   }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }


  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>

     );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

export default connect(mapStateToProps)(Checkout);