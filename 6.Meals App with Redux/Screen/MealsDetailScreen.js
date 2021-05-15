//to show details about the meals

import React,{useEffect, useCallback} from 'react';
import { ScrollView,View,Image,Text, StyleSheet,Button } from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../Components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import {toggleFavorite } from '../store/actions/meals';


const ListItem = props => {
    return (
        <View style={styles.ListItem}>
            <Text>{props.children}</Text>
        </View>
    )
}
    
const MealsDetailScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals);
    const currentMealsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
   

    const dispatch = useDispatch();
    
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        // props.navigation.setParams({
        //     mealTitle: selectedMeal.title
        // });
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);
  
    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealsFavorite });
    },[currentMealsFavorite])

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                        <Text>{selectedMeal.duration}m</Text>
                        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredients => <ListItem >{ingredients}</ListItem>)}
            {/* <Text>List of Ingredients..</Text> */}
            <Text>List of steps..</Text>
            {selectedMeal.steps.map(steps => <ListItem >{steps}</ListItem>)}
            </ScrollView>
         
    );
}


MealsDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    
    
    return {
        headerTitle: mealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite" iconName={isFavorite ? 'ios-star' : 'ios-star-outline' } onPress={toggleFavorite}/>
        </HeaderButtons>
    };
 };








const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
    ListItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }
    
})

export default MealsDetailScreen;