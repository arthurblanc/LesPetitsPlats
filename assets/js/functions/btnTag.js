// Function to expand, hide title and disable dropdown button & show and focus searchInput
const btnTagOpen = (btnTag, form, btnTagOpenClass, searchInput) => {
	const btnTitle = btnTag.getElementsByClassName("btn-tag-title");

	btnTitle[0].classList.add("hide");
	form.classList.remove("hide");
	btnTag.classList.add(btnTagOpenClass, "rounded-0", "rounded-top");
	btnTag.setAttribute("disabled", false);

	searchInput.focus();
};
// Function to reduce, show title and enable dropdown button & hide and reset searchInput
const btnTagClose = (btnTag, form, btnTagOpenClass, searchInput, searchArray, searchArrayFiltered, renderListFunction, wrapper) => {
	const btnTitle = btnTag.getElementsByClassName("btn-tag-title");

	btnTitle[0].classList.remove("hide");
	form.classList.add("hide");
	btnTag.classList.remove(btnTagOpenClass, "rounded-0", "rounded-top");
	btnTag.removeAttribute("disabled");

	searchInput.value = "";
	searchInTags(searchInput, searchArray, searchArrayFiltered, renderListFunction, wrapper);
};
