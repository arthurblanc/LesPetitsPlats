// Define IngredientsList class
class IngredientsList {
	constructor(ingredient) {
		this._ingredient = ingredient;
	}

	createIngredient() {
		if (this._ingredient !== undefined) {
			const $wrapper = document.createElement("li");
			$wrapper.classList.add("tags-ingredients");

			// Render photographer card
			const ingredientItem = `
		<button class="dropdown-item btn-tag-ingredient" type="button" value="${this._ingredient.toLowerCase()}">${this._ingredient.charAt(0).toUpperCase() + this._ingredient.slice(1)}</button>
        `;

			$wrapper.innerHTML = ingredientItem;
			return $wrapper;
		}
	}
}
export { IngredientsList };
