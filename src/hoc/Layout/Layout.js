import React from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'

const layout = ( props ) => (
  <Aux>
      <div>Toolbar, SideDrawer, Backdrp</div>
      <main className={classes.Content}>
        {props.children}
      </main>
  </Aux>
);


export default layout;