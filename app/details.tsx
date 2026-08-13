import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavBar } from '@/components/nav-bar';

export default function ProductDetailsScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [weight, setWeight] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState('');
  const [shippingInfo, setShippingInfo] = useState('');
  const [availability, setAvailability] = useState('');
  const [reviews, setReviews] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('');
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState('');
  const [imagesUrl, setImagesUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');


  const STORAGE_KEY = '@product_data';

  useEffect(() => {
    loadProductData();
  }, []);

  const loadProductData = async () => {
    try {
      const productData = await AsyncStorage.getItem(STORAGE_KEY);
      if (productData) {
        const data = JSON.parse(productData);
        setTitle(data.title || '');
        setDescription(data.description || '');
        setCategory(data.category || '');
        setPrice(data.price ? data.price.toString() : '');
        setDiscountPercentage(data.discountPercentage ? data.discountPercentage.toString() : '');
        setRating(data.rating ? data.rating.toString() : '');
        setStock(data.stock ? data.stock.toString() : '');
        setBrand(data.brand || '');
        setSku(data.sku || '');
        setWeight(data.weight || '');
        setWarrantyInfo(data.warrantyInformation || '');
        setShippingInfo(data.shippingInformation || '');
        setAvailability(data.availabilityStatus || '');
        setReviews(data.reviews || '');
        setReturnPolicy(data.returnPolicy || '');
        setMinimumOrderQuantity(data.minimumOrderQuantity ? data.minimumOrderQuantity.toString() : '');
        setImagesUrl(data.images || '');
        setThumbnailUrl(data.thumbnail || '');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {thumbnailUrl ? (
              <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
            ) : null}
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>

          <View style={styles.card}>
            <View style={styles.row}><Text style={styles.rowLabel}>Category</Text><Text style={styles.rowValue}>{category}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Price</Text><Text style={styles.rowValue}>PHP {price}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Discount</Text><Text style={styles.rowValue}>{discountPercentage}%</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Rating</Text><Text style={styles.rowValue}>{rating}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Stock</Text><Text style={styles.rowValue}>{stock}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Brand</Text><Text style={styles.rowValue}>{brand}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>SKU</Text><Text style={styles.rowValue}>{sku}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Weight</Text><Text style={styles.rowValue}>{weight}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Warranty</Text><Text style={styles.rowValue}>{warrantyInfo}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Shipping</Text><Text style={styles.rowValue}>{shippingInfo}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Availability</Text><Text style={styles.rowValue}>{availability}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Return Policy</Text><Text style={styles.rowValue}>{returnPolicy}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Min Order</Text><Text style={styles.rowValue}>{minimumOrderQuantity}</Text></View>
          </View>

          {imagesUrl && Array.isArray(imagesUrl) ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Images</Text>
              {imagesUrl.map((image: string, index: number) => (
                <Image key={`${image}-${index}`} source={{ uri: image }} style={styles.galleryImage} />
              ))}
            </View>
          ) : null}

          {reviews ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {Array.isArray(reviews) ? reviews.map((review: any, index: number) => (
                <View key={`${review.reviewerName}-${index}`} style={styles.reviewItem}>
                  <Text style={styles.reviewName}>{review.reviewerName}</Text>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                  <Text style={styles.reviewMeta}>Rating: {review.rating}/5</Text>
                </View>
              )) : <Text style={styles.rowValue}>{String(reviews)}</Text>}
            </View>
          ) : null}


        </View>
      </ScrollView>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 80,
  },
  content: {
    gap: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#11181C',
  },
  subtitle: {
    fontSize: 15,
    color: '#687076',
  },
  card: {
    backgroundColor: '#f2f6f8',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
    flexShrink: 1,
  },
  rowValue: {
    fontSize: 14,
    color: '#11181C',
    flexShrink: 1,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#11181C',
    marginBottom: 12,
  },
  reviewItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reviewName: {
    fontWeight: '700',
    color: '#11181C',
    marginBottom: 4,
  },
  reviewText: {
    color: '#374151',
    marginBottom: 4,
  },
  reviewMeta: {
    color: '#687076',
    fontSize: 12,
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }, 
  field: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    borderColor: '#d0d0d0',
  },
});
