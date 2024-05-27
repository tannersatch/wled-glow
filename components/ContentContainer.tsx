import { ReactElement } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

type ContentContainerProps = ViewProps & {
  children: ReactElement;
};

const ContentContainer = ({ children, ...props }: ContentContainerProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
  });

  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
};

export default ContentContainer;
