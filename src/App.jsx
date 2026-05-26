import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, StatusBar } from "react-native";
import PagerView from "react-native-pager-view";

// --- 1. Login Component ---
const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

                <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
                    <Text style={styles.buttonText}>Connect to Node</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- 2. Dashboard Tabs ---
const HomeTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabText}>Active Node: Connected</Text>
        <Text style={styles.helperText}>Swipe left for Messages ➔</Text>
    </View>
);

const MessagesTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabText}>Encrypted Group Chats</Text>
    </View>
);

const ProfileTab = () => (
    <View style={styles.tabContent}>
        <Text style={styles.tabText}>User Profile & Settings</Text>
    </View>
);

// --- 3. Dashboard Component (with PagerView) ---
const DashboardPage = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState(0); // 0 = Home, 1 = Messages, 2 = Profile
    const pagerRef = useRef(null);

    // Sync bottom nav taps with the ViewPager
    const handleNavPress = (index) => {
        setActiveTab(index);
        pagerRef.current?.setPage(index);
    };

    return (
        <View style={styles.safeContainer}>
            {/* Swipable PagerView Content Area */}
            <PagerView
                style={styles.contentArea}
                initialPage={0}
                ref={pagerRef}
                onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
            >
                {/* Note: PagerView children MUST be direct Views */}
                <View key="0"><HomeTab /></View>
                <View key="1"><MessagesTab /></View>
                <View key="2"><ProfileTab /></View>
            </PagerView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress(0)}>
                    <Text style={[styles.navText, activeTab === 0 && styles.navTextActive]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress(1)}>
                    <Text style={[styles.navText, activeTab === 1 && styles.navTextActive]}>Messages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => handleNavPress(2)}>
                    <Text style={[styles.navText, activeTab === 2 && styles.navTextActive]}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={onLogout}>
                    <Text style={styles.navTextDanger}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- 4. Main App Component ---
export default function App() {
    const [page, setPage] = useState(0);

    if (page === 0) {
        return <LoginPage onLogin={() => setPage(1)} />;
    }

    if (page === 1) {
        return <DashboardPage onLogout={() => setPage(0)} />;
    }

    return (
        <View style={styles.centerContent}>
            <Text>Error: Invalid Page</Text>
        </View>
    );
}

// --- 5. Static Styles ---
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        // Manual safe area to bypass React Native's SafeAreaView bugs
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2c3e50',
    },
    subText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#7f8c8d',
        marginBottom: 40,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#000',
    },
    primaryButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentArea: {
        flex: 1,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f8',
    },
    tabText: {
        fontSize: 20,
        color: '#34495e',
        fontWeight: 'bold',
    },
    helperText: {
        fontSize: 14,
        color: '#95a5a6',
        marginTop: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 15,
        paddingBottom: Platform.OS === 'ios' ? 25 : 15,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    navTextActive: {
        color: '#3498db',
        fontWeight: 'bold',
    },
    navTextDanger: {
        fontSize: 14,
        color: '#e74c3c',
    }
});