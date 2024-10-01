class Spoiler{
    static spoilerClass = 'spoiler'
    static openedClass = 'opened'
    #spoilerState = false
    #element
    header

    #onHeaderClick = () => {
        this.state = !this.state;
    }

    constructor(element, { state=false, decoration='' }={}) {
        this.#element = element;
        this.header = element.querySelector('h6');
        element.classList.add(this.constructor.spoilerClass);
        if (state)
            this.open();
        if (decoration)
            element.classList.add(decoration);
        this.header.addEventListener('click', this.#onHeaderClick);
    }

    get state() { return this.#spoilerState; }
    set state(val) {
        if (val)
            this.open();
        else
            this.close();
    }

    open() {
        if (!this.#spoilerState) {
            this.#spoilerState = true;
            this.#element.classList.add(this.constructor.openedClass);
        }
    }

    close() {
        if (this.#spoilerState) {
            this.#spoilerState = false;
            this.#element.classList.
                          remove(this.constructor.openedClass);
        }
    }

    static create(...elements) {
        elements.forEach(el => { new this(el); });
    }
}

class Spoiler2 extends Spoiler {
    #toggleHandler

    get state() { return super.state }
    set state(val){
        const oldState = this.state;
        super.state = val;
        if ((this.state != oldState) && (this.#toggleHandler))
            this.#toggleHandler(this);
    }

    toggle(){
        this.state = !this.state
    }

    static create(...elements){
        elements = elements.map(el => {
            if (typeof el == 'string')
                return document.getElementById(el);
            else
                return el;
        });
        super.create(...elements);
    }
}