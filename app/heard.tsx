import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import Colors from "@/constants/colors";

export default function HeardScreen() {
  const insets = useSafeAreaInsets();
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(16);

  useEffect(() => {
    textOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) })
    );
    textTranslateY.value = withDelay(
      300,
      withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
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
      <StatusBar style="dark" />
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.message}>Someone heard you.</Text>
        <Text style={styles.submessage}>
          You are not carrying it alone.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warm.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  message: {
    fontFamily: "CormorantGaramond_300Light",
    fontSize: 30,
    color: Colors.warm.text,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 12,
  },
  submessage: {
    fontFamily: "CormorantGaramond_400Regular",
    fontSize: 20,
    color: Colors.warm.textSecondary,
    textAlign: "center",
    lineHeight: 30,
  },
});
