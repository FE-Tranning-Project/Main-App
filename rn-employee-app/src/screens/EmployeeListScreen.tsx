import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchEmployeesRequest, deleteEmployeeRequest } from '../store/reducers/employeeSlice';
import { RootState, AppDispatch } from '../store';
import { EmployeeCard } from 'ui-components';

export const EmployeeListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    // Automatically fetch when the component mounts or when navigating back
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchEmployeesRequest());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const handleDelete = (id: string | number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this employee?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteEmployeeRequest(id)) },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity 
        style={styles.cardContent}
        onPress={() => navigation.navigate('EmployeeForm', { id: item.id })}
      >
        <EmployeeCard employee={item} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && employees.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('EmployeeForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  fabText: {
    color: '#FFF',
    fontSize: 30,
    lineHeight: 32,
  }
});
