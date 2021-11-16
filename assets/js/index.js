import { Recipe } from "./class/recipe.js";
import { RecipeCard } from "./templates/RecipeCard.js";
import { IngredientsList } from "./templates/IngredientsList.js";
import { ApplianceList } from "./templates/ApplianceList.js";
import { UstensilsList } from "./templates/UstensilsList.js";

class Homepage {
	constructor() {
		this.$recipesListWrapper = document.querySelector("#recipes-list");
		this.$ingredientsListWrapper = document.querySelector("#ingredients-list");
		this.$appliancesListWrapper = document.querySelector("#appliances-list");
		this.$ustensilsListWrapper = document.querySelector("#ustensils-list");
	}
	// Render photographer list
	async recipe(array) {
		while (this.$recipesListWrapper.firstChild) {
			this.$recipesListWrapper.removeChild(this.$recipesListWrapper.lastChild);
		}
		ingredientsList = [];
		appliancesList = [];
		ustensilsList = [];
		array
			.map((recipe) => new Recipe(recipe))
			.forEach((recipe) => {
				const template = new RecipeCard(recipe);
				this.$recipesListWrapper.appendChild(template.createRecipeCard());

				for (let i = 0; i < template._recipe._ingredients.length; i++) {
					if (ingredientsList.indexOf(template._recipe._ingredients[i].ingredient.toLowerCase()) === -1) {
						ingredientsList.push(template._recipe._ingredients[i].ingredient.toLowerCase());
					}
				}

				if (appliancesList.indexOf(template._recipe._appliance) === -1) {
					appliancesList.push(template._recipe._appliance);
				}

				for (let i = 0; i < template._recipe._ustensils.length; i++) {
					if (ustensilsList.indexOf(template._recipe._ustensils[i]) === -1) {
						ustensilsList.push(template._recipe._ustensils[i]);
					}
				}
			});
	}

	async tagRender(listArray, wrapper) {
		while (wrapper.firstChild) {
			wrapper.removeChild(wrapper.lastChild);
		}

		for (let i = 0; i < 30; i++) {
			const template = new IngredientsList(listArray[i]);
			if (template._ingredient != undefined) {
				wrapper.appendChild(template.createIngredient());
			}
		}
	}
	async renderIngredientsList() {
		const tagsIngredient = document.getElementsByClassName("tags-ingredients");
		while (tagsIngredient.length > 0) {
			tagsIngredient[0].parentNode.removeChild(tagsIngredient[0]);
		}

		for (let i = 0; i < 30; i++) {
			const template = new IngredientsList(ingredientsList[i]);
			if (template._ingredient != undefined) {
				this.$ingredientsListWrapper.appendChild(template.createIngredient());
			}
		}
	}

	async renderAppliancesList() {
		while (this.$appliancesListWrapper.firstChild) {
			this.$appliancesListWrapper.removeChild(this.$appliancesListWrapper.lastChild);
		}

		for (let i = 0; i < 30; i++) {
			const template = new ApplianceList(appliancesList[i]);
			if (template._ingredient != undefined) {
				this.$appliancesListWrapper.appendChild(template.createAppliance());
			}
		}
	}

	async renderUstensilsList() {
		while (this.$ustensilsListWrapper.firstChild) {
			this.$ustensilsListWrapper.removeChild(this.$ustensilsListWrapper.lastChild);
		}

		for (let i = 0; i < 30; i++) {
			const template = new UstensilsList(ustensilsList[i]);
			if (template._ingredient != undefined) {
				this.$ustensilsListWrapper.appendChild(template.createUstensil());
			}
		}
	}
}

// Search
const searchFunction = (searchValue) => {
	var search = searchValue.toLowerCase();
	recipesFilter = recipesFilter.filter(
		(recipe) => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search) || recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(search))
	);
	homepage.recipe(recipesFilter);
	homepage.renderIngredientsList();
	homepage.renderAppliancesList();
	homepage.renderUstensilsList();
};

document.getElementById("search-button").addEventListener("click", function (event) {
	event.preventDefault();
	var searchInput = document.getElementById("search");
	searchFunction(searchInput.value);
});

document.getElementById("search").addEventListener("input", updateValue);

function updateValue(e) {
	recipesFilter = recipes;
	if (e.target.value.length > 2) {
		searchFunction(e.target.value);
	} else {
		searchFunction("");
	}
}

// Init array
var ingredientsList = [];
var appliancesList = [];
var ustensilsList = [];
var recipesFilter = recipes;

const homepage = new Homepage();
homepage.recipe(recipes);
homepage.renderIngredientsList();
homepage.renderAppliancesList();
homepage.renderUstensilsList();

export { homepage, Homepage };
