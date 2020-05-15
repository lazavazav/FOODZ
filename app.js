//using search button: find recipes based on input text from user
const search = document.querySelector("#searchBtn");
//event handler
search.addEventListener('click', (e) => {
  //get input text
const userInput = document.querySelector("#input");
let input = userInput.value;  
if(input !== ""){
  e.preventDefault();
  let api = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?&instructionsRequired=true&number=12&query="
  let query = input;
  async function searchRecipes(){
  const recipeSearch = await fetch(api + query, {
  "method": "GET",
  "headers": {
  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  "x-rapidapi-key": API_KEY
  }
})
  const searchData = await recipeSearch.json();
  for(let i = 0; i<searchData.results.length; i++){
    let info = `
    <div class="card">
    <img src="https://spoonacular.com/recipeImages/${searchData.results[i].image}" class="card-img-top" alt="food image" class="img-fluid" height="250">
    <div class="card-body">
    <h5 class="card-text">${searchData.results[i].title}</h5>
    <h6 class="card-text">Ready in: ${searchData.results[i].readyInMinutes} minutes</h6>
      <button type="button" class="btn btn-success" id="clickLink" data-toggle="modal" data-target="#Modal">
        See Recipe
      </button>
    </div>
  </div>
    `
    let id = searchData.results[i].id;
    document.querySelector("#main").insertAdjacentHTML("afterbegin", info);
  
    //onclicking see recipe button: grab selected recipe from api based on id
  document.getElementById("clickLink").onclick = function() {
    
    let api1 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/";
    let information = "/information";
    async function selectRecipe(){
    const select = await fetch(api1 + id + information, {
	  "method": "GET",
	  "headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": API_KEY
	}
})
const data = await select.json();
        let title = `<h5>${data.title}</h5>`
        let image = `<img src="${data.image}"class="img-fluid"/>`
        for(let i = 0; i < data.extendedIngredients.length; i++){
          let items = `<p>${data.extendedIngredients[i].original}</p>` 
           document.querySelector("#recipeIngredients").insertAdjacentHTML("afterbegin", items);
        }      
          let html =  
           `<h6>Ready in: ${data.readyInMinutes} minutes</h6> 
           <span>${data.instructions}</span>         `        
//display recipe choice in modal
    document.querySelector("#ModalTitle").insertAdjacentHTML("afterbegin", title + image);
    document.querySelector("#recipeInfo").insertAdjacentHTML("afterbegin", html); 
//save recipe title and id in local storage
document.getElementById("saveBtn").onclick = function() {
  localStorage.setItem(id, JSON.stringify(title));
  return;
  } 
} 
 selectRecipe();
    }
  }       
} 
searchRecipes();
} else{
  alert("please fill out input fields")
}
clearInput();
})

//click on favorites tab to see saved titles from local storage
function getFavorites(){
  for (let i = 0; i < localStorage.length; i++){
    let key = JSON.parse(localStorage.key(i));
    let value = JSON.parse(localStorage.getItem(key));
    let heart = `<a href="#jumboContainer"><img src="heart.svg" id="heart"></img></a>`
    document.querySelector("#saved").insertAdjacentHTML("afterbegin", heart + value);
   //clicking heart calls api again to view saved recipe
    document.getElementById("heart").onclick = function() { 
      //create a div with a class for recipe
      const div = document.createElement('div');
      div.className = 'container';
      const span = document.createElement('span');
      div.appendChild(span);
      const button = document.createElement('button');
      button.className = ('close');
      button.id = ('jumboBtn');
      button.innerHTML = '<span aria-hidden="true">&times;</span>';                 
      span.appendChild(button); 
      const ul = document.createElement('ul');
      div.appendChild(ul);
      const jumbo = document.getElementById('jumboContainer');
      jumbo.appendChild(div);
     
    let api2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/";
  let info = "/information";
  async function selectSavedRecipe(){
  const selected = await fetch(api2 + key + info, {
  "method": "GET",
  "headers": {
  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  "x-rapidapi-key": API_KEY
  }
  })
  const Data = await selected.json();
      let savedTitle = `<p class="lead">${Data.title}</p>`
      // let savedImage = `<img src="${Data.image}"class="img-fluid" width="180"height="200"/>`
      for(let i = 0; i < Data.extendedIngredients.length; i++){
        let savedItems = `<li>${Data.extendedIngredients[i].original}</li>`  
         ul.insertAdjacentHTML("afterbegin", savedItems);
      }     
        let body =  
         `<span>
         <img src="${Data.image}"class="img-fluid" width="180"height="200"/>
         <p>Ready in: ${Data.readyInMinutes} minutes</p>
         ${Data.instructions}</span>` 
        
  //display recipe choice in jumbotron
  div.insertAdjacentHTML("afterbegin", savedTitle + body);

  //closes the jumbotron with saved recipe
  let closeBtn = document.querySelector("#jumboBtn");
  closeBtn.addEventListener("click", closeJumbo);
  function closeJumbo(){
  div.style.visibility="hidden";
  //open jumbotron
  let storedFavs = document.querySelector("#storedFavorites");
  storedFavs.addEventListener("click", openJumbo);
  function openJumbo(){
  div.style.visibility="visible";

    } 
  }
  return;
    }
    selectSavedRecipe();
    }    
   }
  }
   getFavorites();
 
