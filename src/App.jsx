import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, StatusBar } from "react-native";
import PagerView from "react-native-pager-view";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import DashboardPage from "./screens/DashboardPage/DashboardPage";
import SettingsScreen from "./screens/SettingsScreen/SettingsScreen";


import { useStyles } from "./Styles";
import ConnectScreen from "./screens/ConnectScreen/ConnectScreen";








const Stack = createNativeStackNavigator();

export default function App() {
    const styles = useStyles();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Connect" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Connect" component={ConnectScreen} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Dashboard" component={DashboardPage} />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        headerShown: true,
                        headerTitle: "PIGEON Settings",
                        headerBackTitle: "Back" 
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
