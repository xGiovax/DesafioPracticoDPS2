import {
  View, Text, Modal,
  StyleSheet, TouchableOpacity, Button
} from 'react-native';

export default function ModalDetalle({ pieza, onCerrar }) {

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
            <View style={styles.detalles}>
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
    backgroundColor: '#FFD700',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  botonCerrarTexto: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 15,
  },
});