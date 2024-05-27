import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import untypedHeader from '@/assets/images/header.webp';
import { useNavigation } from 'expo-router';
import { List, ListItemProps, useTheme } from 'react-native-paper';
import { ReactNode } from 'react';

const partialHeader = untypedHeader as ImageSourcePropType;

export default function HomeScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const styles = StyleSheet.create({
    titleContainer: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });

  const lightOnIcon = (props: ListItemProps['right']): ReactNode => (
    <List.Icon {...props} icon="lightbulb-on" />
  );

  const lightOffIcon = (props: ListItemProps['right']): ReactNode => (
    <List.Icon {...props} icon="lightbulb-off" />
  );

  return (
    <ParallaxScrollView
      headerImage={<Image source={partialHeader} style={styles.reactLogo} />}
    >
      <List.Item
        title="Satchwell Holiday Lights"
        description="192.168.4.212"
        right={lightOnIcon}
        onPress={() => navigation.navigate('tabs')}
      />
    </ParallaxScrollView>
  );
}
