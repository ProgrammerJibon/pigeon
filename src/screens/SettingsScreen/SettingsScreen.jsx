import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyles } from '../../Styles';

const SettingsScreen = ({ navigation }) => {
    const styles = useStyles();

    return (
        <View style={styles.safeContainer}>
            <View style={styles.centerContent}>
                <Text style={styles.headerText}>Settings</Text>
                <Text style={styles.subText}>Configure Node Parameters</Text>

                {/* Placeholder for actual settings */}
                <Text style={styles.helperText}>LoRa Bandwidth: 125 kHz</Text>
                <Text style={styles.helperText}>Spreading Factor: SF9</Text>

                <TouchableOpacity style={[styles.primaryButton, { marginTop: 30 }]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Save & Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default SettingsScreen;