import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {StyleSheet, Button, View, FlatList } from 'react-native';
import GoalItem from './Components/GoalItem';
import GoalInput from './Components/GoalInput';

export default function App() {

  const [courseGoal, setcourseGoal] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setcourseGoal(currentGoals => [...currentGoals, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  }

  // console.log(courseGoal)

  const removeGoalHandler = (goalId) => {
    setcourseGoal(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }


  const handleModal = () => {
    setIsAddMode(true)
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false)
  }
  

  return (
    <View style={styles.screen}>
      <Button title="add your today's goal" onPress={handleModal}/>
      
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler}  onCancel={cancelGoalAdditionHandler} />

      <FlatList data={courseGoal}
        // keyExtractor={(item,index) => item.value}
        renderItem={itemData => <GoalItem  id={itemData.item.id}  onDelete={removeGoalHandler} title={itemData.item.value} />}
      />
    </View>
  );
}




//styling

const styles = StyleSheet.create({
  screen: {
    padding: 40,
  },

});
