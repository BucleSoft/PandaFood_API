import Categoria from "../../models/categoria_productos";

export const categoriaExiste = async (nombre = '') => {
    // Verificar si la cédula existe
    const existeCategoria = await Categoria.findOne({ where: { nombre } });
    if (existeCategoria) {
        throw new Error(`La categoría de nombre ${nombre} ya se encuentra registrada.`);
    }
}