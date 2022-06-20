import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

 

  function handleAddTask(newTaskTitle: string) {
    const alert = () =>
    Alert.alert(
      "Task já cadastrada.",
      "Você não pode cadastrar uma task com o mesmo nome.",
    );

    const taskExist = tasks.find(task => task.title === newTaskTitle);
    if(taskExist){
      alert()
      return
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])

  }

  function handleToggleTaskDone(id: number) {

    const originalTasks = tasks.map(task => ({...task}));

    const todoItem = originalTasks.find(item => item.id ===id)
    
    if(todoItem)
      todoItem.done = !todoItem.done

    setTasks(originalTasks)
  }

  function handleRemoveTask(id: number) {

    const alert = () =>
    Alert.alert(
      "Remover task",
      "Tem certeza que você deseja remover essa task?",
      [
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          )),
          style: "default",
        },
        {
          text:"Não",
          style:'cancel'
        }
      ],
      {
        cancelable: true,
      }
    );
    
    alert()
   

    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})