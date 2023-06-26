class Chicken {
    constructor(data){
    Object.assign(this, data);
    };

    getChickenHtml() {
        const {name, avatar, alt, age, bio} = this;

        return `
        <img src="images/badge-like.png" 
            alt=""
            class="badge"
            id="like-badge">
        <img src="images/badge-nope.png" 
            alt=""
            class="badge"
            id="nope-badge">    
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
    };


};

export default Chicken

