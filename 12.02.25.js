document.addEventListener("DOMContentLoaded", () => {
    const recipeList = document.getElementById("recipe-card");
    const searchInput = document.getElementById("search");
  
    fetch("meals.json")
      .then(response => response.json())
      .then(data => {
        const recipes = data.meals;
  
        displayRecipes(recipes);
  
        searchInput.addEventListener("input", () => {
          const searchValue = searchInput.value.toLowerCase();
          const filtered = recipes.filter(recipe =>
            recipe.strMeal.toLowerCase().includes(searchValue)
          );
          displayRecipes(filtered);
        });
      })
      .catch(error => console.error("Ошибка загрузки данных:", error));
  
    function displayRecipes(recipes) {
      recipeList.innerHTML = "";
      recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
  
        card.innerHTML = `
          <div class="front">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <p>⏳ ${recipe.strTime} |🔥 ${recipe.strCalories}</p>
          </div>
          <div class="back">
            <h3>${recipe.strMeal}</h3>
            <p>${recipe.strInstructions}</p>
          </div>
        `;
  
        card.addEventListener("click", () => {
          card.classList.toggle("flipped");
        });
  
        recipeList.appendChild(card);
      });
    }
  });