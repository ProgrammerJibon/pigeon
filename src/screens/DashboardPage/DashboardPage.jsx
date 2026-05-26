// src/screens/DashboardPage/DashboardPage.jsx
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { useStyles } from "../../Styles"; // <-- 1. Add this import

const HomeTab = ({ navigation, styles }) => (
    <View style={styles.tabContent}>
        <Text style={styles.tabText}>Active Node: Connected</Text>
        <Text style={styles.helperText}>Swipe left for Messages ➔</Text>

        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.settingsButtonText}>⚙️ Node Settings</Text>
        </TouchableOpacity>
    </View>
);

const MessagesTab = ({ styles }) => (
    <View style={styles.tabContent}>
        <Text style={styles.tabText}>Encrypted Group Chats</Text>
    </View>
);

const ProfileTab = ({ styles }) => (
    <View style={styles.tabContent}>
        <Text style={styles.tabText}>User Profile & Settings</Text>
    </View>
);

// 2. Remove "styles" from props here
const DashboardPage = ({ navigation }) => {
    const styles = useStyles(); // <-- 3. Initialize styles here
    const [activeTab, setActiveTab] = useState(0);
    const pagerRef = useRef(null);

    const handleNavPress = (index) => {
        setActiveTab(index);
        pagerRef.current?.setPage(index);
    };

    const handleLogout = () => {
        navigation.replace("Login");
    };

    return (
        <View style={styles.safeContainer}>
            <PagerView
                style={styles.contentArea}
                initialPage={0}
                ref={pagerRef}
                onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
            >
                {/* 4. You are correctly passing styles down to the tabs here! */}
                <View key="0"><HomeTab navigation={navigation} styles={styles} /></View>
                <View key="1"><MessagesTab styles={styles} /></View>
                <View key="2"><ProfileTab styles={styles} /></View>
            </PagerView>

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

                <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
                    <Text style={styles.navTextDanger}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DashboardPage; 