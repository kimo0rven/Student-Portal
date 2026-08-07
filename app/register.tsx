import { StyleSheet, Image, Text, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavBar } from '@/components/nav-bar';
import { useState } from 'react';

const STORAGE_KEY = '@student_registration_data';

export default function StudentRegister() {

    const [fullName, setFullname] = useState('');
    const [studentID, setStudentID] = useState('');
    const [course, setCourse] = useState('');
    const [yearLevel, setYearLevel] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const FORM_FIELDS = [
        { label: 'Full Name', placeholder: 'Enter your full name', val: fullName, setVal: setFullname },
        { label: 'Student ID', placeholder: 'Enter your student id', val: studentID, setVal: setStudentID },
        { label: 'Course', placeholder: 'Enter your course', val: course, setVal: setCourse },
        { label: 'Year Level', placeholder: 'Enter your year level', val: yearLevel, setVal: setYearLevel },
        { label: 'Email', placeholder: 'Enter your email', val: email, setVal: setEmail },
        { label: 'Contact Number', placeholder: 'Enter your contact number', val: contactNumber, setVal: setContactNumber }
      ];
    
    const handleRegister = async () => {

        if(!fullName || !studentID || !course ||!yearLevel || email || contactNumber) {
            Alert.alert('Error', 'Please fill out all fields!');
            console.error('Please fill out all fields!');
        }

        if(!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email!');
            console.error('Please enter a valid email!')
        }

        // Alert.alert('Success', `Information Stored Successfully for ${fullName}`);
        try {
            const studentData = { fullName, studentID,course, yearLevel, email, contactNumber };
            const jsonValue = JSON.stringify(studentData);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            Alert.alert('Saved!', 'Student registration data saved successfully.');
            console.log(jsonValue)
        } catch (e) {
            Alert.alert('Error', 'Failed to save data');
            console.error(e);
        }
    }

    return (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Please fill out the fields below to register your details.</Text>
     
            <View style={styles.form}>
                {FORM_FIELDS.map((field) => (
                  <View key={field.label} style={styles.row}>
                    <Text style={styles.rowLabel}>{field.label}</Text>
                    <TextInput
                      style={styles.field}
                      placeholder={field.placeholder}
                      value={field.val}
                      onChangeText={field.setVal}
                    />
                  </View>
                ))}
            </View>
            <Button onPress={handleRegister} title="Submit" />
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
  