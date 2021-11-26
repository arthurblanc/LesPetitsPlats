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
			const template = new IngredientsList(ingredientsListFiltered[i]);
			if (template._ingredient != undefined) {
				this.$ingredientsListWrapper.appendChild(template.createIngredient());
			}
		}

		homepage.tags("btn-tag-ingredient", "bg-primary", ingredientsForTagsList);
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
		homepage.tags("btn-tag-appliance", "bg-success", appliancesForTagsList);
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

		homepage.tags("btn-tag-ustensil", "bg-danger", ustensilsForTagsList);
	}

	async tags(className, backgroundColor, tagsList) {
		// Tags
		const tags = document.getElementsByClassName(className);
		if (tags != undefined) {
			for (let i = 0; i < tags.length; i++) {
				tags[i].addEventListener("click", function () {
					const tagsContainer = document.getElementById("tags-container");
					const newTags = document.getElementById(tags[i].value);
					if (newTags === undefined || newTags === null) {
						tagsContainer.innerHTML += `
							<div id="${tags[i].value.split(" ").join("-")}" class="tags badge tag-${tags[i].value.split(" ").join("-")} ${backgroundColor} px-3 py-2 me-3 rounded">
								<span>${tags[i].value.charAt(0).toUpperCase() + tags[i].value.slice(1)}</span>
								<button id="btn-close-${tags[i].value.split(" ").join("-")}" type="button" class="btn-close btn-close-white btn-tag-close align-middle" aria-label="Close"></button>
							</div>`;
						tagsList.push(tags[i].value);

						searchByTags();

						homepage.removeTags();
						var searchValue = document.getElementById("search");
						if (searchValue.value.length > 2) {
							mainSearchbar(searchValue.value);
						} else {
							mainSearchbar("");
						}
					}
				});
			}
		}
	}

	async removeTags() {
		for (let i = 0; i < ingredientsForTagsList.length; i++) {
			const tag = document.getElementById(ingredientsForTagsList[i].split(" ").join("-"));
			const btnTag = document.getElementById("btn-close-" + ingredientsForTagsList[i].split(" ").join("-"));
			btnTag.addEventListener("click", function () {
				tag.remove();

				var index = ingredientsForTagsList.indexOf(btnTag.id.replace("btn-close-", "").split("-").join(" "));
				if (index !== -1) {
					ingredientsForTagsList.splice(index, 1);
				}
				searchByTags();
				homepage.recipe(recipesFilterByTags);
				homepage.renderIngredientsList();
				homepage.renderAppliancesList();
				homepage.renderUstensilsList();
			});
		}

		for (let i = 0; i < appliancesForTagsList.length; i++) {
			const tag = document.getElementById(appliancesForTagsList[i].split(" ").join("-"));
			const btnTag = document.getElementById("btn-close-" + appliancesForTagsList[i].split(" ").join("-"));
			btnTag.addEventListener("click", function () {
				tag.remove();

				var index = appliancesForTagsList.indexOf(btnTag.id.replace("btn-close-", "").split("-").join(" "));
				if (index !== -1) {
					appliancesForTagsList.splice(index, 1);
				}
				searchByTags();
				homepage.recipe(recipesFilterByTags);
				homepage.renderIngredientsList();
				homepage.renderAppliancesList();
				homepage.renderUstensilsList();
			});
		}
		for (let i = 0; i < ustensilsForTagsList.length; i++) {
			const tag = document.getElementById(ustensilsForTagsList[i].split(" ").join("-"));
			const btnTag = document.getElementById("btn-close-" + ustensilsForTagsList[i].split(" ").join("-"));
			btnTag.addEventListener("click", function () {
				tag.remove();

				var index = ustensilsForTagsList.indexOf(btnTag.id.replace("btn-close-", "").split("-").join(" "));
				if (index !== -1) {
					ustensilsForTagsList.splice(index, 1);
				}
				searchByTags();
				homepage.recipe(recipesFilterByTags);
				homepage.renderIngredientsList();
				homepage.renderAppliancesList();
				homepage.renderUstensilsList();
			});
		}
	}
}

// Init array
var ingredientsList = [];
var appliancesList = [];
var ustensilsList = [];
var recipesFilter = recipes;
var ingredientsForTagsList = [];
var appliancesForTagsList = [];
var ustensilsForTagsList = [];
var tagList = [ingredientsForTagsList, appliancesForTagsList, ustensilsForTagsList];
var recipesFilterByTags = recipesFilter;
var ingredientsListFiltered = ingredientsList;

