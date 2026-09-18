import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';

import { NavBar } from '@/components/nav-bar';
import { db } from '@/services/firebase';

export default function StudentsScreen() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [editingId, setEditingId] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    try {
      const q = query(collection(db, 'students'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const temp = snapshot.docs.map((d) => ({
        id: d.id,
        name: d.data().name,
        course: d.data().course,
        yearLevel: d.data().yearLevel,
        email: d.data().email,
        age: d.data().age,
      }));
      setStudents(temp);
      console.log('loaded students', temp.length);
    } catch (e) {
      console.log('error loading students', e);
      Alert.alert('Error', 'Failed to load student records.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const clearForm = () => {
    setName('');
    setCourse('');
    setYearLevel('');
    setEmail('');
    setAge('');
    setEditingId(null);
  };

  const handleSave = async () => {
    if (name === '' || course === '' || yearLevel === '' || email === '' || age === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (email.indexOf('@') === -1) {
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }

    let isNumber = true;
    for (let i = 0; i < age.length; i++) {
      if (age[i] < '0' || age[i] > '9') {
        isNumber = false;
      }
    }
    if (!isNumber) {
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }

    setSaving(true);

    if (editingId !== null) {
      try {
        await updateDoc(doc(db, 'students', editingId), {
          name: name,
          course: course,
          yearLevel: yearLevel,
          email: email,
          age: age,
        });
        Alert.alert('Success', 'Student record updated successfully.');
        clearForm();
        fetchStudents();
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to save student record.');
      }
      setSaving(false);
    } else {
      try {
        await addDoc(collection(db, 'students'), {
          name: name,
          course: course,
          yearLevel: yearLevel,
          email: email,
          age: age,
          createdAt: Date.now(),
        });
        Alert.alert('Success', 'Student record saved successfully.');
        clearForm();
        fetchStudents();
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Failed to save student record.');
      }
      setSaving(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setCourse(item.course);
    setYearLevel(item.yearLevel);
    setEmail(item.email);
    setAge(item.age);
  };

  const handleDelete = (item: any) => {
    Alert.alert('Delete Record', 'Remove ' + item.name + '\'s record?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'students', item.id));
            if (editingId === item.id) {
              clearForm();
            }
            Alert.alert('Deleted', 'Student record removed.');
            fetchStudents();
          } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Failed to delete student record.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Student Records</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.field}
            placeholder="Student name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.field}
            placeholder="Course/Program"
            value={course}
            onChangeText={(text) => setCourse(text)}
          />
          <TextInput
            style={styles.field}
            placeholder="Year Level"
            value={yearLevel}
            onChangeText={(text) => setYearLevel(text)}
          />
          <TextInput
            style={styles.field}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.field}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
          />

          {saving ? (
            <Button title="Saving..." disabled={true} onPress={() => {}} />
          ) : (
            <Button
              title={editingId ? 'Update Record' : 'Save Record'}
              onPress={handleSave}
            />
          )}

          {editingId ? (
            <Button title="Cancel Edit" color="#687076" onPress={clearForm} />
          ) : null}
        </View>

        <FlatList
          data={students}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No student records yet.</Text>}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <View style={styles.rowInfo}>
                  <Text style={styles.rowName}>Name: {item.name} ({item.email})</Text>
                  <Text style={styles.rowCourse}>Course: {item.course} - {item.yearLevel}</Text>
                  <Text style={styles.rowCourse}>Age {item.age}</Text>
                </View>
                <View style={styles.rowActions}>
                  <Pressable onPress={() => handleEdit(item)}>
                    <Text style={styles.actionText}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => handleDelete(item)}>
                    <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
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
  form: {
    gap: 12,
  },
  field: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    borderColor: '#d0d0d0',
  },
  list: {
    gap: 8,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 6,
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
  rowName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#11181C',
  },
  rowCourse: {
    fontSize: 12,
    color: '#687076',
  },
  rowActions: {
    gap: 8,
    alignItems: 'flex-end',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  deleteText: {
    color: '#d32f2f',
  },
  empty: {
    textAlign: 'center',
    color: '#687076',
    marginTop: 24,
  },
});