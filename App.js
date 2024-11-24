import React from 'react';
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
        // screenOptions={{
        //   headerShown: false,
        // }}
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

export default App;