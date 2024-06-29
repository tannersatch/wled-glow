import { router } from 'expo-router';
import {
  ImageBackground,
  StyleSheet,
  View,
  ImageSourcePropType,
} from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import untypedBackground from '@/assets/images/background.png';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const background = untypedBackground as ImageSourcePropType;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primaryContainer,
      height: 60 + insets.top,
      paddingTop: insets.top,
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    title: {
      fontSize: 20,
      color: '#fff',
    },
    backButton: {
      position: 'absolute',
      left: 0,
    },
  });

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          onPress={() => router.back()}
          style={styles.backButton}
          iconColor="#fff"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

export default Header;
