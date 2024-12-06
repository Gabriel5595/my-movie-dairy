// sprint 4

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './views/HomePage';
import SignInPage from './views/SignInPage';
import SearchPage from './views/SearchPage';
import FavoritePage from './views/FavoritePage';
import ProfilePage from './views/ProfilePage';
import SectionPage from './views/SectionPage';
import MovieDetailPage from './views/MovieDetailPage';
import SignUpPage from './views/SignUpPage';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomePage}
        options={{ title: 'Home Page' }}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignInPage}
        options={{ title: 'Sign In' }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchPage}
        options={{ title: 'Search Movies' }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritePage}
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Favorites' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Profile' }}
      />

      <Drawer.Screen
        name="Category"
        component={SectionPage}
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Section',
        }}
      />
      <Drawer.Screen
        name="Movie Details"
        component={MovieDetailPage}
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Movie Details',
        }}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUpPage}
        options={{
          drawerItemStyle: { display: 'none' },
          title: 'Sign Up',
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
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
