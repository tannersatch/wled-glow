import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { PaperProvider, Portal } from 'react-native-paper';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from 'react-native';
import { AppStateProvider } from '@/contexts/AppStateProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={colorScheme === 'dark' ? Theme.dark : Theme.light}>
        <AppStateProvider>
          <Portal.Host>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="home" options={{ headerShown: false }} />
              <Stack.Screen
                name="wled-native/[ip]"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="tabs" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Portal.Host>
        </AppStateProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
