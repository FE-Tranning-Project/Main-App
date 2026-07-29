import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/store';
import { EmployeeListScreen } from './src/screens/EmployeeListScreen';
import { EmployeeFormScreen } from './src/screens/EmployeeFormScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EmployeeList">
          <Stack.Screen 
            name="EmployeeList" 
            component={EmployeeListScreen} 
            options={{ title: 'Employees' }}
          />
          <Stack.Screen 
            name="EmployeeForm" 
            component={EmployeeFormScreen} 
            options={{ title: 'Employee Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
