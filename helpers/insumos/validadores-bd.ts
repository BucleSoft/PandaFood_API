import Insumo from "../../models/insumo";

export const insumoExiste = async (identificador: any) => {
    // Verificar si el identificador del insumo
    const existeInsumo = await Insumo.findOne({ where: { identificador } });
    if (existeInsumo) {
        throw new Error(`El insumo identificado con ${identificador} ya se encuentra registrado.`);
    }
}


