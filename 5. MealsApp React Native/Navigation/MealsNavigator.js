import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoriesScreen from '../Screen/CategoriesScreen';
import CategoriesMealsScreen from '../Screen/CategoriesMealsScreen';
import MealDetailScreen from '../Screen/MealsDetailScreen';
import { Platform } from 'react-native';
import Colors from '../Constants/Colors';
import FavoritesScreen from '../Screen/FavoriteScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import FilterScreen from '../Screen/FilterScreen';


const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },

    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
}



const MealsNavigator = createStackNavigator({

    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }
    },
    CategoriesMeals: {
        screen: CategoriesMealsScreen,
    },
    MealDetail: MealDetailScreen,
}, {
    // mode: 'modal',
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions,
});

const FavNavigator = createStackNavigator(
    {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
}, {
    defaultNavigationOptions: defaultStackNavOptions,
})



const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
                )
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: <Text>Favorites</Text>
        }
    },
    Favorites: {
        screen: FavNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
                )
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: <Text>Meals</Text>
        }
    },
}



const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: 'white',
    shifting: true,
    barStyle: {
        backgroundColor: Colors.primaryColor,
    }
}) : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor,

    }
});

const FilterNavigator = createStackNavigator({
 Filters: FilterScreen,
}, {
    navigationOptions: {
        drawerLabel: 'Filters!!'
    },
    defaultNavigationOptions: defaultStackNavOptions,
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals !'
    }},
    Filters : FilterNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
    }
})


export default createAppContainer(MainNavigator);