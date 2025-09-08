import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

function RouteGuard({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const isAuthenticated = false; // Replace with your auth logic

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login or show a message
      console.log("User not authenticated, redirecting to login...");
      router.replace("/auth");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <>
    <RouteGuard>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
    </>
  );
}
