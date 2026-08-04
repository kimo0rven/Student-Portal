import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { NavBar } from '@/components/nav-bar';

const CONTACTS = [
  { label: 'Email', value: 'kimorvensaga.valencia@my.smciligan.edu.ph' },
  { label: 'Phone', value: '+63 (9**) ******' }
];

const FORM_FIELDS = [
  { label: 'Name', placeholder: 'Enter your name' },
  { label: 'Email', placeholder: 'Enter your email' },
  { label: 'Subject', placeholder: 'Enter the subject' },
  { label: 'Message', placeholder: 'Enter your message' },
];

export default function ContactScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Reach out if you need any help with the portal.</Text>

        <View style={styles.card}>
          {CONTACTS.map((item) => (
            <View key={item.label} style={styles.row}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.form}>
            {FORM_FIELDS.map((field) => (
              <View key={field.label} style={styles.row}>
                <Text style={styles.rowLabel}>{field.label}</Text>
                <TextInput
                  style={styles.field}
                  placeholder={field.placeholder}
                />
              </View>
            ))}
        </View>
        <Button title="Submit" />
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
    gap: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  rowValue: {
    fontSize: 14,
    color: '#11181C',
    flexShrink: 1,
    textAlign: 'right',
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
  }
});
