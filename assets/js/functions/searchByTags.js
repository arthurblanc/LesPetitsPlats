// Main search with tags
const searchByTags = () => {
	// Reset recipesFilteredByTags array
	recipesFilteredByTags = recipes;
	// Filter recipesFilteredByTags array with ingredients tags
	for (let i = 0; i < ingredientsTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(ingredientsTagActivated[i])));
	}
	// Filter recipesFilteredByTags array with appliances tags
	for (let i = 0; i < appliancesTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.appliance.toLowerCase().includes(appliancesTagActivated[i]));
	}
	// Filter recipesFilteredByTags array with ustensils tags
	for (let i = 0; i < ustensilsTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.ustensils.some((el) => el.toLowerCase().includes(ustensilsTagActivated[i])));
	}
	// Launch mainSearch
	const searchValue = document.getElementById("search");
	// If searchbar have 3 characters launch search else launch empty search
	if (searchValue.value.length > 2) {
		mainSearch(searchValue.value);
	} else {
		mainSearch("");
	}
};
