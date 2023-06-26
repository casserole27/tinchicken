import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

const counterEl = document.getElementById('profile-counter');

//!PREVIOUS CODE
// let chickensArray = ['bob', 'beardie', 'billina', 'mrsbusiness','checkers', 'cottonball', 'cuckoo', 'jiggles'];

// let chickensArray = chickensData.shift();
// console.log(chickensArray)

let savedProfiles = [];

const mainContainer = document.getElementById('main-container');
const savedProfilesContainer =  document.getElementById('saved-profiles-container');
 

/****** FUNCTIONS ******/

function getNewChicken() {
    const nextChickenData = chickensData.shift()
    return nextChickenData ? new Chicken(nextChickenData) : {};
};


//!PREVIOUS CODE
/*
function getNewChicken() {
    const nextChickenData = chickensData[chickensArray.shift()];
    return nextChickenData ? new Chicken(nextChickenData) : {};
};
*/

let chicken = getNewChicken(); 

function renderChicken() {
    if (!chicken.hasBeenSwiped){ 
        //! if (chickensArray.length > 0) {
        if (chickensData.length > 0) {    
            chicken.hasBeenSwiped = true; 
            saveChickenProfile(chicken)
            setTimeout(() => {
                chicken = getNewChicken(); 
                render(); 
                chicken.hasBeenSwiped = false; 
            }, 1200);
        } else {
            saveChickenProfile(chicken) 
            setTimeout(() => {
                renderSavedProfiles(savedProfiles); 
            }, 1500);    
        };
    };    

};

const render = () => mainContainer.innerHTML = chicken.getChickenHtml();

render(); 

function saveChickenProfile(profile) {
    if(chicken.hasBeenLiked) {
        savedProfiles.push(profile);
        profileCounter();
    };
};

function buttonSelection (e) { 
    if (e.target.dataset.heart){
        document.getElementById('like-badge').classList.add('likebadge');
        chicken.hasBeenLiked = true;
        renderChicken();
    } else if(e.target.dataset.cross) {
        document.getElementById('nope-badge').classList.add('nopebadge');
        renderChicken();
    };
};    

function removeImage(e) {
    const profile = e.target.dataset.saved;

    if (e.key === 'Enter' || e.type === 'click') {
        if (profile) {
            const index = savedProfiles.findIndex(item => item.name === profile)
            if (index !== -1) {
                savedProfiles.splice(index, 1);
                renderSavedProfiles(savedProfiles);
                profileCounter();
            };
        };
    };

    if ((e.key === 'Enter' || e.type === 'click') && savedProfiles.length === 0) {
        resetApp();
    };
};

function profileCounter() { 
    counterEl.classList.remove('hidden-counter');
    counterEl.textContent = savedProfiles.length;
};

function renderSavedProfiles(arr) {
    if (arr.length > 0) {
        mainContainer.classList.add('hidden');
        document.getElementById('cross-btn').classList.add('hidden');
        document.getElementById('heart-btn').classList.add('hidden');
        document.getElementById('saved-heading').classList.remove('hidden');
        document.getElementById('saved-subtitle').classList.remove('hidden');

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

        savedProfilesContainer.innerHTML = savedProfileFeed;
    };    
};

function resetApp() { 
    profileCounter();
    location.reload();
}

/****** EVENT LISTENERS ******/

document.addEventListener('click', buttonSelection); 

document.getElementById('profile-btn').addEventListener('click', () => renderSavedProfiles(savedProfiles));

savedProfilesContainer.addEventListener('click', removeImage)

savedProfilesContainer.addEventListener('keypress', removeImage)
 
document.getElementById('home-link').addEventListener('click', resetApp); 
