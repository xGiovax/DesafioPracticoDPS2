import {
  View, Text, Modal,
  Button, StyleSheet
} from 'react-native';

export default function ModalDetalle({ pieza, onCerrar }) {

  // Si no hay pieza seleccionada, el modal no se muestra
  return (
    <Modal
      visible={pieza !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={onCerrar}
    >
      <View style={styles.fondo}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Detalle de la pieza</Text>

          {pieza && (
            <>
              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Pieza:</Text>
                <Text style={styles.valor}>{pieza.tipo}</Text>
              </View>
              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Marca:</Text>
                <Text style={styles.valor}>{pieza.marca}</Text>
              </View>
              <View style={styles.fila}>
                <Text style={styles.etiqueta}>No Serie:</Text>
                <Text style={styles.valor}>{pieza.noSerie}</Text>
              </View>
              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Precio:</Text>
                <Text style={styles.valor}>${pieza.precio}</Text>
              </View>
              <View style={styles.fila}>
                <Text style={styles.etiqueta}>Fecha de Cambio:</Text>
                <Text style={styles.valor}>{pieza.fechaCambio}</Text>
              </View>
            </>
          )}

          <View style={styles.botonCerrar}>
            <Button title="Cerrar" onPress={onCerrar} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    width: '85%',
  },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  etiqueta: { fontWeight: 'bold', color: '#555' },
  valor: { color: '#000' },
  botonCerrar: { marginTop: 20 },
});