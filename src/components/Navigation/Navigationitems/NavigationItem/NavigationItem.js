import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const naviagationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact
        to={props.link}
        activeClassName={classes.active}
        >{props.children}</NavLink>

    </li>
   );
}

export default naviagationItem;