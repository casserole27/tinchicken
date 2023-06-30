import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/


const badgeEl = document.getElementById('badge-el')
const counterEl = document.getElementById('profile-counter');
const heartBtn = document.getElementById('heart-btn');
const crossBtn = document.getElementById('cross-btn');

let savedProfiles = [];

const mainContainer = document.getElementById('main-container');
const savedProfilesContainer =  document.getElementById('saved-profiles-container');
 

/****** FUNCTIONS ******/

function getNewChicken() {
    const nextChickenData = chickensData.shift();
    return nextChickenData ? new Chicken(nextChickenData) : {};
};

let chicken = getNewChicken();

function renderChicken() {
    if (chicken.hasBeenSwiped) { 
        
        if (chickensData.length > 0) {    
            
            heartBtn.disabled = true;
            crossBtn.disabled = true;
            saveChickenProfile(chicken)
            setTimeout(() => {
                badgeEl.innerHTML = ''
                chicken = getNewChicken()
                render(); 
                heartBtn.disabled = false;
                crossBtn.disabled = false;
            }, 1200);
        
        } else {
            
            saveChickenProfile(chicken) 
            setTimeout(() => {
                badgeEl.innerHTML = ''
                renderSavedProfiles(savedProfiles); 
            }, 1500);    
        
        }
    } 

};

const render = () => mainContainer.innerHTML = chicken.getChickenHtml()

render(); 

function buttonSelection (e) {
    if (e.target.dataset.heart){
        chicken.swipeChicken()
        chicken.likeChicken()     
        renderBadges()
        renderChicken();
    } 
    if (e.target.dataset.cross) {
        chicken.swipeChicken()
        renderBadges()
        renderChicken()
    };    
}; 

function renderBadges() {
    if (chicken.hasBeenSwiped && chicken.hasBeenLiked) {
        badgeEl.innerHTML = chicken.likeBadge()
    } else {
        badgeEl.innerHTML = chicken.nopeBadge()
    }
};


//!ADDITIONAL FUNCTIONALITY

//if hasBeenLiked on the object is set to true, push to profile to the saved profiles array and update the profile counter
function saveChickenProfile(profile) {
    if(chicken.hasBeenLiked) {
        savedProfiles.push(profile);
        profileCounter();
    };
};

//when profiles are saved, the counter is revealed and displays a number equal to the length of the saved profiles array
function profileCounter() { 
    counterEl.classList.remove('hidden-counter');
    counterEl.textContent = savedProfiles.length;
};


//when the profile button is clicked, or we reach the end of the data, render the saved profiles into a new page
function renderSavedProfiles(arr) {
    if (arr.length > 0) {
        mainContainer.classList.add('hidden');
        document.getElementById('footer-container').classList.add('hidden')
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

//remove the profiles on the saved profiles page either by clicking or pressing enter
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


//reset the whole app
function resetApp() { 
    profileCounter();
    location.reload();
}

/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {
    if (e.target.id === 'profile-btn') {
        renderSavedProfiles(savedProfiles);
    } else if (e.target.id === 'home-link') {
        resetApp();
    } else {
        buttonSelection(e);
    }
});

savedProfilesContainer.addEventListener('click', removeImage)

savedProfilesContainer.addEventListener('keypress', removeImage)