import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; 
const TaskItem = ({ task, onDelete, onComplete }) => {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskDetails}>
        
        {task.icon && (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: task?.color }, 
            ]}
          >
            <FontAwesome5 name={task.icon} size={20} color="#fff" />
          </View>
        )}
        
        <Text
          style={[styles.taskText, task.completed && styles.completedTask]}
          numberOfLines={100}
          ellipsizeMode="tail"
        >
          {task.title}
        </Text>
      </View>

      <View style={styles.iconsContainer}>
        
        {!task.completed ? (
          <TouchableOpacity onPress={() => onComplete(task.id)}>
            <FontAwesome5
              name="check-circle"
              size={20}
              color="#4CAF50"
              style={styles.completeButton}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onComplete(task.id)}>
            <FontAwesome5
              name="undo"
              size={20}
              color="#7B61FF"
              style={styles.undoButton}
            />
          </TouchableOpacity>
        )}

        
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <FontAwesome5
            name="trash-alt"
            size={20}
            color="red"
            style={styles.deleteButton}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: -0.02,
    shadowRadius: 4,
    elevation: 5,
  },
  taskDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    gap: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily:"outfit-m",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  completeButton: {
    backgroundColor: "#e5fcf2",
    padding: 10,
    borderRadius: 10,
  },
  undoButton: {
    backgroundColor: "#f0eefc",
    padding: 10,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#fce5e6",
    padding: 10,
    borderRadius: 10,
  },
  deleteText: {
    fontSize: 18,
    color: "#FF6B6B",
    fontWeight: "bold",
  },
});

export default TaskItem;
