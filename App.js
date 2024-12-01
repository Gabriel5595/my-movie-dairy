import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './views/HomePage';
import SignInPage from './views/SignInPage';
import SearchPage from './views/SearchPage';
import FavoritePage from './views/FavoritePage';
import ProfilePage from './views/ProfilePage';

const Drawer = createDrawerNavigator ();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Página Inicial"
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#66FCF1',
          headerTitleStyle: styles.headerTitle,
          drawerStyle: styles.drawer,
          drawerActiveTintColor: '#45A29E',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: styles.drawerLabel,
        }}
      >
        <Drawer.Screen
          name="Página Inicial"
          component={HomePage}
          options={{ drawerLabel: 'Página Inicial' }}
        />
        <Drawer.Screen
          name="Login"
          component={SignInPage}
          options={{ drawerLabel: 'Login' }}
        />
        <Drawer.Screen
          name="Pesquisar"
          component={SearchPage}
          options={{ drawerLabel: 'Pesquisar' }}
        />
        <Drawer.Screen
          name="Meus Favoritos"
          component={FavoritePage}
          options={{ drawerLabel: 'Meus Favoritos' }}
        />
        <Drawer.Screen
          name="Perfil"
          component={ProfilePage}
          options={{ drawerLabel: 'Perfil' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0B0C10',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  drawer: {
    backgroundColor: '#C5C6C7',
    width: 240,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;