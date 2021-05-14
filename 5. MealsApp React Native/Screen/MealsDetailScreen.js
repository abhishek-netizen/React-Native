//to show details about the meals

import React from 'react';
import { ScrollView,View,Image,Text, StyleSheet,Button } from 'react-native';
import { MEALS } from '../data/dummy-data';
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../Components/HeaderButton';


const ListItem = props => {
    return (
        <View style={styles.ListItem}>
            <Text>{props.children}</Text>
        </View>
    )
}
    
const MealsDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);

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
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: selectedMeal.title,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite" iconName='ios-star' onPress={() => {
                console.log("Mark as Fav!!")
            }}/>
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