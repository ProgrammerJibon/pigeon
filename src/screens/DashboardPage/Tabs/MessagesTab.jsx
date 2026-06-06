import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// FastImage is MANDATORY for weak servers (ESP32) to prevent re-downloading
import FastImage from "react-native-fast-image";
// Skeleton loader for weak/slow network states
import ContentLoader, { List } from "react-native-easy-content-loader";

const MessagesTab = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    // Simulated PIGEON Mesh Network Data
    const [messageInboxes, setMessageInboxes] = useState([
        {
            id: "1",
            name: "UGV_THESIS_GRP_01",
            lastMessage: "LoRa nodes online. Commencing sync.",
            lastMessageTime: "10:42 AM",
            lastMessageSeen: true,
            image_url: "https://i.pravatar.cc/150?img=11"
        },
        {
            id: "2",
            name: "Turjo_12221001",
            lastMessage: "Image chunk 4/12 received.",
            lastMessageTime: "09:15 AM",
            lastMessageSeen: false,
            image_url: "https://i.pravatar.cc/150?img=12"
        },
        {
            id: "3",
            name: "NODE_X_MASTER",
            lastMessage: "JSON ledger updated successfully.",
            lastMessageTime: "Yesterday",
            lastMessageSeen: true,
            image_url: "https://i.pravatar.cc/150?img=13"
        },
        {
            id: "4",
            name: "Jibon_12221059",
            lastMessage: "Are we doing the range test at Keraniganj?",
            lastMessageTime: "Yesterday",
            lastMessageSeen: true,
            image_url: "https://i.pravatar.cc/150?img=14"
        }
    ]);

    // Simulate network delay to show the skeleton loader
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 second delay to simulate ESP32 fetch
        return () => clearTimeout(timer);
    }, []);

    const renderInboxItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatContainer}
            activeOpacity={0.7}
            onPress={() => console.log(`Open chat: ${item.name}`)}
        >
            {/* LEFT: Profile/Group Image */}
            <FastImage
                style={styles.profileImage}
                source={{
                    uri: item.image_url,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable, // Aggressive caching
                }}
                resizeMode={FastImage.resizeMode.cover}
            />

            {/* MIDDLE: Name and Last Message */}
            <View style={styles.middleContainer}>
                <Text style={styles.chatName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>

            {/* RIGHT: Time and Seen Indicator */}
            <View style={styles.rightContainer}>
                <Text style={styles.timeText}>{item.lastMessageTime}</Text>
                {item.lastMessageSeen ? (
                    <FastImage
                        style={styles.seenIndicator}
                        source={{
                            uri: item.image_url,
                            cache: FastImage.cacheControl.immutable,
                        }}
                    />
                ) : (
                    <View style={styles.unseenDot} /> // Shows a green dot if not seen
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {/* Search Bar (Navigates to dedicated search screen) */}
            <View style={styles.searchWrapper}>
                <TouchableOpacity
                    style={styles.searchBar}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate("SearchScreen")}
                >
                    <Text style={styles.searchText}>{"> SEARCH NETWORK_LOGS..."}</Text>
                </TouchableOpacity>
            </View>

            {/* FlatList with Skeleton Loader */}
            <ContentLoader
                active
                loading={isLoading}
                pRows={4}
                pHeight={[20, 20, 20, 20]}
                pWidth={['100%', '100%', '100%', '100%']}
                primaryColor="#0A1128" // Matched to PIGEON dark theme
                secondaryColor="#1A2A40"
                containerStyles={styles.loaderContainer}
            >
                <FlatList
                    data={messageInboxes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderInboxItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listPadding}
                />
            </ContentLoader>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070B14', // Core PIGEON background
    },
    searchWrapper: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#070B14',
        borderBottomWidth: 1,
        borderBottomColor: '#1A2A40',
    },
    searchBar: {
        backgroundColor: '#0A1128',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#1A2A40',
        justifyContent: 'center',
    },
    searchText: {
        color: 'rgba(74, 144, 226, 0.6)', // Subdued blue
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        fontSize: 14,
    },
    loaderContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    listPadding: {
        paddingBottom: 80, // Padding for bottom nav bar
    },
    chatContainer: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#0A1128',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#4A90E2',
        backgroundColor: '#1A2A40', // Placeholder color before image loads
    },
    middleContainer: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
        justifyContent: 'center',
    },
    chatName: {
        color: '#00FF00',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        marginBottom: 4,
    },
    lastMessage: {
        color: '#888',
        fontSize: 13,
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 40,
    },
    timeText: {
        color: '#4A90E2',
        fontSize: 11,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    seenIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginTop: 5,
        opacity: 0.6,
    },
    unseenDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00FF00',
        marginTop: 8,
    }
});

export default MessagesTab;