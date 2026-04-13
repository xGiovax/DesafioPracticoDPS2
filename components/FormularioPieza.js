import { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Alert, ScrollView, TouchableOpacity, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Componente que muestra el formulario para registrar una nueva pieza
// Recibe onGuardar y onCancelar como callbacks desde App.js
export default function FormularioPieza({ onGuardar, onCancelar }) {

  // Estados para cada campo del formulario
  const [tipo, setTipo] = useState('Bujía');      // Tipo de pieza seleccionado en el Picker
  const [marca, setMarca] = useState('');
  const [noSerie, setNoSerie] = useState('');
  const [precio, setPrecio] = useState('');

  // Estado para la fecha seleccionada, inicia con la fecha actual
  const [fecha, setFecha] = useState(new Date());

  // Controla si el DatePicker está visible
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  // Convierte un objeto Date a formato YYYY-MM-DD para almacenar y mostrar
  const formatearFecha = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Maneja el evento cuando el usuario selecciona una fecha en el DatePicker
  const onCambioFecha = (event, selectedDate) => {
    // En iOS el picker se mantiene visible, en Android se cierra automáticamente
    setMostrarDatePicker(Platform.OS === 'ios');
    if (selectedDate) setFecha(selectedDate);
  };

  // Valida que el precio solo acepte números con máximo 2 decimales
  const validarPrecio = (valor) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(valor)) setPrecio(valor);
  };

  // Valida que los campos de texto solo acepten letras, números y espacios
  const validarTexto = (valor, setter) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(valor)) setter(valor);
  };

  // Valida todos los campos y llama a onGuardar si todo está correcto
  const guardar = () => {
    if (!marca.trim()) {
      Alert.alert('Error', 'La marca no puede estar vacía');
      return;
    }
    if (!noSerie.trim()) {
      Alert.alert('Error', 'El número de serie no puede estar vacío');
      return;
    }
    if (!precio.trim() || parseFloat(precio) <= 0) {
      Alert.alert('Error', 'Ingresa un precio válido mayor a 0');
      return;
    }

    // Construye el objeto pieza con todos los datos del formulario
    const nuevaPieza = {
      id: Date.now().toString(), // ID único basado en timestamp
      tipo,
      marca: marca.trim(),
      noSerie: noSerie.trim(),
      precio: precio.trim(),
      fechaCambio: formatearFecha(fecha),
    };

    // Envía la pieza al componente padre (App.js)
    onGuardar(nuevaPieza);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de pieza</Text>

      {/* Picker para seleccionar el tipo de pieza */}
      <Text style={styles.label}>Tipo de Pieza</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={tipo}
          onValueChange={(valor) => setTipo(valor)}
          style={styles.picker}
          dropdownIconColor="#FFD700"
        >
          <Picker.Item label="Bujía" value="Bujía" />
          <Picker.Item label="Filtro de aceite" value="Filtro de aceite" />
          <Picker.Item label="Filtro de aire" value="Filtro de aire" />
          <Picker.Item label="Frenos" value="Frenos" />
          <Picker.Item label="Batería" value="Batería" />
          <Picker.Item label="Correa de distribución" value="Correa de distribución" />
        </Picker>
      </View>

      {/* Campo de texto para la marca, solo acepta letras y números */}
      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={(v) => validarTexto(v, setMarca)}
        placeholder="Ej: Bosch"
        placeholderTextColor="#555"
        maxLength={30}
      />

      {/* Campo de texto para el número de serie */}
      <Text style={styles.label}>No. Serie</Text>
      <TextInput
        style={styles.input}
        value={noSerie}
        onChangeText={(v) => validarTexto(v, setNoSerie)}
        placeholder="Ej: S013523"
        placeholderTextColor="#555"
        maxLength={20}
      />

      {/* Campo numérico para el precio, acepta hasta 2 decimales */}
      <Text style={styles.label}>Precio ($)</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={validarPrecio}
        placeholder="Ej: 15.99"
        placeholderTextColor="#555"
        keyboardType="decimal-pad"
        maxLength={10}
      />

      {/* Botón que abre el DatePicker, muestra la fecha actual seleccionada */}
      <Text style={styles.label}>Fecha de Cambio</Text>
      <TouchableOpacity
        style={styles.fechaBoton}
        onPress={() => setMostrarDatePicker(true)}
      >
        <Text style={styles.fechaTexto}>{formatearFecha(fecha)}</Text>
      </TouchableOpacity>

      {/* DatePicker visible solo cuando mostrarDatePicker es true */}
      {mostrarDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onCambioFecha}
          maximumDate={new Date()} // No permite seleccionar fechas futuras
        />
      )}

      {/* Botón para guardar, ejecuta las validaciones antes de guardar */}
      <TouchableOpacity style={styles.botonGuardar} onPress={guardar}>
        <Text style={styles.botonGuardarTexto}>Guardar</Text>
      </TouchableOpacity>

      {/* Botón para cancelar y volver a la lista sin guardar */}
      <TouchableOpacity style={styles.botonCancelar} onPress={onCancelar}>
        <Text style={styles.botonCancelarTexto}>Cancelar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 55,
    backgroundColor: '#121212',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 15,
  },
  pickerWrapper: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    backgroundColor: '#1E1E1E',
  },
  fechaBoton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    padding: 12,
  },
  fechaTexto: {
    color: '#fff',
    fontSize: 15,
  },
  botonGuardar: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  botonGuardarTexto: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonCancelar: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  botonCancelarTexto: {
    color: '#aaa',
    fontSize: 16,
  },
});