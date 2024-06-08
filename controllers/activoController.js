const { Activo, Ubicacion, Responsable, Tag } = require('../models');

const activoController = {
  // Obtener todos los activos
  async getAll(req, res) {
    try {
      const activos = await Activo.findAll({
        include: [
          {
            model: Tag,
            attributes: ['descripcion'], // Solo incluir la descripción de los tags
            through: { attributes: [] } // No incluir atributos de la tabla intermedia
          },
          {
            model: Ubicacion,
            attributes: ['descripcion'], // Incluye otros campos que consideres necesarios
          },
          {
            model: Responsable,
            attributes: ['nombre'] // Incluye otros campos que consideres necesarios
          }
        ]
      });
      console.log(activos);
      res.json(activos);
    } catch (error) {
      console.error('Error al obtener los activos:', error);
      res.status(500).json({ error: 'Error al obtener los activos' });
    }
  },

  // Obtener un activo por su ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const activo = await Activo.findByPk(id);
      if (!activo) {
        return res.status(404).json({ error: 'Activo no encontrado' });
      }
      res.json(activo);
    } catch (error) {
      console.error('Error al obtener el activo:', error);
      res.status(500).json({ error: 'Error al obtener el activo' });
    }
  },

  // Crear un nuevo activo
  async create(req, res) {
    const { numSerie, numInventario, descripcion, ubicacionId, responsableId } = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
      let ubicacionValida = null;
      let responsableValido = null;

      // Verificar si se proporcionó una ubicación válida
      if (ubicacionId) {
        ubicacionValida = await Ubicacion.findByPk(ubicacionId);
        if (!ubicacionValida) {
          return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
      }

      // Verificar si se proporcionó un responsable válido
      if (responsableId) {
        responsableValido = await Responsable.findByPk(responsableId);
        if (!responsableValido) {
          return res.status(404).json({ error: 'Responsable no encontrado' });
        }
      }

      // Crear el activo
      const nuevoActivo = await Activo.create({
        numSerie,
        numInventario,
        descripcion,
        ubicacion: ubicacionId || null,
        responsable: responsableId || null,
        imagen,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      res.status(201).json(nuevoActivo);
    } catch (error) {
      console.error('Error al crear el activo:', error);
      res.status(500).json({ error: 'Error al crear el activo' });
    }
  },

  // Actualizar un activo por su ID
  async update(req, res) {
    const { id } = req.params;
    const { numSerie, numInventario, descripcion, ubicacionId, responsableId } = req.body;
    const imagen = req.file ? req.file.path : null;
    try {
      const activo = await Activo.findByPk(id);
      if (!activo) {
        return res.status(404).json({ error: 'Activo no encontrado' });
      }

      // Verificar si se proporcionó una ubicación válida
      let ubicacionValida = null;
      if (ubicacionId) {
        ubicacionValida = await Ubicacion.findByPk(ubicacionId);
        if (!ubicacionValida) {
          return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
      }

      // Verificar si se proporcionó un responsable válido
      let responsableValido = null;
      if (responsableId) {
        responsableValido = await Responsable.findByPk(responsableId);
        if (!responsableValido) {
          return res.status(404).json({ error: 'Responsable no encontrado' });
        }
      }

      // Actualizar el activo
      await activo.update({
        numSerie,
        numInventario,
        descripcion,
        ubicacion: ubicacionId || null,
        responsable: responsableId || null,
        imagen
      });
      res.json(activo);
    } catch (error) {
      console.error('Error al actualizar el activo:', error);
      res.status(500).json({ error: 'Error al actualizar el activo' });
    }
  },

  // Eliminar un activo por su ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      const activo = await Activo.findByPk(id);
      if (!activo) {
        return res.status(404).json({ error: 'Activo no encontrado' });
      }

      // Eliminar el activo
      await activo.destroy();
      res.json({ mensaje: 'Activo eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el activo:', error);
      res.status(500).json({ error: 'Error al eliminar el activo' });
    }
  }
};

module.exports = activoController;
