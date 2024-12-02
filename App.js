import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './views/HomePage';
import SignInPage from './views/SignInPage';
import SearchPage from './views/SearchPage';
import FavoritePage from './views/FavoritePage';
import ProfilePage from './views/ProfilePage';
import SectionPage from './views/SectionPage';
import MovieDetailPage from './views/MovieDetailPage';
import SignUpPage from './views/SignUpPage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Sign In" component={SignInPage} />
      <Drawer.Screen name="Search" component={SearchPage} />
      <Drawer.Screen name="My Favorites" component={FavoritePage} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#66FCF1',
          headerTitleStyle: styles.headerTitle,
          contentStyle: { flex: 1, backgroundColor: '#C5C6C7' },
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={SectionPage}
          options={{
            headerShown: true,
            contentStyle: { flex: 1 },
          }}
        />
        <Stack.Screen
          name="Movie Details"
          component={MovieDetailPage}
          options={{
            headerShown: true,
            contentStyle: { flex: 1 },
          }}
        />
        <Stack.Screen
          name='Sign Up'
          component={SignUpPage}
          options={{
            headerShown: true,
            contentStyle: { flex: 1 },
          }}
        />
      </Stack.Navigator>
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
