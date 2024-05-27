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
        <Stack.Screen
          name="tabs"
          options={{
            headerStyle: {
              backgroundColor:
                colorScheme === 'dark'
                  ? Theme.dark.colors.elevation.level2
                  : Theme.light.colors.elevation.level2,
            },
            headerTitleStyle: {
              color:
                colorScheme === 'dark'
                  ? Theme.dark.colors.onBackground
                  : Theme.light.colors.onBackground,
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
