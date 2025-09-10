import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/lib/auth-context";

// function RouteGuard({children}: {children: React.ReactNode}) {
//   const router = useRouter();
//   const {user, isLoading} = useAuth();
//   const segments = useSegments();

//   useEffect(() => {
//     const inAuthGroup = segments[0] === "auth";
//     if (!user && !inAuthGroup && !isLoading) {
//       // Redirect to login or show a message
//       console.log("User not authenticated, redirecting to login...");
//       router.replace("/auth");
//     } else if (user && inAuthGroup && !isLoading) {
//       // If the user is authenticated and tries to access auth routes, redirect them
//       console.log("User authenticated, redirecting to home...");
//       router.replace("/");
//     }
//   }, [user, segments, isLoading, router]);

//   return <>{children}</>;
// }

export default function RootLayout() {
  return (
    <>
    <AuthProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
        </Stack>
    </AuthProvider>
    </>
  );
}
