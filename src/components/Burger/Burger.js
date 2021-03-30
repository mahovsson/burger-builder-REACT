import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
        let transformedIngredients = Object.keys(props.ingredients)// this gives [] of ["salad", "cheese", "tikki", "tanduri"]
                .map(igKey => { // <<= since we want to execute a function on each item of [] i.e ["salad", "cheese", "tikki", "tanduri"]
                   // gives quantity of each [] element ...salad, cheese...etc.... How? Key, Value Pair...you provide key [igKey] and it gives value ...for ex: cheese: 4, where cheese is key and 4 is value
                  // creating empty arrays of size = qualtity of each ingredient..for ex if you say
                  // ...Array(2) it creates two elements in array [undefined] and [undefined]
                  return [...Array(props.ingredients[igKey])]
                     //now we are going to fill up this empty array elements = qty of each ingredient,
                     // with real ingredient jsx code
                     .map((_,i) => {
                           //to give unique name to each key....chicken01,chicken 02 etc...
                          return <BurgerIngredient key={igKey + i} type={igKey} />;// key because we are returning
                          // an array of jsx elements and any Array requires keys
                          // ....means we are mapping/processing our object in to an array of ingredients
                  });
                })
                .reduce((arr,el) => {
                        return arr.concat(el)
                }, []);
            if (transformedIngredients.length === 0) {
              transformedIngredients = <p>PLease start adding ingredients</p>
            }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
   );
}

export default burger;