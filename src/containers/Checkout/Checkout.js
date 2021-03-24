import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
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
    let summary = <Redirect to="/" />
      if (this.props.ings) {
        summary = (
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
        )
      }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice
  }
};

export default connect(mapStateToProps)(Checkout);