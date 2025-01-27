class provider{
    #provider;
    #nombre;
    #telefono;

    constructor(provider, nombre, telefono){
        this.#provider = provider;
        this.#nombre = nombre;
        this.#telefono = telefono;
    }

    setProvider(provider){
        this.#provider  = provider;
    }

    getProvider(){
        return this.#provider;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    getNombre(){
        return this.#nombre;
    }
    
    setTelefono(telefono){
        this.#telefono = telefono;
    }

    getTelefono(){
        return this.#telefono;
    }
}