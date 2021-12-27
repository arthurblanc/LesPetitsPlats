// Render Function
const renderRecipesAndTags = (recipes) => {
	// Render recipes
	homepage.recipe(recipes);
	// Reset Filtered arrays
	ingredientsListFiltered = ingredientsList;
	appliancesListFiltered = appliancesList;
	ustensilsListFiltered = ustensilsList;
	// Render tags
	homepage.renderIngredientsList(ingredientsList);
	homepage.renderAppliancesList(appliancesList);
	homepage.renderUstensilsList(ustensilsList);
};
