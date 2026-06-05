import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Platform, PermissionsAndroid } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import WifiManager from "react-native-wifi-reborn";
import { NetworkInfo } from "react-native-network-info";

const { width } = Dimensions.get('window');

export default function ConnectScreen({ navigation }) {
    const [result, setResult] = useState("");
    const [showCamera, setShowCamera] = useState(false);
    const [log, setLog] = useState([]);

    // Safely initialized reference for the terminal
    const scrollViewRef = useRef(null);

    const requestLocationPermission = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location to function properly.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Decline",
                    buttonPositive: "Accept"
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    }

    const addLog = (message) => {
        setLog((prevLog) => [...prevLog, message]);
    };

    const handleScan = (event) => {
        if (event?.nativeEvent?.codeStringValue) {
            const scannedData = event.nativeEvent.codeStringValue;
            addLog(`RAW DATA CAPTURED: ${scannedData}`);
            setResult(scannedData);
            setShowCamera(false);
        }
    };

    const checkAPIpAccess = async () => {
        addLog(`RETRIEVING CURRENT IP ADDRESS...`);
        const ipAddress = await NetworkInfo.getGatewayIPAddress();
        addLog(`DEVICE IP ADDRESS ON NEW AP: ${ipAddress}`);
    };

    const tryConnect = async (ssid, password) => {
        try {
            await requestLocationPermission();
            const granted = await requestLocationPermission();
            if (granted) {
                addLog(`LOCATION PERMISSION GRANTED.`);
                addLog(`CHECKING CURRENT AP STATUS...`);
                const currentSSID = await WifiManager.getCurrentWifiSSID();
                if (currentSSID === ssid) {
                    addLog(`ALREADY CONNECTED TO TARGET AP: ${ssid}`);
                    checkAPIpAccess();
                }else{
                    addLog(`ATTEMPTING CONNECTION TO AP ${ssid}...`);
                    try{
                        await WifiManager.connectToProtectedSSID(ssid, password, false, false);
                        try {
                            addLog(`SUCCESSFULLY CONNECTED TO AP: ${ssid}`);
                            checkAPIpAccess();
                        } catch (ipError) {
                            addLog(`ERROR RETRIEVING IP ADDRESS: ${ipError.message}`);
                        }
                    }catch(connectError){
                        addLog(`AP CONNECTION ERROR: ${connectError.message}`);
                    }
                    
                }
            } else {
                addLog(`LOCATION PERMISSION DENIED. CANNOT PROCEED WITH AP CONNECTION.`);
            }
            
            
        } catch (wifiError) {
            addLog(`AP CONNECTION ERROR: ${wifiError.message}`);
        }
    };

    useEffect(() => {
        (async () => {
            if (result) {
                try {
                    const nodeData = JSON.parse(result);
                    try {
                        if (Array.isArray(nodeData) && nodeData.length === 3) {
                            const nodeApSSID = nodeData[0];
                            const nodeApPassword = nodeData[2];

                            addLog(`AP TARGET ACQUIRED: ${nodeApSSID}`);
                            addLog(`INITIATING HANDSHAKE...`);

                            // PIGEON INTEGRATION:
                            tryConnect(nodeApSSID, nodeApPassword);
                        } else {
                            addLog(`ERROR: INVALID ARRAY FORMAT.`);
                        }
                    } catch (innerError) {
                        addLog(`ERROR PARSING NODE DATA: ${innerError.message}`);
                    }
                } catch (error) {
                    addLog(`INVALID QR DATA. EXPECTED ARRAY RESPONSE.`);
                }
            }
        })();
    }, [result]);

    return (
        /* Replaced SafeAreaView with standard View to prevent Height=0 collapse */
        <View style={styles.safeArea}>
            <View style={styles.container}>

                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>PIGEON UPLINK</Text>
                    <Text style={styles.headerSubtitle}>ESP32 LoRa Mesh Interface</Text>
                </View>

                {/* Main Camera / Radar Display */}
                <View style={styles.scannerViewport}>
                    {showCamera ? (
                        <View style={styles.cameraWrapper}>
                            <Camera
                                style={StyleSheet.absoluteFill}
                                cameraType={CameraType.Back}
                                scanBarcode={true}
                                onReadCode={handleScan}
                                hideControls={true}
                            />
                            {/* Tactical Scanning Reticle */}
                            <View style={styles.reticleOverlay}>
                                <View style={styles.targetFrame} />
                                <Text style={styles.scanningText}>AWAITING NODE QR...</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.offlinePlaceholder}>
                            <View style={styles.offlineCircle} />
                            <Text style={styles.offlineText}>SCANNER OFFLINE</Text>
                        </View>
                    )}
                </View>

                {/* Hardware Terminal Output */}
                <View style={styles.consoleContainer}>
                    <Text style={styles.consoleLabel}>NETWORK LOG:</Text>
                    <ScrollView
                        style={styles.consoleOutput}
                        ref={scrollViewRef}
                        /* Added optional chaining (?.) to prevent fatal null reference crash */
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                        nestedScrollEnabled={true}
                    >
                        <Text style={log.length > 0 ? styles.resultTextSuccess : styles.resultTextPending}>
                            {log.length > 0 ? log.map(item => `> ${item}`).join("\n") : "STANDBY..."}
                        </Text>
                    </ScrollView>
                </View>

                {/* Primary Action Controls */}
                <TouchableOpacity
                    style={[styles.actionButton, showCamera ? styles.buttonStop : styles.buttonStart]}
                    onPress={() => {
                        setShowCamera((prev) => !prev);
                        setResult(null);
                        if (!showCamera) {
                            addLog("SCANNER INITIALIZED. AWAITING QR...");
                        } else {
                            addLog("SCANNER TERMINATED BY USER.");
                        }
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>
                        {showCamera ? "TERMINATE SCAN" : "INITIALIZE SCANNER"}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#070B14',
        // Manual safe area padding to replace the buggy SafeAreaView wrapper
        paddingTop: Platform.OS === 'android' ? 40 : 50,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        color: '#00FF00',
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 2,
    },
    headerSubtitle: {
        color: '#4A90E2',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        marginTop: 4,
    },
    scannerViewport: {
        width: '100%',
        height: width * 0.9,
        backgroundColor: '#0A1128',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#1A2A40',
        elevation: 10,
        shadowColor: '#00FF00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    cameraWrapper: {
        flex: 1,
        height: '100%',
    },
    reticleOverlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 20, 40, 0.2)',
    },
    targetFrame: {
        width: width * 0.6,
        height: width * 0.6,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0,255,0,0.05)',
        borderRadius: 16,
    },
    scanningText: {
        color: '#00FF00',
        marginTop: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    offlinePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#333',
        backgroundColor: '#111',
        marginBottom: 16,
    },
    offlineText: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    consoleContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    consoleLabel: {
        color: '#4A90E2',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    consoleOutput: {
        flex: 1,
        backgroundColor: '#05080F',
        borderWidth: 1,
        borderColor: '#1A2A40',
        borderRadius: 8,
        padding: 15,
    },
    resultTextPending: {
        color: '#555',
        fontFamily: 'monospace',
        fontSize: 14,
    },
    resultTextSuccess: {
        color: '#00FF00',
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 20,
    },
    actionButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    buttonStart: {
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderColor: '#00FF00',
    },
    buttonStop: {
        backgroundColor: 'rgba(255, 50, 50, 0.1)',
        borderColor: '#FF3232',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1.5,
    }
});