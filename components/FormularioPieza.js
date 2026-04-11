import { useState } from 'react';
import {
  View, Text, TextInput,
  Button, StyleSheet, Alert, ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FormularioPieza({ onGuardar, onCancelar }) {

  const [tipo, setTipo] = useState('Bujía');
  const [marca, setMarca] = useState('');
  const [noSerie, setNoSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaCambio, setFechaCambio] = useState('');

  const guardar = () => {
    if (!marca || !noSerie || !precio || !fechaCambio) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    const nuevaPieza = {
      id: Date.now().toString(),
      tipo,
      marca,
      noSerie,
      precio,
      fechaCambio,
    };

    onGuardar(nuevaPieza);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de piezas</Text>

      <Text style={styles.label}>Pieza</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(valor) => setTipo(valor)}
        style={styles.picker}
      >
        <Picker.Item label="Bujía" value="Bujía" />
        <Picker.Item label="Filtro de aceite" value="Filtro de aceite" />
        <Picker.Item label="Filtro de aire" value="Filtro de aire" />
        <Picker.Item label="Frenos" value="Frenos" />
        <Picker.Item label="Batería" value="Batería" />
        <Picker.Item label="Correa de distribución" value="Correa de distribución" />
      </Picker>

      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        placeholder="Ej: Bosch"
      />

      <Text style={styles.label}>No. Serie</Text>
      <TextInput
        style={styles.input}
        value={noSerie}
        onChangeText={setNoSerie}
        placeholder="Ej: S013523"
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Ej: 15.99"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fecha de Cambio</Text>
      <TextInput
        style={styles.input}
        value={fechaCambio}
        onChangeText={setFechaCambio}
        placeholder="YYYY-MM-DD"
      />

      <View style={styles.botones}>
        <Button title="Guardar" onPress={guardar} />
        <Button title="Cancelar" color="gray" onPress={onCancelar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
});