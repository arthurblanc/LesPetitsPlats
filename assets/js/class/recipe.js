// Define Recipe class
class Recipe {
	constructor(data) {
		this._id = data.id;
		this._name = data.name;
		this._servings = data.servings;
		this._ingredients = data.ingredients;
		this._time = data.time;
		this._description = data.description;
		this._appliance = data.appliance;
		this._ustensils = data.ustensils;
	}
}
