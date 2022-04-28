import Cliente from "../../models/cliente";

export const cedulaExiste = async (cedula = 0) => {
    // Verificar si la cédula existe
    const existeCedula = await Cliente.findOne({ where: { cedula } });
    if (existeCedula) {
        throw new Error(`El número de cédula ${cedula} ya se encuentra registrado.`);
    }
}
