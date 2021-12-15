// Define TagsList class
class TagsList {
	constructor(tag, type) {
		this._tag = tag;
		this._type = type;
	}

	createTag() {
		if (this._tag !== undefined) {
			const $wrapper = document.createElement("li");
			$wrapper.classList.add(`"tags-${this._type}s"`);

			// Render photographer card
			const tagItem = `
		<button class="dropdown-item btn-tag-${this._type}" type="button" value="${this._tag.toLowerCase()}">${this._tag.charAt(0).toUpperCase() + this._tag.slice(1)}</button>
        `;

			$wrapper.innerHTML = tagItem;
			return $wrapper;
		}
	}
}
