import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Importación de los componentes de la aplicación
import ListaPiezas from './components/ListaPiezas';
import FormularioPieza from './components/FormularioPieza';
import ModalDetalle from './components/ModalDetalle';

export default function App() {

  // Estado principal que almacena todas las piezas registradas
  const [piezas, setPiezas] = useState([]);

  // Controla si se muestra el formulario o la lista principal
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Almacena la pieza seleccionada para mostrar en el modal
  // Cuando es null, el modal está cerrado
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);

  // Agrega una nueva pieza al estado y ordena la lista por fecha de cambio
  const agregarPieza = (nuevaPieza) => {
    const nuevaLista = [...piezas, nuevaPieza].sort(
      (a, b) => new Date(a.fechaCambio) - new Date(b.fechaCambio)
    );
    setPiezas(nuevaLista);
    // Cierra el formulario después de guardar
    setMostrarFormulario(false);
  };

  // Elimina una pieza de la lista según su id
  const eliminarPieza = (id) => {
    setPiezas(piezas.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>

      {/* Muestra el formulario o la lista según el estado mostrarFormulario */}
      {mostrarFormulario ? (
        <FormularioPieza
          onGuardar={agregarPieza}         // Callback para guardar la pieza
          onCancelar={() => setMostrarFormulario(false)} // Callback para cancelar
        />
      ) : (
        <ListaPiezas
          piezas={piezas}                              // Lista de piezas a mostrar
          onAgregar={() => setMostrarFormulario(true)} // Abre el formulario
          onEliminar={eliminarPieza}                   // Elimina una pieza
          onVerDetalle={(pieza) => setPiezaSeleccionada(pieza)} // Abre el modal
        />
      )}

      {/* El modal vive fuera del condicional para poder aparecer sobre cualquier vista */}
      <ModalDetalle
        pieza={piezaSeleccionada}              // Pieza a mostrar en el modal
        onCerrar={() => setPiezaSeleccionada(null)} // Cierra el modal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal con fondo oscuro
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});