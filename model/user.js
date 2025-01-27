class user extends person{
    #usuario;
    #contraseña;

    constructor(nombre, apellidoP, apellidoM, usuario, contraseña){
        super(nombre, apellidoP, apellidoM);
        this.#usuario = usuario;
        this.#contraseña = contraseña;
    }

}