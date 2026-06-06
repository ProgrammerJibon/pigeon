import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import Logo from '../../assets/logo.svg';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        // Handle the PIGEON node registration logic here
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.safeArea}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Logo
                        width={60}
                        height={60}
                        fill="#00FF00"
                        style={{ marginBottom: 12 }}
                    />
                    <Text style={styles.headerTitle}>PIGEON</Text>
                    <Text style={styles.headerSubtitle}>NODE REGISTRATION PROTOCOL</Text>
                </View>

                {/* Central Terminal / Registration Form */}
                <View style={styles.terminalViewport}>
                    <Text style={styles.consoleLabel}>{"> CONFIGURE NEW NODE"}</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>USER_FULL_NAME :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="rgba(74, 144, 226, 0.4)"
                            value={name}
                            onChangeText={setName}
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>USER_MOBILE_PHONE_NUMBER :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="rgba(74, 144, 226, 0.4)"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>USER_EMAIL_ADDRESS :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="rgba(74, 144, 226, 0.4)"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>USER_PASSWORD :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Create Password"
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
                        onPress={handleRegister}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>INITIALIZE REGISTRATION</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.buttonSecondary]}
                        onPress={() => navigation.navigate("Login")}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.secondaryButtonText}>EXIT/RETURN TO LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    headerTitle: {
        color: '#00FF00',
        fontSize: 24,
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
        marginBottom: 20,
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
        gap: 12,
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

export default RegisterScreen;