// Define RecipeCard class
class RecipeCard {
	constructor(recipe) {
		this._recipe = recipe;
	}

	createRecipeCard() {
		const $wrapper = document.createElement("div");
		$wrapper.classList.add("col");
		$wrapper.setAttribute("id", `${this._recipe._id}`);

		let cardIngredients = "";
		for (let ingredient of this._recipe._ingredients) {
			var ingredientQuantity = "";
			if (ingredient.quantity) {
				var ingredientQuantity = `: ${ingredient.quantity}`;
			}
			var ingredientUnit = "";
			if (ingredient.unit) {
				var ingredientUnit = `${ingredient.unit}`;
			}
			const ingredients = `
            <li class="card-ingredients-list-item">
                <span class="card-ingredients-list-item-ingredient">${ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)}</span>
                <span class="card-ingredients-list-item-quantity">${ingredientQuantity}</span>
                <span class="card-ingredients-list-item-unit">${ingredientUnit}</span>
            </li>
            `;
			cardIngredients = cardIngredients + ingredients;
		}

		// Render photographer card
		const recipeCard = `
        <div class="card h-100">
            <div class="card-img-top"></div>
            <div class="card-body">
                <div class="row mb-2">
                    <h2 class="card-title col-8 card-name">${this._recipe._name}</h2>
                    <div class="card-title col-4 text-end card-time-container"><img class="me-1 card-time-watch" src="./assets/img/watch-time.svg"><span class="card-time">${this._recipe._time} min</span></div>
                </div>
                <div class="row">
                    <ul class="card-text col-6 list-unstyled card-ingredients-list">${cardIngredients}</ul>
                    <p class="card-text col-6 card-description">${this._recipe._description.replace(/(.{185})..+/, "$1…")}</p>
                </div>
            </div>
        </div>
        `;

		$wrapper.innerHTML = recipeCard;
		return $wrapper;
	}
}
export { RecipeCard };
