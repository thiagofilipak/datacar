import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, StatusBar, TextInput } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function Listagem() {
  const navigation = useNavigation();
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState(''); 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      listarVeiculos();
    }
  }, [isFocused]);

  const listarVeiculos = async () => {
    setLoading(true);
    try {
      const response = await api.get('/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.log("Erro ao buscar veículos:", error);
      Alert.alert("Erro", "Falha ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = (id) => {
    Alert.alert(
      "Remover Veículo",
      "Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/veiculos/${id}`);
              setVeiculos(list => list.filter(item => item.id !== id));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          }
        }
      ]
    );
  };

  const veiculosFiltrados = veiculos.filter(item => {
    const termo = busca.toLowerCase();
    return (
      item.modelo.toLowerCase().includes(termo) ||
      item.marca.toLowerCase().includes(termo) ||
      item.placa.toLowerCase().includes(termo)
    );
  });

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={60} color="#ccc" />
      <Text style={styles.emptyText}>
        {busca ? "Nenhum veículo encontrado." : "Sua garagem está vazia."}
      </Text>
      <Text style={styles.emptySubText}>
        {busca ? "Tente buscar por outro termo." : "Cadastre seu primeiro carro!"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f4f8" />
      
      <Text style={styles.headerTitle}>Minha Garagem 🚗</Text>


      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
        <TextInput 
          placeholder="Buscar por placa, modelo ou marca..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
             <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{marginTop: 10, color: '#666'}}>Carregando frota...</Text>
        </View>
      ) : (
        <FlatList
          data={veiculosFiltrados} 
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              
              <TouchableOpacity 
                style={styles.cardContent} 
                onPress={() => navigation.navigate('cadastro', { veiculoParaEditar: item })}
              >
                <View style={styles.iconContainer}>
                   <Ionicons name="car-sport" size={28} color="#007AFF" />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.modelo}>{item.modelo}</Text>
                  <Text style={styles.detalhes}>{item.marca} • {item.cor}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.placa}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleExcluir(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={22} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      
       <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('cadastro', { veiculoParaEditar: null })}
       >
         <Ionicons name="add" size={30} color="#FFF" />
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 70, 
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  modelo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  detalhes: {
    fontSize: 14,
    color: '#8e8e93',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    marginLeft: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});