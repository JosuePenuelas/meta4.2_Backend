const { Activo, Tag, ActivoTags } = require('../models');

const activoTagsController = {

    // Obtener la tabla de relación entre activos y tags
    async getAll(req, res) {
        try {
            const activoTags = await ActivoTags.findAll();
            res.json(activoTags);
        } catch (error) {
            console.error('Error al obtener los activos:', error);
            res.status(500).json({ error: 'Error al obtener los activos' });
        }
    },

    // Asignar un tag a un activo
    async assignTagToActivo(req, res) {
        const { activoId, tagId } = req.body;
        try {
            // Verificar si el activo y el tag existen
            const activo = await Activo.findByPk(activoId);
            const tag = await Tag.findByPk(tagId);
            if (!activo || !tag) {
                return res.status(404).json({ error: 'Activo o tag no encontrado' });
            }

            // Verificar si la relación ya existe
            const existeRelacion = await ActivoTags.findOne({
                where: {
                    activoId,
                    tagId
                }
            });
            if (existeRelacion) {
                return res.status(400).json({ error: 'La relación entre el activo y el tag ya existe' });
            }

            // Crear la relación entre el activo y el tag
            await activo.addTag(tag);

            res.json({ mensaje: 'Tag asignado correctamente al activo' });
        } catch (error) {
            console.error('Error al asignar el tag al activo:', error);
            res.status(500).json({ error: 'Error al asignar el tag al activo' });
        }
    },

    // Desasignar un tag de un activo
    async unassignTagFromActivo(req, res) {
        const { activoId, tagId } = req.body;
        try {
            // Verificar si el activo y el tag existen
            const activo = await Activo.findByPk(activoId);
            const tag = await Tag.findByPk(tagId);
            if (!activo || !tag) {
                return res.status(404).json({ error: 'Activo o tag no encontrado' });
            }

            // Verificar si la relación existe
            const existeRelacion = await ActivoTags.findOne({
                where: {
                    activoId,
                    tagId
                }
            });
            if (!existeRelacion) {
                return res.status(400).json({ error: 'La relación entre el activo y el tag no existe' });
            }

            // Eliminar la relación entre el activo y el tag
            await activo.removeTag(tag);

            res.json({ mensaje: 'Tag desasignado correctamente del activo' });
        } catch (error) {
            console.error('Error al desasignar el tag del activo:', error);
            res.status(500).json({ error: 'Error al desasignar el tag del activo' });
        }
    }
};

module.exports = activoTagsController;
