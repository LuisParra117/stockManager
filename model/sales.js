class Sales {
    #client;
    #note;
    #total;
    #products;

    constructor(client, note, total, products) {
        this.#client = client;
        this.#note = note;
        this.#total = total;
        this.#products = products; // Ya no incluye []
    }

    getClient() {
        return this.#client;
    }

    getNote() {
        return this.#note;
    }

    getTotal() {
        return this.#total;
    }

    getProducts() {
        return this.#products;
    }

    setClient(client) {
        this.#client = client;
    }

    setNote(note) {
        this.#note = note;
    }

    setTotal(total) {
        this.#total = total;
    }

    setProducts(products) {
        if (Array.isArray(products)) {
            this.#products = products;
        } else {
            throw new Error("Products debe ser un arreglo");
        }
    }

}