const searchByTags = () => {
	if (ingredientsForTagsList.length === 0 && appliancesForTagsList.length === 0 && ustensilsForTagsList.length === 0) {
		recipesFilter = recipes;
		recipesFilterByTags = recipesFilter;
	} else {
		let bigDataFilter = "recipesFilter = recipesFilter.filter((recipe) => ";
		if (ingredientsForTagsList.length > 0) {
			recipesFilter = recipes;
			let dataFilter = "recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(";
			for (let i = 0; i < ingredientsForTagsList.length; i++) {
				let newData = "'" + ingredientsForTagsList[i] + "'";
				if (i > 0) {
					dataFilter = dataFilter + ") && recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(" + newData + ")";
				}
				if (i === 0) {
					dataFilter = dataFilter + newData;
				}
			}
			dataFilter = dataFilter + ")";
			bigDataFilter = bigDataFilter + dataFilter;
		}

		if (appliancesForTagsList.length > 0) {
			recipesFilter = recipes;
			let dataFilter = "";
			for (let i = 0; i < appliancesForTagsList.length; i++) {
				let newData = "recipe.appliance.toLowerCase().includes('" + appliancesForTagsList[i] + "'";
				if (i > 0) {
					dataFilter = dataFilter + " && " + newData;
				}
				if (i === 0) {
					dataFilter = dataFilter + newData;
				}
			}

			if (ingredientsForTagsList.length === 0 && ustensilsForTagsList.length > 0) {
				bigDataFilter = bigDataFilter + dataFilter;
			} else if (ingredientsForTagsList.length > 0 || ustensilsForTagsList.length > 0) {
				dataFilter = dataFilter + ")";
				bigDataFilter = bigDataFilter + " && " + dataFilter;
			} else {
				dataFilter = dataFilter + ")";
				bigDataFilter = bigDataFilter + dataFilter;
			}
		}

		if (ustensilsForTagsList.length > 0) {
			recipesFilter = recipes;
			let dataFilter = "recipe.ustensils.some((el) => el.toLowerCase().includes(";
			for (let i = 0; i < ustensilsForTagsList.length; i++) {
				let newData = "'" + ustensilsForTagsList[i] + "'";
				if (i > 0) {
					dataFilter = dataFilter + ") && recipe.ustensils.some((el) => el.toLowerCase().includes(" + newData + ")";
				}
				if (i === 0) {
					dataFilter = dataFilter + newData;
				}
			}
			dataFilter = dataFilter + ")";
			if (ingredientsForTagsList.length > 0 || appliancesForTagsList.length > 0) {
				bigDataFilter = bigDataFilter + ") && " + dataFilter;
			} else {
				bigDataFilter = bigDataFilter + dataFilter;
			}
		}
		bigDataFilter = bigDataFilter + ")";
		if (ingredientsForTagsList.length > 0 || ustensilsForTagsList.length > 0) {
			bigDataFilter = bigDataFilter + ")";
		}
		eval(bigDataFilter);
	}

	var searchValue = document.getElementById("search");
	if (searchValue.value.length > 2) {
		mainSearchbar(searchValue.value);
	} else {
		mainSearchbar("");
	}

	homepage.recipe(recipesFilterByTags);
	ingredientsListFiltered = ingredientsList;
	homepage.renderIngredientsList();
	homepage.renderAppliancesList();
	homepage.renderUstensilsList();
};

// Main Searchbar
const mainSearchbar = (searchValue) => {
	var search = searchValue.toLowerCase();
	recipesFilterByTags = recipesFilter;
	recipesFilterByTags = recipesFilterByTags.filter(
		(recipe) => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search) || recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(search))
	);
	homepage.recipe(recipesFilterByTags);
	homepage.renderIngredientsList();
	homepage.renderAppliancesList();
	homepage.renderUstensilsList();
};

document.getElementById("search-button").addEventListener("click", function (event) {
	event.preventDefault();
	var searchInput = document.getElementById("search");
	mainSearchbar(searchInput.value);
});

document.getElementById("search").addEventListener("input", updateValue);

function updateValue(e) {
	recipesFilterByTags = recipesFilter;
	if (e.target.value.length > 2) {
		mainSearchbar(e.target.value);
	} else {
		mainSearchbar("");
	}
}

const homepage = new Homepage();
homepage.recipe(recipes);
ingredientsListFiltered = ingredientsList;
homepage.renderIngredientsList();
homepage.renderAppliancesList();
homepage.renderUstensilsList();

export { homepage, Homepage };
