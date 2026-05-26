import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useStyles } from '../../Styles';


const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const styles = useStyles();

    return (
        <View style={styles.safeContainer}>
            <View style={styles.centerContent}>
                <Text style={styles.headerText}>Register Node</Text>
                <Text style={styles.subText}>Join the PIGEON Network</Text>

                <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor="#999" />
                <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} placeholderTextColor="#999" />
                <TextInput style={styles.input} placeholder="Email (Optional)" keyboardType="email-address" value={email} onChangeText={setEmail} placeholderTextColor="#999" />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#999" />

                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.secondaryButtonText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default RegisterScreen;