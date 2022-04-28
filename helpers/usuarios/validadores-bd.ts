import Usuario from "../../models/usuario";

export const cedulaExiste = async (cedula = 0) => {
    // Verificar si la cédula existe
    const existeCedula = await Usuario.findByPk(cedula);
    if (existeCedula) {
        throw new Error(`El número de cédula ${cedula} ya se encuentra registrado.`);
    }
}
