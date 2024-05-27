import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  const colorsIcon = ({
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  }) => (
    <TabBarIcon name={focused ? 'palette' : 'palette-outline'} color={color} />
  );

  const effectsIcon = ({
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  }) => (
    <TabBarIcon
      name={focused ? 'animation' : 'animation-outline'}
      color={color}
    />
  );

  const segmentsIcon = ({
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  }) => (
    <TabBarIcon name={focused ? 'layers' : 'layers-outline'} color={color} />
  );

  const presetsIcon = ({
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  }) => (
    <TabBarIcon
      name={focused ? 'cards-heart' : 'cards-heart-outline'}
      color={color}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.elevation.level2,
        },
      }}
    >
      <Tabs.Screen
        name="colors"
        options={{
          title: 'Colors',
          tabBarIcon: colorsIcon,
        }}
      />
      <Tabs.Screen
        name="effects"
        options={{
          title: 'Effects',
          tabBarIcon: effectsIcon,
        }}
      />
      <Tabs.Screen
        name="segments"
        options={{
          title: 'Segments',
          tabBarIcon: segmentsIcon,
        }}
      />
      <Tabs.Screen
        name="presets"
        options={{
          title: 'Presets',
          tabBarIcon: presetsIcon,
        }}
      />
    </Tabs>
  );
}
