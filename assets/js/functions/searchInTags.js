// search In Tags
const searchInTags = (e, array, arrayFiltered, renderListFunction, wrapper) => {
	const search = e.value.toLowerCase();
	arrayFiltered = array;
	arrayFiltered = arrayFiltered.filter((data) => data.toLowerCase().includes(search));
	renderListFunction(arrayFiltered, wrapper);
};
