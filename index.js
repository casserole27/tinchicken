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
        chicken.likeChicken()     // use chicken method to update hasBeenLiked
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

function profileCounter() { 
    counterEl.classList.remove('hidden-counter');
    counterEl.textContent = savedProfiles.length;
};

function saveChickenProfile(profile) {
    if(chicken.hasBeenLiked) {
        savedProfiles.push(profile);
        profileCounter();
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
