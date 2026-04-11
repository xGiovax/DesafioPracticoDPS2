import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ListaPiezas from './components/ListaPiezas';
import FormularioPieza from './components/FormularioPieza';
import ModalDetalle from './components/ModalDetalle';

export default function App() {

  const [piezas, setPiezas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);

  const agregarPieza = (nuevaPieza) => {
    const nuevaLista = [...piezas, nuevaPieza].sort(
      (a, b) => new Date(a.fechaCambio) - new Date(b.fechaCambio)
    );
    setPiezas(nuevaLista);
    setMostrarFormulario(false);
  };

  const eliminarPieza = (id) => {
    setPiezas(piezas.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>
      {mostrarFormulario ? (
        <FormularioPieza
          onGuardar={agregarPieza}
          onCancelar={() => setMostrarFormulario(false)}
        />
      ) : (
        <ListaPiezas
          piezas={piezas}
          onAgregar={() => setMostrarFormulario(true)}
          onEliminar={eliminarPieza}
          onVerDetalle={(pieza) => setPiezaSeleccionada(pieza)}
        />
      )}

      <ModalDetalle
        pieza={piezaSeleccionada}
        onCerrar={() => setPiezaSeleccionada(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});