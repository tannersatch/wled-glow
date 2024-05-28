import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { PaperProvider } from 'react-native-paper';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <PaperProvider theme={colorScheme === 'dark' ? Theme.dark : Theme.light}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
