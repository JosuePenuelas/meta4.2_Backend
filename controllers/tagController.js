const { Tag, Activo } = require('../models');

const tagController = {
  // Obtener todos los tags
  async getAll(req, res) {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (error) {
      console.error('Error al obtener los tags:', error);
      res.status(500).json({ error: 'Error al obtener los tags' });
    }
  },

  // Obtener un tag por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag no encontrado' });
      }
      res.json(tag);
    } catch (error) {
      console.error('Error al obtener el tag:', error);
      res.status(500).json({ error: 'Error al obtener el tag' });
    }
  },

  // Crear un nuevo tag
  async create(req, res) {
    const { descripcion } = req.body;
    try {
      const nuevoTag = await Tag.create({
        descripcion
      });
      res.status(201).json(nuevoTag);
    } catch (error) {
      console.error('Error al crear el tag:', error);
      res.status(500).json({ error: 'Error al crear el tag' });
    }
  },

  // Actualizar un tag por su ID
  async update(req, res) {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag no encontrado' });
      }
      await tag.update({
        descripcion
      });
      res.json(tag);
    } catch (error) {
      console.error('Error al actualizar el tag:', error);
      res.status(500).json({ error: 'Error al actualizar el tag' });
    }
  },

  // Eliminar un tag por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ error: 'Tag no encontrado' });
      }

      // Eliminar el tag
      await tag.destroy();
      res.json({ mensaje: 'Tag eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el tag:', error);
      res.status(500).json({ error: 'Error al eliminar el tag' });
    }
  },

  // Asignar un tag a un activo
  async assignTagToActivo(req, res) {
    const { tagId, activoId } = req.body;
    try {
      const tag = await Tag.findByPk(tagId);
      const activo = await Activo.findByPk(activoId);
      if (!tag || !activo) {
        return res.status(404).json({ error: 'Tag o activo no encontrado' });
      }
      await activo.addTag(tag);
      res.json({ mensaje: 'Tag asignado correctamente al activo' });
    } catch (error) {
      console.error('Error al asignar el tag al activo:', error);
      res.status(500).json({ error: 'Error al asignar el tag al activo' });
    }
  },

  // Desasignar un tag de un activo
  async unassignTagFromActivo(req, res) {
    const { tagId, activoId } = req.body;
    try {
      const tag = await Tag.findByPk(tagId);
      const activo = await Activo.findByPk(activoId);
      if (!tag || !activo) {
        return res.status(404).json({ error: 'Tag o activo no encontrado' });
      }
      await activo.removeTag(tag);
      res.json({ mensaje: 'Tag desasignado correctamente del activo' });
    } catch (error) {
      console.error('Error al desasignar el tag del activo:', error);
      res.status(500).json({ error: 'Error al desasignar el tag del activo' });
    }
  }
};

module.exports = tagController;
