//categories of food italian,spanish,indian .. etc

import React from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../Components/CategoryGridTile'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';



const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return <CategoryGridTile title={itemData.item.title}
            color={itemData.item.color}
            onSelect={() => {
                           props.navigation.navigate({
                    routeName: 'CategoriesMeals', params: {
                categoryId:itemData.item.id
            }});
        }}    />
    };

    // console.log(props)
    return (
        <FlatList keyExtractor={(item,index)=> item.id}  data={CATEGORIES} renderItem={renderGridItem}  numColumns={2} />
    );
}

//Sounds a little bit strange 
//This is the thing helps to write title to the screens..


CategoriesScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'Meal Categories',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName='ios-menu' onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
}}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})

export default CategoriesScreen;