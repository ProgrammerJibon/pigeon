import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useStyles } from "../../Styles";



const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const styles = useStyles();

    const handleLogin = () => {
        navigation.replace("Dashboard");
    };

    return (
        <View style={styles.safeContainer}>
            <View style={styles.centerContent}>
                <Text style={styles.headerText}>Project PIGEON</Text>
                <Text style={styles.subText}>Offline Mesh Network</Text>

                <TextInput
                    style={styles.input}
                    placeholder="User ID or Node ID"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#999"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Connect to Node</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.secondaryButtonText}>Create New Node ID</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default LoginPage;