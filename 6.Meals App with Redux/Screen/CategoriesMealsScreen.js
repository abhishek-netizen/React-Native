//screen to loads item for choosen categories
import React from 'react';
import {useSelector} from 'react-redux';

import { View, Text,FlatList, StyleSheet,Button } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealItem from '../Components/MealItem';
import MealList from '../Components/MealList';


const CategoriesMealsScreen = props => {
    


    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

     // If selected category matches to it then gives the output
    
    const dispayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    if (dispayedMeals.length === 0) {
        return <View style={styles.content}>
            <Text>No meals found, check your filters</Text>
        </View>
    }


    return (
       <MealList listData={dispayedMeals} navigation = {props.navigation}      />
    );
}

CategoriesMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title,
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})



export default CategoriesMealsScreen;