import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Colors from "@/constants/colors";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const [thought, setThought] = useState("");
  const inputOpacity = useSharedValue(0);
  const inputTranslateY = useSharedValue(20);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.quad),
      });
      inputTranslateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.quad),
      });
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const animatedInputStyle = useAnimatedStyle(() => ({
    opacity: inputOpacity.value,
    transform: [{ translateY: inputTranslateY.value }],
  }));

  const webTopInset = Platform.OS === "web" ? 67 : 0;
  const webBottomInset = Platform.OS === "web" ? 34 : 0;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + webTopInset,
          paddingBottom: insets.bottom + webBottomInset,
        },
      ]}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Whisper</Text>

          <Animated.View style={[styles.inputArea, animatedInputStyle]}>
            <TextInput
              style={styles.input}
              placeholder="Release your thoughts..."
              placeholderTextColor={Colors.dark.textSecondary}
              value={thought}
              onChangeText={setThought}
              multiline
              textAlignVertical="top"
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push("/heard")}
            >
              <Text style={styles.buttonText}>Someone Listened</Text>
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: "CormorantGaramond_300Light",
    fontSize: 34,
    color: Colors.dark.text,
    textAlign: "center",
    marginBottom: 48,
    letterSpacing: 1,
  },
  inputArea: {
    width: "100%",
    alignItems: "center",
    gap: 24,
  },
  input: {
    width: "100%",
    minHeight: 120,
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark.inputBorder,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 16,
    fontFamily: "CormorantGaramond_400Regular",
    color: Colors.dark.text,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.dark.buttonBackground,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 18,
    color: Colors.dark.buttonText,
    letterSpacing: 0.5,
  },
});
