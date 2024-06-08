const { Responsable, Activo } = require('../models');

const responsableController = {
  // Obtener todos los responsables
  async getAll(req, res) {
    try {
      const responsables = await Responsable.findAll(
        { 
          include: [{model: Activo, attributes: ['id','descripcion']}]
        }
      );
      console.log(responsables);
      res.json(responsables);
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
      res.status(500).json({ error: 'Error al obtener los responsables' });
    }
  },

  // Obtener un responsable por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const responsable = await Responsable.findByPk(id);
      if (!responsable) {
        return res.status(404).json({ error: 'Responsable no encontrado' });
      }
      res.json(responsable);
    } catch (error) {
      console.error('Error al obtener el responsable:', error);
      res.status(500).json({ error: 'Error al obtener el responsable' });
    }
  },

  // Crear un nuevo responsable
  async create(req, res) {
    const { numEmpleado, nombre, } = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
      const nuevoResponsable = await Responsable.create({
        numEmpleado,
        nombre,
        imagen
      });
      res.status(201).json(nuevoResponsable);
    } catch (error) {
      console.error('Error al crear el responsable:', error);
      res.status(500).json({ error: 'Error al crear el responsable' });
    }
  },

  // Actualizar un responsable por su ID
  async update(req, res) {
    const { id } = req.params;
    const { numEmpleado, nombre, } = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
      const responsable = await Responsable.findByPk(id);
      if (!responsable) {
        return res.status(404).json({ error: 'Responsable no encontrado' });
      }
      await responsable.update({
        numEmpleado,
        nombre,
        imagen
      });
      res.json(responsable);
    } catch (error) {
      console.error('Error al actualizar el responsable:', error);
      res.status(500).json({ error: 'Error al actualizar el responsable' });
    }
  },

  // Eliminar un responsable por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const responsable = await Responsable.findByPk(id);
      if (!responsable) {
        return res.status(404).json({ error: 'Responsable no encontrado' });
      }
      await responsable.destroy();
      res.json({ mensaje: 'Responsable eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el responsable:', error);
      res.status(500).json({ error: 'Error al eliminar el responsable' });
    }
  }
};

module.exports = responsableController;
