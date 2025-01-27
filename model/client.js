class client extends person{
    #rfc;
    #telefono

    constructor(nombre, apellidoP, apellidoM, rfc, telefono){
        super(nombre, apellidoP, apellidoM);
        this.#rfc = rfc;
        this.#telefono = telefono;
    }

    setRfc(rfc){
        this.#rfc  = rfc;
    }

    getRfc(){
        return this.#rfc;
    }

    setTelefono(telefono){
        this.#telefono = curp;
    }

    getTelefono(){
        return this.#telefono;
    }

}