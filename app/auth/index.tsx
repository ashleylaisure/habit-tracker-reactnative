import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import {Button, Text, TextInput, useTheme} from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const theme = useTheme()
    const router = useRouter();

    const { signUp, signIn } = useAuth();

    const handleAuth = async () => {
        if(!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        if(password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setError(null);

        if (isSignUp) {
            const error = await signUp(email, password)
            if (error) {
                setError(error);
                return
            }
        } else {
            const error = await signIn(email, password)
            if (error) {
                setError(error);
                return
            }

            router.replace("/"); // Navigate to the main app screen after successful login
        }

    }

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" } style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium">
                    {isSignUp ? "Create an Account" : "Welcome Back! Please Log In"}
                </Text>

                <TextInput 
                    label="Email" 
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    placeholder="Enter your email"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    label="Password" 
                    autoCapitalize="none" 
                    keyboardType="default" 
                    placeholder="Enter your password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                />

                {error ? <Text style={{ color: theme.colors.error, marginBottom: 8 }}>{error}</Text> : null}

                <Button mode="contained" onPress={handleAuth} style={styles.button}>
                    {isSignUp ? "Sign Up" : "Log In"}
                </Button>

                <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>
                    {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </Button>

            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    switchModeButton: {
        marginTop: 16,
    },
})