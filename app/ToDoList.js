import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskItem from "./TaskItem";
import { Link } from "expo-router";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  const deleteTask = (taskId) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTasks(tasks.filter((task) => task.id !== taskId)),
      },
    ]);
  };

  const toggleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.date}>
            Today’s Task to Do - {new Date().toLocaleDateString()}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderWidth: 4,
            borderColor: "#fff",
            borderBottomRightRadius: 50,
            fontFamily: "Merienda-ExtraBold",
            borderRadius: 25,
            textAlign: "center",
            shadowColor: "#6A4DFF",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          Checkly
        </Text>
      </View>
      {tasks.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height:500,
          }}
        >
          <Image
            source={require("../assets/images/pad.png")}
            style={{ marginRight: 30, width: 200, height: 220 }}
          />
          <Text style={{ fontSize: 20, fontFamily: "outfit" }}>
            Yet to add task
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={deleteTask}
              onComplete={toggleCompleteTask}
            />
          )}
        />
      )}
      <Link href="/AddTask" style={styles.addTaskLink}>
        <Text style={styles.addTaskText}>+ Add Task</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#7B61FF",
    padding: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 60,
    borderBottomColor: "#fff",
    borderBottomWidth: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  greeting: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  date: {
    color: "#DDD",
    fontSize: 14,
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  addTaskLink: {
    marginTop: 30,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#7B61FF",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  addTaskText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ToDoList;
