// Remember to import the data and Dog class!
//TODO import chicken class

import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

const counterEl = document.getElementById('profile-counter');

let chickensArray = ['bob', 'beardie', 'billina', 'mrsbusiness','checkers', 'cottonball', 'cuckoo', 'jiggles'];
let savedProfiles = [];

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
            }, 1200);
        } else {
            setTimeout(() => {
                renderSavedProfiles(savedProfiles);
            }, 1500);    
        };
    };    

};

const render = () => document.getElementById('main-container').innerHTML = chicken.getChickenHtml();

render();

function saveProfiles(profile) {
    if(chicken.hasBeenLiked) {
        setTimeout(() => {
            savedProfiles.push(profile);
            counterEl.classList.remove('hidden-counter');
            counterEl.textContent = savedProfiles.length;
        }, 1200);
    };
};    


/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {
    if (e.target.dataset.heart){
        document.getElementById('like-badge').classList.add('likebadge');
        chicken.hasBeenLiked = true;
        renderChicken();
        saveProfiles(chicken);
    } else if(e.target.dataset.cross) {
        document.getElementById('nope-badge').classList.add('nopebadge');
        renderChicken();
    } else if(e.target.id === 'profilebtn') {
        renderSavedProfiles(savedProfiles);
    };    
});

document.getElementById('saved-profiles-container').addEventListener('click', e => {
    const profile = e.target.dataset.saved;
     
    if (profile){
        const index = savedProfiles.findIndex(item => item.name === profile)
        if (index !== -1) {
            savedProfiles.splice(index, 1);
            renderSavedProfiles(savedProfiles);
            counterEl.textContent = savedProfiles.length;
        };
    };

    if (savedProfiles.length === 0 ) {
        window.location.reload(); 
    }; 
 });


function renderSavedProfiles(arr) {
    document.getElementById('main-container').classList.add('hidden');
    document.getElementById('cross-btn').classList.add('hidden');
    document.getElementById('heart-btn').classList.add('hidden');
    document.getElementById('saved-heading').classList.remove('hidden');

    //? Should this also be done with classes?
    let savedProfileFeed = '';

        arr.forEach(profile => {
            savedProfileFeed += `
            <div class="saved-profile">
            
            <div class="saved-img-container">
                <img src="${profile.avatar}" 
                alt="image of chicken"
                class="saved-img"
                data-saved="${profile.name}">
            </div>

            <div class="saved-txt-container">    
                <h1 class="saved-title">${profile.name},
                    <span class="saved-age">${profile.age}</span>
                </h1>
                <h2 class="saved-bio">${profile.bio}</h2>
            </div>
            </div> 
            `
        });

    document.getElementById('saved-profiles-container').innerHTML = savedProfileFeed;
};

//*Scrim for "state of app"
//https://scrimba.com/learn/frontend/improve-the-ux-disable-the-button-cof174a169d8cc562fc635428
//* Don't run button code during a pause using booleans
//If false, run the button code
//If true, don't run the button code