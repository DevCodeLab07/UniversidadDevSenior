// Servidor API
// GET obtener - POST crear - PUT actualizar - DELETE eliminar

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// ==========================================================
// RUTA 1: Obtener todos los docentes
// ==========================================================
app.get('/docentes', (req, res) => {

    const sql = 'SELECT * FROM docentes';

    db.query(sql, (err, results) => {

        if (err) {
            console.error('Error al obtener los docentes:', err);

            return res.status(500).json({
                error: 'Error al obtener los docentes ;('
            });
        }

        res.json(results);
    });
});


// ==========================================================
// RUTA 2: Obtener un docente por ID
// ==========================================================
app.get('/docentes/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT * FROM docentes WHERE id = ?';

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.error('Error al obtener el docente:', err);

            return res.status(500).json({
                error: 'Error al obtener el docente ;('
            });
        }

        // Si no existe el docente
        if (results.length === 0) {
            return res.status(404).json({
                error: 'Docente no encontrado ;('
            });
        }

        // Devolver solamente el docente encontrado
        res.json(results[0]);
    });
});


// ==========================================================
// RUTA 3: Crear un docente
// ==========================================================
app.post('/docentes', (req, res) => {

    const {
        nombre,
        correo,
        telefono,
        titulo,
        area_academica,
        dedicacion,
        anios_experiencia
    } = req.body;


    // Validar campos de texto
    if (
        !nombre?.trim() ||
        !correo?.trim() ||
        !telefono?.trim() ||
        !titulo?.trim() ||
        !area_academica?.trim() ||
        !dedicacion?.trim()
    ) {

        return res.status(400).json({
            error: 'Todos los espacios son requeridos'
        });
    }


    // Convertir años de experiencia a número
    const anios = Number(anios_experiencia);

    if (Number.isNaN(anios) || anios < 0) {

        return res.status(400).json({
            error: 'Años del docente inválidos'
        });
    }


    const sql = `
        INSERT INTO docentes
        (
            nombre,
            correo,
            telefono,
            titulo,
            area_academica,
            dedicacion,
            anios_experiencia
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            nombre.trim(),
            correo.trim(),
            telefono.trim(),
            titulo.trim(),
            area_academica.trim(),
            dedicacion.trim(),
            anios
        ],
        (err, result) => {

            if (err) {

                console.error('Error al guardar el docente:', err);

                return res.status(500).json({
                    error: 'Error al guardar el docente ;('
                });
            }


            // Devolver el docente creado
            res.status(201).json({
                id: result.insertId,
                nombre: nombre.trim(),
                correo: correo.trim(),
                telefono: telefono.trim(),
                titulo: titulo.trim(),
                area_academica: area_academica.trim(),
                dedicacion: dedicacion.trim(),
                anios_experiencia: anios
            });
        }
    );
});


// ==========================================================
// RUTA 4: Actualizar un docente
// ==========================================================
app.put('/docentes/:id', (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        correo,
        telefono,
        titulo,
        area_academica,
        dedicacion,
        anios_experiencia
    } = req.body;


    console.log('Actualizando docente ID:', id);
    console.log('Datos recibidos:', req.body);


    // Validar campos de texto
    if (
        !nombre?.trim() ||
        !correo?.trim() ||
        !telefono?.trim() ||
        !titulo?.trim() ||
        !area_academica?.trim() ||
        !dedicacion?.trim()
    ) {

        return res.status(400).json({
            error: 'Todos los espacios son requeridos'
        });
    }


    // Validar años de experiencia
    const anios = Number(anios_experiencia);

    if (Number.isNaN(anios) || anios < 0) {

        return res.status(400).json({
            error: 'Años del docente inválidos'
        });
    }


    const sql = `
        UPDATE docentes
        SET
            nombre = ?,
            correo = ?,
            telefono = ?,
            titulo = ?,
            area_academica = ?,
            dedicacion = ?,
            anios_experiencia = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            nombre.trim(),
            correo.trim(),
            telefono.trim(),
            titulo.trim(),
            area_academica.trim(),
            dedicacion.trim(),
            anios,
            id
        ],
        (err, result) => {

            if (err) {

                console.error('Error al actualizar el docente:', err);

                return res.status(500).json({
                    error: 'Error al actualizar el docente ;('
                });
            }


            // Verificar si realmente existe el docente
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    error: 'Docente no encontrado ;('
                });
            }


            res.json({
                message: 'Docente actualizado con éxito ;)',
                id: Number(id)
            });
        }
    );
});


// ==========================================================
// RUTA 5: Eliminar un docente
// ==========================================================
app.delete('/docentes/:id', (req, res) => {

    const { id } = req.params;

    console.log('Eliminando docente ID:', id);


    // IMPORTANTE:
    // DELETE NO lleva * después de DELETE
    const sql = 'DELETE FROM docentes WHERE id = ?';


    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error('Error al eliminar el docente:', err);

            return res.status(500).json({
                error: 'Error al eliminar el docente ;('
            });
        }


        // Verificar si existe
        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Docente no encontrado ;('
            });
        }


        res.json({
            message: 'Docente eliminado con éxito ;)'
        });
    });
});


// ==========================================================
// INICIAR SERVIDOR
// ==========================================================
app.listen(3001, () => {

    console.log(
        'Servidor backend corriendo desde el puerto 3001 ;)'
    );

});