import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

const counterEl = document.getElementById('profile-counter');

let chickensArray = ['bob', 'beardie', 'billina', 'mrsbusiness','checkers', 'cottonball', 'cuckoo', 'jiggles'];
let savedProfiles = [];
let savedProfilesLocalStorage = JSON.parse(localStorage.getItem('savedProfiles'));
let chickensArrayFromLocalStorage = JSON.parse(localStorage.getItem('chickensArray'));
 

/****** FUNCTIONS ******/

function getNewChicken() {
    /* If there are saved profiles in local storage, 
    and the length of chickensArray in local storage is greater than 0,
    then the chickensArray value should be assigned from localStorage.
    This ensures the logic of this function and localStorage have 
    the most recently updated values, and if the app is reloaded
    it does not show previous chickens as a choice again.
    */
    if (savedProfilesLocalStorage && chickensArrayFromLocalStorage.length > 0) {
        chickensArray = chickensArrayFromLocalStorage;
    };
    /* Sets most recent value of chickensArray to localStorage,
    including currently rendered chicken. This gives the opportunity
    for currently displayed chicken to be saved. */
    localStorage.setItem('chickensArray', JSON.stringify(chickensArray));
    const nextChickenData = chickensData[chickensArray.shift()];
    //using chickens array to grab data from data.js
    //this is the same as using chickensData[bob]
    return nextChickenData ? new Chicken(nextChickenData) : {};
    //ternary expression
    // if nextChicken Data is true
    //new chickens get assigned data, so we want nextChickenData
    // if there isn't any new data, return empty object
    
};

let chicken = getNewChicken(); //chicken is going to change, use let : assign object to chicken variable

//! How to save profile for last item in the array? Skips over if liked
function renderChicken() {
    console.log(chickensArray.length)
    if (!chicken.hasBeenSwiped){ //only run if hasBeenSwiped is false
         /*
        set hasBeenSwiped to true when it's time for a new chicken to load
        this part will only run when it is true, 
        so clicking / running the function again will not work
        effectively disabling multiple button clicks while the app is rendering
        */
        if (chickensArray.length > 0) {
            chicken.hasBeenSwiped = true; //flip boolean to disable button, this function can only run when hasBeenSwiped is false, no button clicks during render 
            saveChickenProfile(chicken)// save the profile
            setTimeout(() => {
                chicken = getNewChicken(); //chicken is assigned a new instance of Chicken
                render(); //render container 
                chicken.hasBeenSwiped = false; //set boolean back to false to enable button 
            }, 1200);
        } else {
            saveChickenProfile(chicken) //call this here to render last chicken
            setTimeout(() => {
                renderSavedProfiles(savedProfiles); //when chickensArray is empty, display saved profiles page
            }, 1500);    
        };
    };    

};

function render() {
    if (savedProfilesLocalStorage && chickensArrayFromLocalStorage.length === 0) {
        /*if there are saved profiles from local storage,
        and the saved version of chickens array is empty,
        render local storage and display saved profile page */
        renderLocalStorage();
        renderSavedProfiles(savedProfiles);
    } else {
        /*render main container with current chicken object using getChickenHtml() from classes function*/
        document.getElementById('main-container').innerHTML = chicken.getChickenHtml();
        renderLocalStorage();
    };
};

render(); //call render to display currently rendered chicken object

function renderLocalStorage() { 
    //if there are profiles in local storage, assign them to the savedProfiles array and enable the profile counter
    if (savedProfilesLocalStorage) {
        savedProfiles = savedProfilesLocalStorage;
        profileCounter();
    };
};

//This is the function that is causing the bug in disabling the buttons
//I moved it into renderChicken() function instead of calling it when the heart when button is pressed
function saveChickenProfile(profile) {
    /*if a chicken object hasBeenLiked is set to true,
    push that chicken object to savedprofiles array and enable the profile counter
    save savedProfiles array to local storage.
    It is also in a setTimeout that follows the object rendering,
    otherwise it's possible for it to skip chicken objects*/
    if(chicken.hasBeenLiked) {
        setTimeout(() => {
            savedProfiles.push(profile);
            profileCounter();
            localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
        }, 1200);
    };
};

function buttonSelection (e) { //render badge based on button choice, render new chicken
    if (e.target.dataset.heart){
        document.getElementById('like-badge').classList.add('likebadge');
        chicken.hasBeenLiked = true;
        renderChicken();
        // saveChickenProfile(chicken); original position of this function, but was overriding button disable logic
    } else if(e.target.dataset.cross) {
        document.getElementById('nope-badge').classList.add('nopebadge');
        renderChicken();
    };
};    

function removeImageOnClick (e) { 
    /* on saved profile page, targets specific saved profile images to remove data on click,
    removes profile from array with .splice() method, updates rendering of saved profiles and profile counter.
    If there are no more saved profiles, it resets the app.*/
    const profile = e.target.dataset.saved;
    if (profile){
        const index = savedProfiles.findIndex(item => item.name === profile)
        if (index !== -1) {
            savedProfiles.splice(index, 1);
            renderSavedProfiles(savedProfiles);
            profileCounter();
        };
    };

    if (savedProfiles.length === 0 ) {
       resetApp();
    }; 
};

function removeImageOnEnter (e) {
      /* same logic as removeImageOnClick, but allowing remove on click with enter button since it is not a default behavior.*/
    const profile = e.target.dataset.saved;

    if (e.key === 'Enter') {
        if (profile){
            const index = savedProfiles.findIndex(item => item.name === profile)
            if (index !== -1) {
                savedProfiles.splice(index, 1);
                renderSavedProfiles(savedProfiles);
                profileCounter();
            };
        };
    };    

    if (e.key === 'Enter' && savedProfiles.length === 0 ) {
        resetApp();
    }; 
};

function profileCounter() { //show the profile counter, update text with the length of savedProfiles
    counterEl.classList.remove('hidden-counter');
    counterEl.textContent = savedProfiles.length;
};

function renderSavedProfiles(arr) {
    /*Hides the buttons, displays text that was previously hidden.
    Hides the main container, and renders saved profiles to a different container.*/
    if (arr.length > 0) {
        document.getElementById('main-container').classList.add('hidden');
        document.getElementById('cross-btn').classList.add('hidden');
        document.getElementById('heart-btn').classList.add('hidden');
        document.getElementById('saved-heading').classList.remove('hidden');

        /**********************///! Should this also be done with classes?
        let savedProfileFeed = '';

            arr.forEach(profile => {
                savedProfileFeed += `
                <div class="saved-profile">
                
                <div class="saved-img-container">
                    <img src="${profile.avatar}" 
                    alt="image of chicken"
                    class="saved-img"
                    tabindex = 0
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
};

function resetApp() { //resets everything to zero / the beginning 
    profileCounter();
    location.reload();
    localStorage.clear();
}

/****** EVENT LISTENERS ******/

document.addEventListener('click', buttonSelection); //heart and cross button event listener

document.getElementById('profile-btn').addEventListener('click', () => renderSavedProfiles(savedProfiles)); //profile button event listener

document.getElementById('saved-profiles-container').addEventListener('click', removeImageOnClick); //image click and enter event listeners

document.getElementById('saved-profiles-container').addEventListener('keypress', removeImageOnEnter);    
 
document.getElementById('home-link').addEventListener('click', resetApp); //top of page logo reset link event listener