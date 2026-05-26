import { useColorScheme } from "react-native";

export const useStyles = () => {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return {
        HelloWorldText: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 50,
            color: isDark ? "#ffffff" : "#000000"
        }
    };
};
