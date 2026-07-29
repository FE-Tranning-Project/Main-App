import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput, Button, Employee } from 'ui-components';
import { AppDispatch, RootState } from '../store';
import { createEmployeeRequest, updateEmployeeRequest } from '../store/reducers/employeeSlice';

export const EmployeeFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { employees, submitting } = useSelector((state: RootState) => state.employees);

  const editId = route.params?.id;
  const isEditMode = !!editId;

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const emp = employees.find((e) => e.id === editId);
      if (emp) {
        setName(emp.name);
        setPosition(emp.position);
        setDepartment(emp.department || '');
        setAvatar(emp.avatar || '');
      }
    }
  }, [isEditMode, editId, employees]);

  const handleSave = () => {
    if (!name || !position || !department) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const data = {
      name,
      position,
      department,
      avatar: avatar || 'https://i.pravatar.cc/150', // default avatar
    };

    if (isEditMode) {
      dispatch(updateEmployeeRequest({ id: editId, data }));
    } else {
      dispatch(createEmployeeRequest(data));
    }
    
    // In a real app we might wait for the success action before going back,
    // but for simplicity we'll just go back immediately.
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          label="Name"
          placeholder="Enter employee name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          label="Position"
          placeholder="Enter job position (e.g., Software Engineer)"
          value={position}
          onChangeText={setPosition}
        />
        <TextInput
          label="Department"
          placeholder="Enter department (e.g., IT)"
          value={department}
          onChangeText={setDepartment}
        />
        <TextInput
          label="Avatar URL (Optional)"
          placeholder="https://..."
          value={avatar}
          onChangeText={setAvatar}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isEditMode ? "Update Employee" : "Create Employee"}
            onPress={handleSave}
            disabled={submitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 24,
  }
});
