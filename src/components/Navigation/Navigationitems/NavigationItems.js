import React from 'react';
import classes from '../Navigationitems/NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    </ul>
   );
}

export default navigationItems;