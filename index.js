// Remember to import the data and Dog class!
//TODO import chicken class

import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

//? How to get each chicken?

let chickensArray = ['bob', 'beardie', 'billina', 'mrsbusiness','checkers', 'cottonball', 'cuckoo', 'jiggles']
let savedProfiles = []

/****** FUNCTIONS ******/

function getNewChicken() {
    const nextChickenData = chickensData[chickensArray.shift()];
    //using chickens array to grab data from data.js
    //this is the same as using chickensData[bob]
    return nextChickenData ? new Chicken(nextChickenData) : {};
    //ternary expression
    // if nextChicken Data is true
    //new chickens get assigned data, so we want nextChickenData
    // if there isn't any new data, return empty object
};

let chicken = getNewChicken(); //chicken is going to change, use let

function renderChicken() {
    if (!chicken.hasBeenSwiped){ //only run if hasBeenSwiped is false
        chicken.hasBeenSwiped = true;
        // document.getElementById('nope-badge').classList.add('nopebadge')

         /*
        set hasBeenSwiped to true when it's time for a new chicken to load
        this part will only run when it is true, 
        so clicking / running the function again will not work
        effectively disabling multiple button clicks while the app is rendering
        */
        if (chickensArray.length > 0) {
            setTimeout(() => {
                chicken = getNewChicken();
                render();
                chicken.hasBeenSwiped = false;
            }, 1500)
        } else {
            setTimeout(() => {
                renderEndMsg();
            }, 1500)    
        };
    };    

};

const render = () => document.getElementById('main-container').innerHTML = chicken.getChickenHtml();

render();

function renderEndMsg() {
    document.getElementById('main-container').innerHTML = 
    `<div class="end-data">
        <h2 class="end-title">🐔 The chickens have flown the coop!</h2>
        <a href="index.html">
        <a href="#" class="end-link">
        <img src="images/icon-profile.png" 
            alt="" 
            class="end-icon"
            aria-label="view profile">
            View saved profiles
        </a>  
    </div>`
};

function addSavedProfile(profile) {
    if (chickensData.hasBeenLiked){
    savedProfiles.push(profile);
    console.log(savedProfiles);
    }
}


/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {
    if (e.target.dataset.heart){
        document.getElementById('like-badge').classList.add('likebadge');
        chickensData.hasBeenLiked = true;
        renderChicken();
        addSavedProfile(chicken);
    } else if(e.target.dataset.cross) {
        document.getElementById('nope-badge').classList.add('nopebadge');
        renderChicken();
    };
});




//*Scrim for "state of app"
//https://scrimba.com/learn/frontend/improve-the-ux-disable-the-button-cof174a169d8cc562fc635428
//* Don't run button code during a pause using booleans
//If false, run the button code
//If true, don't run the button code