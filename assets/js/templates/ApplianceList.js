// Define IngredientsList class
class ApplianceList {
	constructor(ingredient) {
		this._ingredient = ingredient;
	}

	createAppliance() {
		if (this._ingredient !== undefined) {
			const $wrapper = document.createElement("li");
			$wrapper.classList.add("tags-appliances");

			// Render photographer card
			const ingredientItem = `
		<button class="dropdown-item btn-tag-appliance" type="button" value="${this._ingredient.toLowerCase()}">${this._ingredient.charAt(0).toUpperCase() + this._ingredient.slice(1)}</button>
        `;

			$wrapper.innerHTML = ingredientItem;
			return $wrapper;
		}
	}
}
export { ApplianceList };