//clears search input field after clicking on search
function clearInput(){
  input.value = "";
}
     






//keeping this just in case
//it was the home page where random recipes would be displayed onload
//get random recipes from api to display on Home Page
// async function getRecipe(){
//   let api1 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=9"
// const recipeData = await fetch(api1, {
// "method": "GET",
// "headers": {
//   "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//   "x-rapidapi-key": API_KEY
// }
// })
// const recipe = await recipeData.json(); 
// for(let i=0; i < recipe.recipes.length; i++)  {
//       let recipeInfo =
//       `<div class="card">
//       <div class="card-body">
//         <img src="https://spoonacular.com/recipeImages/${recipe.recipes[i].image}" class="card-img-top" alt="food image" class="img-fluid" height="250">
//       <h5 class="card-text">${recipe.recipes[i].title}</h5>
//       <h6 class="card-text">Ready in: ${recipe.recipes[i].readyInMinutes} minutes</h6>
//         <button type="button" class="btn btn-success" id="Link" data-toggle="modal" data-target="#HomeModal">
//           See Recipe
//         </button>
//       </div>
//     </div>`     
//     let id = recipe.recipes[i].id;  
//    document.querySelector("#featured").insertAdjacentHTML("afterbegin", recipeInfo);    

//    //onclicking see recipe button: grab selected random recipe from api based on id
// document.getElementById("Link").onclick = function() {

//   let api1 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/";
//   let information = "/information";
//   async function selectRandomRecipe(){
//   const select = await fetch(api1 + id + information, {
//   "method": "GET",
//   "headers": {
//   "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//   "x-rapidapi-key": API_KEY
//   }
//   })
//   const randomdata = await select.json();
//       let title = `<h5>${randomdata.title}</h5>`
//       let image = `<img src="${randomdata.image}"class="img-fluid"/>`
//       for(let i = 0; i < randomdata.extendedIngredients.length; i++){
//         let items = `<p>${randomdata.extendedIngredients[i].original}</p>` 
//          document.querySelector("#recipeIngredients").insertAdjacentHTML("afterbegin", items);
//       }     
//         let html =  
//          `<h6>Ready in: ${randomdata.readyInMinutes} minutes</h6> 
//          <span>${randomdata.instructions}</span>         `        
//   //display recipe choice in modal
//   document.querySelector("#ModalTitle").insertAdjacentHTML("afterbegin", title + image);
//   document.querySelector("#recipeInfo").insertAdjacentHTML("afterbegin", html); 
//   //save recipe title and id in local storage
//   document.getElementById("saveBtn").onclick = function() {
//   localStorage.setItem(id, JSON.stringify(title));
//   return;
//     } 
//   } 
//   selectRandomRecipe();//allows user to click on a random recipe to see it
//    }
//   }
//  }
//  getRecipe(); //gets random recipes and displays on home page
 





  







 

  
  




  
  
