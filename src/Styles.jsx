import { Platform, StatusBar, StyleSheet, useColorScheme } from "react-native";

export const useStyles = () => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    const styles = StyleSheet.create({
        safeContainer: {
            flex: 1,
            backgroundColor: '#f4f4f8',
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
        secondaryButton: {
            padding: 15,
            alignItems: 'center',
            marginTop: 10,
        },
        secondaryButtonText: {
            color: '#3498db',
            fontSize: 15,
            fontWeight: '600',
        },
        settingsButton: {
            marginTop: 30,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: '#ecf0f1',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#bdc3c7',
        },
        settingsButtonText: {
            fontSize: 16,
            color: '#2c3e50',
            fontWeight: '500',
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
    return styles;
};