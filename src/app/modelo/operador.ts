export class Operador {
  id?: number;
  correo?: string;
  contrasena?: string;

  constructor(
    id?: number,
    correo?: string,
    contrasena?: string
  ) {
    this.id = id;
    this.correo = correo;
    this.contrasena = contrasena;
  }
}