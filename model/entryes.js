class Entryes {
    #provider;
    #total;
    #products;

    constructor(provider, total, products) {
        this.#provider = provider;
        this.#total = total;
        this.#products = Array.isArray(products) ? products : [];
    }

    getProvider() {
        return this.#provider;
    }

    setProvider(provider) {
        this.#provider = provider;
    }

    getTotal() {
        return this.#total;
    }

    setTotal(total) {
        this.#total = total;
    }

    getProducts() {
        return this.#products;
    }

    setProducts(products) {
        if (Array.isArray(products)) {
            this.#products = products;
        } else {
            throw new Error("Products debe ser un arreglo");
        }
    }
}
