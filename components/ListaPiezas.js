import {
  View, Text, FlatList,
  TouchableHighlight, Button,
  StyleSheet, Alert
} from 'react-native';

export default function ListaPiezas({ piezas, onAgregar, onEliminar, onVerDetalle }) {

  const confirmarEliminar = (id) => {
    Alert.alert('Eliminar', '¿Estás seguro?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', onPress: () => onEliminar(id) },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight
      underlayColor="#ddd"
      onPress={() => onVerDetalle(item)}
    >
      <View style={styles.item}>
        <View>
          <Text style={styles.tipo}>{item.tipo}</Text>
          <Text style={styles.fecha}>{item.fechaCambio}</Text>
        </View>
        <Button
          title="Eliminar"
          color="red"
          onPress={() => confirmarEliminar(item.id)}
        />
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Piezas</Text>

      <Button
        title="Agregar Pieza"
        color="#2196F3"
        onPress={onAgregar}
      />

      {piezas.length === 0 ? (
        <Text style={styles.vacio}>No hay piezas. Agregue una</Text>
      ) : (
        <FlatList
          data={piezas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  vacio: { marginTop: 30, textAlign: 'center', color: '#888' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 10,
  },
  tipo: { fontSize: 16, fontWeight: 'bold' },
  fecha: { fontSize: 13, color: '#555' },
});