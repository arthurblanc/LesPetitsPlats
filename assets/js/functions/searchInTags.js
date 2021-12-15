// search In Tags
const searchInTags = (e, array, arrayFiltered, renderList, wrapper) => {
	const search = e.value.toLowerCase();
	arrayFiltered = array;
	arrayFiltered = arrayFiltered.filter((data) => data.toLowerCase().includes(search));
	renderList(arrayFiltered, wrapper);
};
