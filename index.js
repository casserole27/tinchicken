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

function render() {
    if (savedProfilesLocalStorage && chickensArrayFromLocalStorage.length === 0) {
        renderLocalStorage();
        renderSavedProfiles(savedProfiles);
    } else {
    document.getElementById('main-container').innerHTML = chicken.getChickenHtml();
    renderLocalStorage();
    };
};

render();

function renderLocalStorage() {
    if (savedProfilesLocalStorage) {
        savedProfiles = savedProfilesLocalStorage;
        profileCounter();
    };
};

function saveChickenProfile(profile) {
    if(chicken.hasBeenLiked) {
        setTimeout(() => {
            savedProfiles.push(profile);
            profileCounter();
            localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
        }, 1200);
    };
};

function profileCounter() {
    counterEl.classList.remove('hidden-counter');
    counterEl.textContent = savedProfiles.length;
};

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

function resetApp() {
    profileCounter();
    location.reload;
    localStorage.clear();
}

/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {
    if (e.target.dataset.heart){
        document.getElementById('like-badge').classList.add('likebadge');
        chicken.hasBeenLiked = true;
        renderChicken();
        saveChickenProfile(chicken);
    } else if(e.target.dataset.cross) {
        document.getElementById('nope-badge').classList.add('nopebadge');
        renderChicken();
    } else if(e.target.id === 'profilebtn') {
        renderSavedProfiles(savedProfiles);
    }    
});

document.getElementById('saved-profiles-container').addEventListener('click', e => {
    const profile = e.target.dataset.saved;
    if (profile){
        const index = savedProfiles.findIndex(item => item.name === profile)
        if (index !== -1) {
            savedProfiles.splice(index, 1);
            renderSavedProfiles(savedProfiles);
        };
    };

    if (savedProfiles.length === 0 ) {
       resetApp();
    }; 
 });

 document.getElementById('home-link').addEventListener('click', resetApp);


