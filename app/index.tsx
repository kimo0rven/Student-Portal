import { StyleSheet, Text, View } from 'react-native';

import { NavBar } from '@/components/nav-bar';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the Student Portal</Text>
        <Text style={styles.subtitle}>
          Use the navigation bar below to check your profile, learn about the portal!
        </Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#11181C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#687076',
    lineHeight: 22,
  }
});
