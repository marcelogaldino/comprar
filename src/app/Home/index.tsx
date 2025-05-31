import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useEffect, useState } from 'react';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];
const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: 'Leite' },
  { id: '2', status: FilterStatus.PENDING, description: 'Pão' },
  { id: '3', status: FilterStatus.DONE, description: 'Ovos' },
  { id: '4', status: FilterStatus.PENDING, description: 'Arroz' },
  { id: '5', status: FilterStatus.DONE, description: 'Feijão' },
  { id: '6', status: FilterStatus.PENDING, description: 'Macarrão' },
  { id: '7', status: FilterStatus.DONE, description: 'Café' },
  { id: '8', status: FilterStatus.PENDING, description: 'Açúcar' },
  { id: '9', status: FilterStatus.DONE, description: 'Sal' },
  { id: '10', status: FilterStatus.PENDING, description: 'Óleo' },
  { id: '11', status: FilterStatus.DONE, description: 'Manteiga' },
  { id: '12', status: FilterStatus.PENDING, description: 'Queijo' },
  { id: '13', status: FilterStatus.DONE, description: 'Presunto' },
  { id: '14', status: FilterStatus.PENDING, description: 'Iogurte' },
  { id: '15', status: FilterStatus.DONE, description: 'Banana' },
  { id: '16', status: FilterStatus.PENDING, description: 'Maçã' },
  { id: '17', status: FilterStatus.DONE, description: 'Laranja' },
  { id: '18', status: FilterStatus.PENDING, description: 'Tomate' },
  { id: '19', status: FilterStatus.DONE, description: 'Cebola' },
  { id: '20', status: FilterStatus.PENDING, description: 'Alho' },
  { id: '21', status: FilterStatus.DONE, description: 'Batata' },
  { id: '22', status: FilterStatus.PENDING, description: 'Cenoura' },
  { id: '23', status: FilterStatus.DONE, description: 'Papel Higiênico' },
  { id: '24', status: FilterStatus.PENDING, description: 'Sabonete' },
  { id: '25', status: FilterStatus.DONE, description: 'Shampoo' },
  { id: '26', status: FilterStatus.PENDING, description: 'Condicionador' },
  { id: '27', status: FilterStatus.DONE, description: 'Detergente' },
  { id: '28', status: FilterStatus.PENDING, description: 'Sabão em Pó' },
  { id: '29', status: FilterStatus.DONE, description: 'Amaciante' },
  { id: '30', status: FilterStatus.PENDING, description: 'Água Sanitária' },
  { id: '31', status: FilterStatus.DONE, description: 'Desodorante' },
  { id: '32', status: FilterStatus.PENDING, description: 'Pasta de Dente' },
  { id: '33', status: FilterStatus.DONE, description: 'Papel Toalha' },
  { id: '34', status: FilterStatus.PENDING, description: 'Guardanapo' },
  { id: '35', status: FilterStatus.DONE, description: 'Saco de Lixo' },
  { id: '36', status: FilterStatus.PENDING, description: 'Pimenta' },
  { id: '37', status: FilterStatus.DONE, description: 'Maionese' },
  { id: '38', status: FilterStatus.PENDING, description: 'Ketchup' },
  { id: '39', status: FilterStatus.DONE, description: 'Mostarda' },
  { id: '40', status: FilterStatus.PENDING, description: 'Biscoito' },
  { id: '41', status: FilterStatus.DONE, description: 'Chocolate' },
  { id: '42', status: FilterStatus.PENDING, description: 'Refrigerante' },
  { id: '43', status: FilterStatus.DONE, description: 'Suco' },
  { id: '44', status: FilterStatus.PENDING, description: 'Cerveja' },
  { id: '45', status: FilterStatus.DONE, description: 'Vinho' },
  { id: '46', status: FilterStatus.PENDING, description: 'Carne' },
  { id: '47', status: FilterStatus.DONE, description: 'Frango' },
  { id: '48', status: FilterStatus.PENDING, description: 'Peixe' },
  { id: '49', status: FilterStatus.DONE, description: 'Margarina' },
  { id: '50', status: FilterStatus.PENDING, description: 'Molho de Tomate' }]

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAdd() {
    if(!description.trim()) {
      return Alert.alert('Atenção', 'Informe a descrição do item.');
    }

    const newItem = {
      id: String(new Date().getTime()),
      status: FilterStatus.PENDING,
      description,
    };

    await itemsStorage.add(newItem);
    await getItemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING)
    setDescription('')
  }

  async function getItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await getItemsByStatus()
    } catch (error) {
      Alert.alert("Remover", "Não foi possível remover.")
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos ?", [
      {text: "Não", style: 'cancel'},
      {text: "Sim", onPress: () => onClear()}
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover todos os itens.")
    }
  }

  async function handleToogleItemStatus(id: string) {
    try {
      await itemsStorage.toogleStatus(id)
      await getItemsByStatus()
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  useEffect(() => {
    getItemsByStatus()
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input  
          placeholder='O que você precisa comprar ?'
          onChangeText={setDescription}
          value={description}
          />

        <Button title='Adicionar' onPress={handleAdd}/>
      </View>

      <View style={styles.content}>

        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status} 
              status={status}
              isActive={filter === status} 
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}  
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item}
              onChangeStatus={() => handleToogleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (<Text style={styles.emptyList}>Nenhum item aqui.</Text>)}
        />
        
      </View>
    </View>
  );
}
