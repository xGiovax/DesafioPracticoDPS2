import {
  View, Text, Modal,
  StyleSheet, TouchableOpacity, Button
} from 'react-native';

// Componente que muestra el detalle completo de una pieza en un modal
// Se activa cuando piezaSeleccionada en App.js tiene un valor distinto de null
export default function ModalDetalle({ pieza, onCerrar }) {

  return (
    // visible es true cuando pieza no es null, false cuando es null
    <Modal
      visible={pieza !== null}
      transparent={true}        // Fondo semitransparente
      animationType="fade"      // Animación de aparición
      onRequestClose={onCerrar} // Maneja el botón físico de retroceso en Android
    >
      {/* Fondo oscuro semitransparente detrás del modal */}
      <View style={styles.fondo}>
        <View style={styles.modal}>

          <Text style={styles.titulo}>Detalle de la pieza</Text>

          {/* Muestra los datos solo si hay una pieza seleccionada */}
          {pieza && (
            <View style={styles.detalles}>

              {/* Cada fila muestra una etiqueta y su valor */}
              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Pieza</Text>
                <Text style={styles.valor}>{pieza.tipo}</Text>
              </View>
              <View style={styles.separador} />

              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Marca</Text>
                <Text style={styles.valor}>{pieza.marca}</Text>
              </View>
              <View style={styles.separador} />

              <View style={styles.fila}>
                <Text style={styles.etiqueta}>No. Serie</Text>
                <Text style={styles.valor}>{pieza.noSerie}</Text>
              </View>
              <View style={styles.separador} />

              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Precio</Text>
                <Text style={styles.valor}>${pieza.precio}</Text>
              </View>
              <View style={styles.separador} />

              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Fecha de Cambio</Text>
                <Text style={styles.valor}>{pieza.fechaCambio}</Text>
              </View>
            </View>
          )}

          {/* Botón nativo de React Native para cerrar el modal */}
          <View style={styles.botonCerrar}>
            <Button
              title="Cerrar"
              color="#FFD700"
              onPress={onCerrar}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 25,
    width: '88%',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  detalles: {
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  separador: {
    height: 1,
    backgroundColor: '#333',
  },
  etiqueta: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  valor: {
    color: '#fff',
    fontSize: 14,
    maxWidth: '60%',
    textAlign: 'right',
  },
  botonCerrar: {
    marginTop: 15,
  },
});