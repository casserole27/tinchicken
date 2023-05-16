// Remember to import the data and Dog class!
//TODO import chicken class

import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

// const chicken = new Chicken(chickensData.bob)
// console.log(chicken)
//? How to get each chicken?

let chickensArray = ['bob', 'beardie', 'billina', 'checkers', 'cottonball', 'cuckoo', 'jiggles']

/****** FUNCTIONS ******/

function getNewChicken() {
    const nextChickenData = chickensData[chickensArray.shift()]
    //using chickens array to grab data from data.js
    //this is the same as using chickensData[bob]
    return nextChickenData ? new Chicken(nextChickenData) : {}
    //ternary expression
    // if nextChicken Data is true
    //new chickens get assigned data, so we want nextChickenData
    // if there isn't any new data, return empty object
}

let chicken = getNewChicken()
//chicken is going to change, use let

function renderLikeBadge() {
    if (!chicken.hasBeenLiked && !chicken.hasBeenSwiped){
        document.getElementById('like-badge').classList.remove('hidden')
        chicken.hasBeenLiked = true;

        if (chickensArray.length > 0) {
            setTimeout(() => {
                chicken = getNewChicken()
                render()
                chicken.hasBeenLiked = false;
            }, 1500)
        } else {
            setTimeout(() => {
                renderEndMsg()
            }, 1500)    
        }
    }    
}

function renderNopeBadge() { 
    if (!chicken.hasBeenLiked && !chicken.hasBeenSwiped){
        document.getElementById('nope-badge').classList.remove('hidden')
        chicken.hasBeenSwiped = true;

        if (chickensArray.length > 0) {
            setTimeout(() => {
                chicken = getNewChicken()
                render()
                chicken.hasBeenSwiped = false;
            }, 1500)
        } else {
            setTimeout(() => {
                renderEndMsg()
            }, 1500)    
        }
    }     

}

const render = () => document.getElementById('main-container').innerHTML = chicken.getChickenHtml()

render()

function renderEndMsg() {
    chicken.hasBeenLiked = true
    chicken.hasBeenSwiped = true
    document.getElementById('body-container').innerHTML = 
    `<div class="end-data">
        <h2 class="end-title">🐔 The chickens have flown the coop!</h2>
        <a href="index.html">
        <img src="images/logo.png" 
            alt="Tinchicken logo with red background and white feather" 
            class="end-logo">
        </a>
        <a href="#" class="end-link">
        <img src="images/icon-profile.png" 
            alt="" 
            class="end-icon"
            aria-label="view profile">
            View saved profiles
        </a>  
    </div>`
}


/****** EVENT LISTENERS ******/

document.getElementById('cross-btn').addEventListener('click', renderNopeBadge)

document.getElementById('heart-btn').addEventListener('click', renderLikeBadge)




//*Scrim for "state of app"
//https://scrimba.com/learn/frontend/improve-the-ux-disable-the-button-cof174a169d8cc562fc635428
//* Don't run button code during a pause using booleans
//If false, run the button code
//If true, don't run the button code