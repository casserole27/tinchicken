import chickensData from './data.js';
import Chicken from './Chicken.js'

/****** VARIABLES ******/

const badgeEl = document.getElementById('badge-el')
const counterEl = document.getElementById('profile-counter');
const heartBtn = document.getElementById('heart-btn');
const crossBtn = document.getElementById('cross-btn');

let swipedProfiles = [];
let likedProfiles = [];

//use index of array rather than manipulating or changing original chickensData array
let currentChickenIndex = 0;
let currentChicken = new Chicken(chickensData[currentChickenIndex])

const mainContainer = document.getElementById('main-container');
const savedProfilesContainer =  document.getElementById('saved-profiles-container');
 

/****** FUNCTIONS ******/

function getNewChicken() {
    currentChickenIndex++
    currentChicken = new Chicken(chickensData[currentChickenIndex]);
    render()
}

function renderChicken() {
        
        if (currentChickenIndex < (chickensData.length - 1)) {    
                        
            heartBtn.disabled = true;
            crossBtn.disabled = true;
            setTimeout(() => {
                badgeEl.innerHTML = '';
                getNewChicken();
                heartBtn.disabled = false;
                crossBtn.disabled = false;
            }, 1200);
        
        } else if (currentChickenIndex === (chickensData.length - 1) && likedProfiles.length === 0) {
        
            setTimeout(() => {
                flyTheCoop()
            }, 1500);    
        
        } else {
        
            setTimeout(() => {
                badgeEl.innerHTML = ''
                renderSavedProfiles(likedProfiles);
            }, 1500);    
        
        }
};

const render = () => mainContainer.innerHTML = currentChicken.getChickenHtml()

render(); 

function buttonSelection (e) {
    if (e.target.dataset.heart){
        chickenChoice(true)
    } 
    if (e.target.dataset.cross) {
        chickenChoice(false)
    };    
}; 

function chickenChoice(boolean) {
    badgeEl.innerHTML = currentChicken.chickenStatus(boolean);
    swipedProfiles.push(currentChicken);
    likedChickenProfiles(swipedProfiles);
    renderChicken();
};

//!ADDITIONAL FUNCTIONALITY

//filter swiped profiles array to find profiles that hasBeenLiked === true
//run profile counter function, passing likedProfiles array
function likedChickenProfiles(arr){
    likedProfiles = arr.filter(profile => profile.hasBeenLiked === true);
    profileCounter(likedProfiles)
}; 

//count liked profiles based on length of array
function profileCounter(arr) {
    if (arr.length > 0) {
        counterEl.classList.remove('hidden-counter');
        counterEl.textContent = arr.length;
    }    
};

//function for the possibility of all profiles being "nope"
function flyTheCoop() {
    badgeEl.innerHTML = '';
    document.getElementById('footer-container').classList.add('hidden');
    mainContainer.innerHTML = `
        <img src="https://photos.smugmug.com/Other/HOSTING/i-X4qs8d8/0/0821c8ba/XL/billinabw-XL.png"
            class="chicken-img" 
            alt="black and white image of chicken in the snow">
    
        <div class="txt-container">
            <h1 class="end-title">The chickens have flown the coop!</h1>
        </div>`
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
            const index = likedProfiles.findIndex(item => item.name === profile)
            if (index !== -1) {
                likedProfiles.splice(index, 1);
                renderSavedProfiles(likedProfiles);
                profileCounter(likedProfiles);
            };
        };
    };

    if ((e.key === 'Enter' || e.type === 'click') && likedProfiles.length === 0) {
        resetApp();
    };
};

//reset the whole app
function resetApp() { 
    profileCounter(likedProfiles);
    currentChickenIndex = 0;
    location.reload();
}

/****** EVENT LISTENERS ******/

document.addEventListener('click', e => {
    if (e.target.id === 'profile-btn') {
        renderSavedProfiles(likedProfiles)
    } else if (e.target.id === 'home-link') {
        resetApp();
    } else {
        buttonSelection(e);
    }
});

savedProfilesContainer.addEventListener('click', removeImage)

savedProfilesContainer.addEventListener('keypress', removeImage)