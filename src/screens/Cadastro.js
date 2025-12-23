import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api'; 

export default function Cadastro() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { veiculoParaEditar } = route.params || {};

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (veiculoParaEditar) {
      setEditando(true);
      setPlaca(veiculoParaEditar.placa);
      setMarca(veiculoParaEditar.marca);
      setModelo(veiculoParaEditar.modelo);
      setAno(veiculoParaEditar.ano);
      setCor(veiculoParaEditar.cor);
    } else {
      setEditando(false);
      setPlaca('');
      setMarca('');
      setModelo('');
      setAno('');
      setCor('');
    }
  }, [veiculoParaEditar]); 

  const handleSalvar = async () => {
    if (!placa || !modelo || !marca) {
      Alert.alert("Atenção", "Preencha pelo menos Placa, Marca e Modelo.");
      return;
    }

    try {
      const dadosVeiculo = { placa, marca, modelo, ano, cor };

      if (editando) {
        await api.put(`/veiculos/${veiculoParaEditar.id}`, dadosVeiculo);
        Alert.alert("Sucesso", "Veículo atualizado!");
      } else {
        await api.post('/veiculos', dadosVeiculo);
        Alert.alert("Sucesso", "Veículo cadastrado!");
      }

      navigation.navigate('listagem'); 
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <Text style={styles.titulo}>{editando ? "Editar Veículo" : "Novo Veículo"}</Text>
          <Text style={styles.subtitulo}>{editando ? "Atualize os dados abaixo" : "Preencha os dados do novo carro"}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Placa</Text>
          <TextInput 
            placeholder="ABC-1234" 
            value={placa} 
            onChangeText={setPlaca} 
            style={styles.input} 
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Marca</Text>
            <TextInput placeholder="Ex: Fiat" value={marca} onChangeText={setMarca} style={styles.input} />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Modelo</Text>
            <TextInput placeholder="Ex: Uno" value={modelo} onChangeText={setModelo} style={styles.input} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Ano</Text>
            <TextInput placeholder="2024" value={ano} onChangeText={setAno} keyboardType="numeric" style={styles.input} />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Cor</Text>
            <TextInput placeholder="Prata" value={cor} onChangeText={setCor} style={styles.input} />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>{editando ? "Salvar Alterações" : "Cadastrar Veículo"}</Text>
          <Ionicons name="checkmark-circle-outline" size={24} color="#FFF" style={{marginLeft: 10}} />
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,    paddingTop: 80, backgroundColor: '#f2f4f8' },
  scrollContainer: { padding: 25, justifyContent: 'center' },
  header: { marginBottom: 30, alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitulo: { fontSize: 14, color: '#666', marginTop: 5 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 5, marginLeft: 2 },
  input: { 
    height: 50, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    color: '#333'
  },
  row: { flexDirection: 'row' },
  button: {
    marginTop: 20,
    height: 55,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' }
});