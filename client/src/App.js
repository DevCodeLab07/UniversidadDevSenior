import { useState, useEffect } from 'react';
import './App.css';

function App() {

  // ==========================================================
  // Estados del formulario
  // ==========================================================

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [titulo, setTitulo] = useState("");
  const [areaAcademica, setAreaAcademica] = useState("");
  const [dedicacion, setDedicacion] = useState("");
  const [aniosExperiencia, setAniosExperiencia] = useState(0);

  const [registros, setRegistros] = useState([]);

  // ID del docente que estamos editando
  const [editId, setEditId] = useState(null);


  // ==========================================================
  // Cargar docentes al iniciar
  // ==========================================================

  useEffect(() => {
    cargarDocentes();
  }, []);


  const cargarDocentes = async () => {

    try {

      const response = await fetch(
        'http://localhost:3001/docentes'
      );

      if (!response.ok) {
        throw new Error('No se pudieron cargar los docentes');
      }

      const data = await response.json();

      setRegistros(data);

    } catch (error) {

      console.error(error);

      alert('Error al cargar los docentes :(');
    }
  };


  // ==========================================================
  // Limpiar formulario
  // ==========================================================

  const limpiarFormulario = () => {

    setNombre('');
    setCorreo('');
    setTelefono('');
    setTitulo('');
    setAreaAcademica('');
    setDedicacion('');
    setAniosExperiencia(0);

    setEditId(null);
  };


  // ==========================================================
  // Guardar / Actualizar
  // ==========================================================

  const registrarDatos = async (e) => {

    e.preventDefault();


    const payload = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      titulo: titulo.trim(),
      area_academica: areaAcademica.trim(),
      dedicacion: dedicacion.trim(),
      anios_experiencia: Number(aniosExperiencia)
    };


    try {

      // ======================================================
      // ACTUALIZAR
      // ======================================================

      if (editId !== null) {

        console.log(
          'Actualizando docente con ID:',
          editId
        );

        const response = await fetch(
          `http://localhost:3001/docentes/${editId}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(payload)
          }
        );


        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.error ||
            'Error al actualizar el docente'
          );
        }


        alert(
          'El docente se ha actualizado con éxito ;)'
        );


        await cargarDocentes();

        limpiarFormulario();

        return;
      }


      // ======================================================
      // CREAR
      // ======================================================

      const response = await fetch(
        'http://localhost:3001/docentes',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(payload)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          'Error al guardar el docente'
        );
      }


      alert(
        'Docente guardado correctamente ;)'
      );


      await cargarDocentes();

      limpiarFormulario();


    } catch (error) {

      console.error(error);

      alert(error.message);
    }
  };


  // ==========================================================
  // Editar docente
  // ==========================================================

  const editarRegistro = (docente) => {

    if (!docente) {
      alert(
        'Error: No se encontró el docente.'
      );

      return;
    }


    console.log(
      'Editando docente:',
      docente
    );


    setNombre(docente.nombre || '');
    setCorreo(docente.correo || '');
    setTelefono(docente.telefono || '');
    setTitulo(docente.titulo || '');
    setAreaAcademica(
      docente.area_academica || ''
    );
    setDedicacion(
      docente.dedicacion || ''
    );
    setAniosExperiencia(
      Number(docente.anios_experiencia) || 0
    );


    // Guardamos el ID, NO el índice
    setEditId(docente.id);
  };


  // ==========================================================
  // Eliminar docente
  // ==========================================================

  const eliminarRegistro = async (id) => {

    if (!id) {

      alert(
        'Error: el docente no tiene un ID válido.'
      );

      return;
    }


    const confirmar = window.confirm(
      '¿Está seguro de que desea eliminar este docente?'
    );


    if (!confirmar) {
      return;
    }


    try {

      console.log(
        'Eliminando docente con ID:',
        id
      );


      const response = await fetch(
        `http://localhost:3001/docentes/${id}`,
        {
          method: 'DELETE'
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.error ||
          'Error al eliminar el docente'
        );
      }


      // Eliminarlo de la pantalla
      setRegistros(
        registros.filter(
          (docente) => docente.id !== id
        )
      );


      // Si estábamos editando este docente
      if (editId === id) {
        limpiarFormulario();
      }


      alert(
        'El docente ha sido eliminado ;)'
      );


    } catch (error) {

      console.error(error);

      alert(error.message);
    }
  };


  // ==========================================================
  // INTERFAZ
  // ==========================================================

  return (

    <div className="app-container">

      <div className="header">

        <h1>
          Registro de Docentes
        </h1>

        <p>
          Registro de profesores:
          datos académicos y de contacto
        </p>

      </div>


      {/* ====================================================
          FORMULARIO
      ==================================================== */}

      <div className="form-container">

        <form
          onSubmit={registrarDatos}
          className="form-docentes"
        >

          <div className="form-grid">


            <div className="campo">

              <label htmlFor="nombre">
                Nombre
              </label>

              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
                required
              />

            </div>


            <div className="campo">

              <label htmlFor="correo">
                Correo
              </label>

              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                required
              />

            </div>


            <div className="campo">

              <label htmlFor="telefono">
                Teléfono
              </label>

              <input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) =>
                  setTelefono(e.target.value)
                }
                required
              />

            </div>


            <div className="campo">

              <label htmlFor="titulo">
                Título
              </label>

              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) =>
                  setTitulo(e.target.value)
                }
                required
              />

            </div>


            <div className="campo">

              <label htmlFor="areaAcademica">
                Área académica
              </label>

              <input
                type="text"
                id="areaAcademica"
                value={areaAcademica}
                onChange={(e) =>
                  setAreaAcademica(e.target.value)
                }
                required
              />

            </div>


            <div className="campo">

              <label htmlFor="dedicacion">
                Dedicación
              </label>

              <select
                id="dedicacion"
                value={dedicacion}
                onChange={(e) =>
                  setDedicacion(e.target.value)
                }
                required
              >

                <option value="">
                  Seleccione...
                </option>

                <option value="Tiempo completo">
                  Tiempo completo
                </option>

                <option value="Medio tiempo">
                  Medio tiempo
                </option>

                <option value="Cátedra">
                  Cátedra
                </option>

              </select>

            </div>


            <div className="campo">

              <label htmlFor="aniosExperiencia">
                Años de experiencia
              </label>

              <input
                type="number"
                id="aniosExperiencia"
                min="0"
                value={aniosExperiencia}
                onChange={(e) =>
                  setAniosExperiencia(
                    Number(e.target.value)
                  )
                }
                required
              />

            </div>

          </div>


          {/* ==================================================
              BOTONES DEL FORMULARIO
          ================================================== */}

          <div className="acciones-form">

            <button
              type="submit"
              className="btn-submit"
            >

              {editId !== null
                ? 'Actualizar'
                : 'Guardar'}

            </button>


            {editId !== null && (

              <button
                type="button"
                className="btn-cancel"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>

            )}

          </div>

        </form>

      </div>


      {/* ====================================================
          TABLA
      ==================================================== */}

      <div className="table-wrapper">

        <table className="tabla-docentes">

          <thead>

            <tr>

              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Título</th>
              <th>Área académica</th>
              <th>Dedicación</th>
              <th>Años de experiencia</th>
              <th>Acciones</th>

            </tr>

          </thead>


          <tbody>

            {registros.map((reg) => (

              <tr key={reg.id}>

                <td className="col-nombre">
                  {reg.nombre}
                </td>

                <td>
                  {reg.correo}
                </td>

                <td>
                  {reg.telefono}
                </td>

                <td>
                  {reg.titulo}
                </td>

                <td>
                  {reg.area_academica}
                </td>

                <td>
                  {reg.dedicacion}
                </td>

                <td>
                  {reg.anios_experiencia}
                </td>


                <td className="action-buttons">

                  <button
                    type="button"
                    className="btn-action btn-edit"
                    onClick={() =>
                      editarRegistro(reg)
                    }
                  >
                    Editar
                  </button>


                  <button
                    type="button"
                    className="btn-action btn-delete"
                    onClick={() =>
                      eliminarRegistro(reg.id)
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;