import { StyleSheet, Text, View } from 'react-native';

import { NavBar } from '@/components/nav-bar';

export default function AboutScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.paragraph}>
          This is a student portal.
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
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#11181C',
  },
  paragraph: {
    fontSize: 15,
    color: '#687076',
    lineHeight: 22,
  },
  list: {
    gap: 8,
    marginTop: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#11181C',
  },
});
