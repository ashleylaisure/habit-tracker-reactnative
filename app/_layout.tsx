import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider } from "@/lib/auth-context";

function RouteGuard({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login or show a message
      console.log("User not authenticated, redirecting to login...");
      router.replace("/auth");
    }
  });
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <>
    <AuthProvider>

      {/* <RouteGuard> */}
        <Stack >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      {/* </RouteGuard> */}
    </AuthProvider>
    </>
  );
}
