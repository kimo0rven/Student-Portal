import { StyleSheet, Image, Text, View } from 'react-native';
import { NavBar } from '@/components/nav-bar';

const STUDENT = {
  name: 'Kim Valencia',
  id: 'C23-0520',
  major: 'Information Technology',
  year: '4th Year',
  email: 'kimorvensaga.valencia@my.smciligan.edu.ph',
};

const images = {
    avatar: require('../assets/images/avatar1.jpg'),
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Image style={styles.avatarImage} resizeMode="cover" source={images.avatar}/>
        <Text style={styles.name}>{STUDENT.name}</Text>
        <Text style={styles.subtitle}>{STUDENT.major}</Text>

        <View style={styles.card}>
          <ProfileRow label="Student ID" value={STUDENT.id} />
          <ProfileRow label="Year" value={STUDENT.year} />
          <ProfileRow label="Email" value={STUDENT.email} />
        </View>
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
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#11181C',
  },
  subtitle: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#f2f6f8',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  rowValue: {
    fontSize: 14,
    color: '#11181C',
  }
});
