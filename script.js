const API_KEY = "92f0263949a74da9877e2fb48b92fbf9";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");

    let recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    let recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    let recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    let recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";
    recipeLinkEl.target = "_blank"; // Opens in new tab

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeListEl.innerHTML = "<p>Failed to load recipes. Please try again.</p>";
  }
}

async function init() {
  const recipes = await getRecipes();
  if (recipes) displayRecipes(recipes);
}

init();
