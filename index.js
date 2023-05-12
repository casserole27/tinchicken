// Remember to import the data and Dog class!
//TODO import chicken class

import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

const chicken = new Chicken(chickensData[0])
console.log(chicken)
//? How to get each chicken?




/****** FUNCTIONS ******/

const render = () => {
    document.getElementById('main-container').innerHTML = chicken.getChickenHtml()
}

render()

//TODO add like badge

//TODO add nope badge
    
//TODO display new chicken after timeout

/****** EVENT LISTENERS ******/

//TODO click X icon

//TODO click heart icon



//*Scrim for "state of app"
//https://scrimba.com/learn/frontend/improve-the-ux-disable-the-button-cof174a169d8cc562fc635428
//* Don't run button code during a pause using booleans
//If false, run the button code
//If true, don't run the button code