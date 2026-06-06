import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from "react-native";
import Logo from "../../assets/logo.svg";

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // In the real app, this authenticates against the Node X JSON ledger
        navigation.replace("Dashboard");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.safeArea}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <Logo
                            width={80}
                            height={80}
                            fill="#00FF00"
                        />
                        <Text style={styles.headerTitle}>PIGEON</Text>
                        <Text style={styles.headerSubtitle}>SECURE ACCESS PORTAL</Text>
                    </View>

                    {/* Central Terminal / Login Form */}
                    <View style={styles.terminalViewport}>
                        <Text style={styles.consoleLabel}>{"> AUTHENTICATION REQUIRED"}</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>USER_ID :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter User ID or Phone or Email"
                                placeholderTextColor="rgba(74, 144, 226, 0.4)"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>USER_PASS :</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Password"
                                placeholderTextColor="rgba(74, 144, 226, 0.4)"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    {/* Primary Action Controls */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.buttonPrimary]}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.primaryButtonText}>INITIATE LOGIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.buttonSecondary]}
                            onPress={() => navigation.navigate("Register")}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.secondaryButtonText}>GENERATE NEW USER ID</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.buttonGhost]}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.ghostButtonText}>ABORT / RETURN TO SCANNER</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#070B14',
        paddingTop: Platform.OS === 'android' ? 40 : 50,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: 'space-evenly',
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    headerTitle: {
        color: '#00FF00',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 3,
    },
    headerSubtitle: {
        color: '#4A90E2',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 2,
        marginTop: 4,
    },
    terminalViewport: {
        width: '100%',
        backgroundColor: '#0A1128',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#1A2A40',
        elevation: 10,
        shadowColor: '#00FF00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    consoleLabel: {
        color: '#4A90E2',
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        fontWeight: 'bold',
        marginBottom: 25,
        letterSpacing: 1,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#00FF00',
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        marginBottom: 8,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: '#05080F',
        borderWidth: 1,
        borderColor: '#1A2A40',
        borderRadius: 8,
        color: '#00FF00',
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    actionContainer: {
        width: '100%',
        gap: 12, // Modern React Native gap spacing
    },
    actionButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    buttonPrimary: {
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderColor: '#00FF00',
    },
    buttonSecondary: {
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderColor: '#4A90E2',
    },
    buttonGhost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        marginTop: 10,
    },
    primaryButtonText: {
        color: '#00FF00',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    secondaryButtonText: {
        color: '#4A90E2',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    ghostButtonText: {
        color: '#555',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});

export default LoginPage;