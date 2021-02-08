const foodMenu = document.getElementById("food-menu");
const foodDetail = document.getElementById("food-detail");
const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("searchBtn");

// add an event listener into the search Button and call the api
searchBtn.addEventListener("click", () => {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBar.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.meals === null) {
        alert("we don't have that dish");
      } else {
        displayCategories(data.meals);
      }
    });
});

const displayCategories = (categories) => {
  foodMenu.innerHTML = "";
  categories.forEach((food) => {
    const foodItem = document.createElement("div");
    foodItem.className = "card shadow";
    const foodInfo = `
              <img src="${food.strMealThumb}" class="card-img-top" height="200" width="300">
                  <div class="card-body">
                      <p class="card-text">${food.strMeal}</p>
                  </div>
          `;
    foodItem.innerHTML = foodInfo;
    foodMenu.appendChild(foodItem);

    // when a user clicks on a div that have to show.
    foodItem.addEventListener("click", () => {
      const foodIngredients = `
                <img src="${food.strMealThumb}" width="400" height="300">
                <h2>${food.strMeal}</h2>
                <div class="Ingredients">
                    <ul>
                        <li>${food.strIngredient1}</li>
                        <li>${food.strIngredient2}</li>
                        <li>${food.strIngredient3}</li>
                        <li>${food.strIngredient4}</li>
                        <li>${food.strIngredient5}</li>
                        <li>${food.strIngredient6}</li>
                    <ul>
                    <button onclick="document.getElementById('food-detail').style.display = 'none'" class="m-5 btn btn-success">GO BACK</button>
                </div>
            `;
      foodDetail.innerHTML = foodIngredients;
      foodDetail.style.display = "flex";
    });
  });
};
