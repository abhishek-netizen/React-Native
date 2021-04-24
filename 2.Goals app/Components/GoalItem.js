import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = props => {
  
    return (
        <TouchableOpacity activeOpacity={0.3}  onPress={props.onDelete.bind(this, props.id)}>
        <View  style={styles.listItem} on>
            <Text >{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    listItem: {
        marginTop:5,
        padding: 10,
        // margin: 5,
        marginVertical:5,
        backgroundColor: '#ccc',
        borderColor: "black",
        borderWidth: 1
      }
});


export default GoalItem;


