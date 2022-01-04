// Main Search function with while/for loop
const mainSearch = (value) => {
	const search = value.toLowerCase();
	const newRecipesFilterByTags = [];
	recipesFilteredBySearch = recipesFilteredByTags;
	for (let i = 0; i < recipesFilteredBySearch.length; i++) {
		if (
			recipesFilteredBySearch[i].name.toLowerCase().includes(search) ||
			recipesFilteredBySearch[i].description.toLowerCase().includes(search) ||
			recipesFilteredBySearch[i].ingredients.some((el) => el.ingredient.toLowerCase().includes(search))
		) {
			newRecipesFilterByTags.push(recipesFilteredBySearch[i]);
		}
	}
	renderRecipesAndTags(newRecipesFilterByTags);
};

const searchbarValue = (e) => {
	// If searchbar have 3 characters launch search with input else launch empty search
	if (e.target.value.length > 2) {
		mainSearch(e.target.value);
	} else {
		mainSearch("");
	}
};
