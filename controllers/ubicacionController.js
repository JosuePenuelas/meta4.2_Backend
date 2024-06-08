const { Ubicacion, Activo } = require('../models');
const path = require('path');

const ubicacionController = {
  async getAll(req, res) {
    try {
      const ubicaciones = await Ubicacion.findAll(
        { 
          include: [{model: Activo, attributes: ['id','descripcion']}]
        }
      );
      res.json(ubicaciones);
    } catch (error) {
      console.error('Error al obtener las ubicaciones:', error);
      res.status(500).json({ error: 'Error al obtener las ubicaciones' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const ubicacion = await Ubicacion.findByPk(id);
      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicación no encontrada' });
      }
      res.json(ubicacion);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      res.status(500).json({ error: 'Error al obtener la ubicación' });
    }
  },

  async create(req, res) {
    const { descripcion } = req.body;
    const imagen = req.file ? req.file.path : null; // Ruta de la imagen subida

    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    try {
      const nuevaUbicacion = await Ubicacion.create({
        descripcion,
        imagen
      });
      res.status(201).json(nuevaUbicacion);
    } catch (error) {
      console.error('Error al crear la ubicación:', error);
      res.status(500).json({ error: 'Error al crear la ubicación' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { descripcion } = req.body;
    const imagen = req.file ? req.file.path : null; // Ruta de la imagen subida
    try {
      const ubicacion = await Ubicacion.findByPk(id);
      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicación no encontrada' });
      }
      await ubicacion.update({
        descripcion,
        imagen: imagen || ubicacion.imagen // Mantén la imagen actual si no se sube una nueva
      });
      res.json(ubicacion);
    } catch (error) {
      console.error('Error al actualizar la ubicación:', error);
      res.status(500).json({ error: 'Error al actualizar la ubicación' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const ubicacion = await Ubicacion.findByPk(id);
      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicación no encontrada' });
      }
      await ubicacion.destroy();
      res.json({ mensaje: 'Ubicación eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar la ubicación:', error);
      res.status(500).json({ error: 'Error al eliminar la ubicación' });
    }
  }
};

module.exports = ubicacionController;
