import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const OnboardingScreen = () => {

  return (
    <View
      style={styles.container}
    >
      <Image
        source={require("../assets/images/background.jpg")}e
        style={styles.image}
      />
      <Text style={styles.title}>Checkly</Text>
      <Text style={styles.subtitle}>
        Track your tasks and never miss a reminder again.
      </Text>

      
      <Link href="/ToDoList" style={styles.link}>
        Get Started
      </Link>

      <Text style={styles.footerText}>Powered by YourApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7B61FF",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#fff",
  },
  title: {
    fontSize: 52,
    color: "#fff",
    fontFamily: "Merienda-ExtraBold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#eee",
    marginBottom: 30,
    fontFamily: "Merienda-Medium",
    marginHorizontal: 20,
  },
  link: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 30,
    marginBottom: 20,
    textAlign: "center",
    width: "60%",
  },
  footerText: {
    fontSize: 12,
    color: "#aaa",
    position: "absolute",
    bottom: 20,
  },
});

export default OnboardingScreen;
