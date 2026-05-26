import { StyleSheet, useColorScheme } from "react-native";

export const useStyles = () => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f4f4f8',
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
            justifyContent: 'center',
            alignItems: 'center',
        },
        tabContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        tabText: {
            fontSize: 20,
            color: '#34495e',
        },
        bottomNav: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            paddingVertical: 10,
            paddingBottom: 25,
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
};