import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.elevation.level2,
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
    },
    backButton: {
      position: 'absolute',
      left: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
