const chickensData = [
    {   
        name: "Beardie Bird",
        // avatar: "images/beardiebird.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-KL4dP3W/0/94d2708c/XL/beardiebird-XL.png",
        alt: "brown and gray-feathered chicken with red crest on green background",
        age: 5,
        bio: "Can I live in your house?",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Billina",
        // avatar: "images/billina.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-7r8ckfH/0/83c1b9db/XL/billina-XL.png",
        alt: "yellow chicken with red crest walking around on green background",
        age: 6,
        bio: "Gnome-slayer, egg-layer",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Bob",
        // avatar: "images/bob.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-DdCNMZL/0/3b896046/XL/bob-XL.png",
        alt: "close-up side profile of chicken with black shiny feathers on green background",
        age: 7,
        bio: "I am a polite creeper.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Mrs. Business",
        // avatar: "images/mrsbusiness.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-zFS63q5/0/34c337e0/XL/mrsbusiness-XL.png",
        age: 8,
        alt: "close-up of black and white speckled hen with red crest on brown background",
        bio: "I love cheez puffs!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Checkers",
        // avatar: "images/checkers.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-JfsdSc3/0/00f5103a/XL/checkers-XL.png",
        alt: "close-up side profile of rooster with black and white feathers and red face on gray background",
        age: 3,
        bio: "I am a handsome boi.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Cottonball",
        // avatar: "images/cottonball.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-FBBrfgW/0/9563577a/XL/cottonball-XL.png",
        alt: "close-up of tan and gray hen with black beard feathers on green background",
        age: 2,
        bio: "Do you like my beard?",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Cuckoo",
        // avatar: "images/cuckoopuff.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-9jn5qBj/0/5d1dd466/XL/cuckoopuff-XL.png",
        alt: "white poofy chicken napping in the sun while standing on one leg on green background",
        age: 5,
        bio: "I am a cuckoo puff!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    {
        name: "Mrs. Jiggles",
        // avatar: "images/mrsjiggles.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-MCq89Rp/0/6c51cf08/XL/mrsjiggles-XL.png",
        alt: "close-up side profile of white chicken with large red comb",
        age: 3,
        bio: "Look at my jiggles!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
]

//! PREVIOUS CODE: OBJECT OF OBJECTS
/*
const chickensData = {
    beardie: {
        name: "Beardie Bird",
        // avatar: "images/beardiebird.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-KL4dP3W/0/94d2708c/XL/beardiebird-XL.png",
        alt: "brown and gray-feathered chicken with red crest on green background",
        age: 5,
        bio: "Can I live in your house?",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    billina: {
        name: "Billina",
        // avatar: "images/billina.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-7r8ckfH/0/83c1b9db/XL/billina-XL.png",
        alt: "yellow chicken with red crest walking around on green background",
        age: 6,
        bio: "Gnome-slayer, egg-layer",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    bob: {
        name: "Bob",
        // avatar: "images/bob.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-DdCNMZL/0/3b896046/XL/bob-XL.png",
        alt: "close-up side profile of chicken with black shiny feathers on green background",
        age: 7,
        bio: "I am a polite creeper.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    mrsbusiness: {
        name: "Mrs. Business",
        // avatar: "images/mrsbusiness.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-zFS63q5/0/34c337e0/XL/mrsbusiness-XL.png",
        age: 8,
        alt: "close-up of black and white speckled hen with red crest on brown background",
        bio: "I love cheez puffs!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    checkers: {
        name: "Checkers",
        // avatar: "images/checkers.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-JfsdSc3/0/00f5103a/XL/checkers-XL.png",
        alt: "close-up side profile of rooster with black and white feathers and red face on gray background",
        age: 3,
        bio: "I am a handsome boi.",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    cottonball: {
        name: "Cottonball",
        // avatar: "images/cottonball.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-FBBrfgW/0/9563577a/XL/cottonball-XL.png",
        alt: "close-up of tan and gray hen with black beard feathers on green background",
        age: 2,
        bio: "Do you like my beard?",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    cuckoo: {
        name: "Cuckoo",
        // avatar: "images/cuckoopuff.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-9jn5qBj/0/5d1dd466/XL/cuckoopuff-XL.png",
        alt: "white poofy chicken napping in the sun while standing on one leg on green background",
        age: 5,
        bio: "I am a cuckoo puff!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
    jiggles: {
        name: "Mrs. Jiggles",
        // avatar: "images/mrsjiggles.png",
        avatar: "https://photos.smugmug.com/Other/HOSTING/i-MCq89Rp/0/6c51cf08/XL/mrsjiggles-XL.png",
        alt: "close-up side profile of white chicken with large red comb",
        age: 3,
        bio: "Look at my jiggles!",
        hasBeenSwiped: false,
        hasBeenLiked: false
    },
}
*/

export default chickensData