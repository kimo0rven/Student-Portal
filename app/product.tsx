import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavBar } from '@/components/nav-bar';
import { useRouter } from 'expo-router';

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data.products || response.data;

      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const STORAGE_KEY = '@product_data';
  const saveProductsToStorage = async (data: string) => {
    try {
      const productData = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, productData);
    } catch (error) {
      console.error(error);
    }
  };
    

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <FlatList
        data={products}
        renderItem={({item}) => 
          <Pressable style={styles.card} onPress={() => {
            saveProductsToStorage(item);
            router.push({
              pathname: '/details'
            });
          }}>
            <Text style={styles.listItem}>{item.id} <Text style={styles.name}>{item.title}</Text></Text>
          </Pressable>}
        keyExtractor={item => item.id.toString()}/>
      </View>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    padding: 24,
    gap: 16,
  },
  name: {
    fontSize: 20,
    color: '#11181C',
  },
  listItem: {
    fontSize: 14,
    color: '#11181C',
  },
  card: {
    backgroundColor: '#f2f6f8',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    gap: 12,
  },
});
