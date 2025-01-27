class person{
    #nombre;
    #apellidoP;
    #apellidoM;

    constructor(nombre, apellidoP, apellidoM){
        this.#nombre = nombre;
        this.#apellidoP = apellidoP;
        this.#apellidoM = apellidoM;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    getNombre() {
        return this.#nombre;
    }

    setApellidoP(apellidoP){
        this.#apellidoP = apellidoP;
    }

    getApellidoP() {
        return this.#apellidoP;
    }

    setApellidoM(apellidoM){
        this.#apellidoM = apellidoM;
    }

    getApellidoM(){
        return this.#apellidoM;
    }
}

