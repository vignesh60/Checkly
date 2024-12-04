import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const animationValue = useState(new Animated.Value(1))[0];
  const router = useRouter();

  const icons = [
    { name: "tasks", color: "#FF6B6B" },
    { name: "shopping-cart", color: "#4CAF50" },
    { name: "book", color: "#3F51B5" },
    { name: "bell", color: "#FFC107" },
    { name: "briefcase", color: "#FF6B6B" },
    { name: "dumbbell", color: "#009688" },
    { name: "music", color: "#FFC107" },
    { name: "car", color: "#0076fc" },
    { name: "utensils", color: "#fc5800" },
    { name: "film", color: "#fc0047" },
    { name: "heart", color: "#FF4081" },
    { name: "home", color: "#8BC34A" },
    { name: "star", color: "#FFD700" },
    { name: "cloud", color: "#00BCD4" },
    { name: "sun", color: "#FFEB3B" },
    { name: "moon", color: "#fc0000" },
    { name: "camera", color: "#673AB7" },
    { name: "wifi", color: "#03A9F4" },
    { name: "lock", color: "#673AB7" },
  ];

  const handleSaveTask = async () => {
    if (!task.trim()) {
      Alert.alert("Validation Error", "Task name cannot be empty.");
      return;
    }

    if (!selectedIcon) {
      Alert.alert("Validation Error", "Please select an icon.");
      return;
    }

    const storedTasks = await AsyncStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    if (tasks.some((t) => t.title === task.trim())) {
      Alert.alert("Duplicate Task", "This task already exists.");
      return;
    }

    const newTask = { id: Date.now(), title: task.trim(), icon: selectedIcon , color: selectedColor};
    tasks.push(newTask);

    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    Alert.alert("Success", "Task saved successfully!");
    setTask("");
    setSelectedIcon(null);
    router.push("/ToDoList");
  };

  const animateSelection = () => {
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleIconPress = (iconName, iconColor) => {
    setSelectedIcon(iconName);
    setSelectedColor(iconColor);
    animateSelection();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Add a New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your task"
        value={task}
        onChangeText={setTask}
        placeholderTextColor="#aaa"
      />
      <FlatList
        data={icons}
        numColumns={3}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleIconPress(item.name, item.color)}
            style={[
              styles.iconContainer,
              { backgroundColor: item.color },
              selectedIcon === item.name && styles.selectedIcon,
            ]}
          >
            <Animated.View
              style={{
                transform: [
                  { scale: selectedIcon === item.name ? animationValue : 1 },
                ],
              }}
            >
              <FontAwesome5 name={item.name} size={20} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 10,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSaveTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    padding: 10,
  },
  inputSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    margin: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  selectedIcon: {
    borderWidth: 2,
    borderColor: "#000",
  },
  addButton: {
    backgroundColor: "#7B61FF",
    marginTop: 30,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddTask;
