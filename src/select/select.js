const getTemplate = (data = [], placeholder = 'Default placeholder', selectedId) => {
    let defaultSelectedText;

    const items = data.map(item => {
        if (selectedId === item.id) {
            defaultSelectedText = item.value;
        }

        return `
            <li class="select-item ${selectedId === item.id ? 'selected' : ''}" data-type="item" data-id="${item.id}" data-value="${item.value}">${item.value}</li>
        `;
    });

    return `
        <div class="select-backdrop" data-type="backdrop"></div>
        <div class="select-input" data-type="input">
            <span data-type="value">${defaultSelectedText ? defaultSelectedText : placeholder}</span> 
            <i class="fas fa-chevron-down" data-type="arrow"></i>
        </div>
        <div class="select-dropdown">
            <ul class="select-list">
                ${items.join('')}
            </ul>
        </div>
    `;
};

export class Select {
    constructor(selector, options) {
        this.element = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.selectedItem = null;

        this.#render();
        this.#setup();
    }

    #render() {
        const {data, placeholder, selectedId} = this.options;
        this.element.classList.add('select');
        this.element.innerHTML = getTemplate(data, placeholder, this.selectedId);
        if (selectedId) {
            this.selectedItem = document.querySelector(`[data-id="${selectedId}"]`);
        }
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.element.addEventListener('click', this.clickHandler);

        this.arrow = this.element.querySelector('[data-type="arrow"]');
        this.value = this.element.querySelector('[data-type="value"]');
    }

    clickHandler(event) {
        const {type} = event.target.dataset; 
        
        if (type === 'input' || type === 'backdrop' 
        || type === 'arrow' || type === 'value') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.id;
            this.select(id);
        }
    }

    get isOpen() {
        return this.element.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    select(id) {
        this.selectedId = id;
        this.value.textContent = this.current.value;

        this.element.querySelectorAll('[data-type="item"]').forEach(item => {
            item.classList.remove('selected');
        });
        this.element.querySelector(`[data-id="${id}"]`).classList.add('selected');

        this.selectedItem = document.querySelector(`[data-id="${id}"]`);

        this.options.onSelect ? this.options.onSelect(this.selectedItem): null;

        this.close();
    }

    open() {
        this.element.classList.add('open');
        this.arrow.classList.remove('fa-chevron-down');
        this.arrow.classList.add('fa-chevron-up');
    }

    close() {
        this.element.classList.remove('open');
        this.arrow.classList.remove('fa-chevron-up');
        this.arrow.classList.add('fa-chevron-down');
    }

    destroy() {
        this.element.remove();
        this.element.removeEventListener('click', this.clickHandler);
    }
}