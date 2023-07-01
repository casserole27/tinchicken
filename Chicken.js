class Chicken {
    constructor(data){
    Object.assign(this, data);
    };

    getChickenHtml() {
        const {name, avatar, alt, age, bio} = this;

        let chickenFeed = `
            <img src="${avatar}" 
            alt="${alt}"
            class="chicken-img">   

            <div class="txt-container">    
            <h1 class="title">${name},
                <span class="age">${age}
            </h1>
            <h2 class="subtitle">${bio}</h2>
            </div> 
            `

        return chickenFeed;
    };    

    swipeChicken() {
        this.hasBeenSwiped = true;
    }
    
    likeChicken() {
        this.hasBeenLiked = true;
    }

    likeBadge() {
        
        let likeBadgeFeed = 
            `<img src="images/badge-like.png" 
            alt=""
            class="badge"
            id="like-badge">
            `
        
        return likeBadgeFeed; 
    }

    nopeBadge() {

        let nopeBadgeFeed = `
        <img src="images/badge-nope.png" 
        alt=""
        class="badge"
        id="nope-badge"> 
        `  
        return nopeBadgeFeed;
      
    }

 };

export default Chicken

