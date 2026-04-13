import {
  View, Text, FlatList, TouchableHighlight,
  StyleSheet, Alert, TouchableOpacity
} from 'react-native';

export default function ListaPiezas({ piezas, onAgregar, onEliminar, onVerDetalle }) {

  const confirmarEliminar = (id) => {
    Alert.alert(
      'Eliminar pieza',
      '¿Estás seguro de que deseas eliminar esta pieza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onEliminar(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="#2a2a2a"
      onPress={() => onVerDetalle(item)}
      style={styles.itemWrapper}
    >
      <View style={styles.item}>
        <View style={styles.itemInfo}>
          <Text style={styles.tipo}>{item.tipo}</Text>
          <Text style={styles.fecha}>{item.fechaCambio}</Text>
        </View>
        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => confirmarEliminar(item.id)}
        >
          <Text style={styles.botonEliminarTexto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Piezas</Text>

      <TouchableOpacity style={styles.botonAgregar} onPress={onAgregar}>
        <Text style={styles.botonAgregarTexto}>+ Agregar Pieza</Text>
      </TouchableOpacity>

      {piezas.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.vacio}>No hay piezas registradas</Text>
          <Text style={styles.vacioSub}>Toca "Agregar Pieza" para comenzar</Text>
        </View>
      ) : (
        <FlatList
          data={piezas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 55,
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  botonAgregar: {
    backgroundColor: '#FFD700',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonAgregarTexto: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  vacioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  vacio: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vacioSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 6,
  },
  lista: {
    paddingBottom: 20,
  },
  itemWrapper: {
    borderRadius: 12,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  itemInfo: {
    flex: 1,
  },
  tipo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  fecha: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  botonEliminar: {
    backgroundColor: '#B22222',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botonEliminarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});