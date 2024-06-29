import * as React from 'react';
import {
  Button,
  Dialog,
  FAB,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FoundDevices from '../devices/FoundDevices';

const AddDevice = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0 + insets.bottom,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
    },
    closeIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    dialogContent: {
      paddingHorizontal: 0,
      marginTop: 0,
      marginBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    scrollView: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    sectionTitle: {
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      borderRadius: theme.roundness + 8,
      borderWidth: 0,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
  });

  return (
    <Portal>
      <FAB
        icon="plus"
        label="Add Device"
        style={styles.fab}
        onPress={showDialog}
      />
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.ScrollArea style={styles.dialogContent}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Dialog.Title style={styles.title}>Add Device</Dialog.Title>
            <Text style={styles.sectionTitle}>ADD BY IP ADDRESS</Text>
            <TextInput
              label="IP Address"
              mode="outlined"
              outlineStyle={styles.input}
              keyboardType="numeric"
            />
            <Text style={styles.sectionTitle}>FOUND DEVICES</Text>
            <FoundDevices />
          </ScrollView>
          <IconButton
            icon="close"
            onPress={hideDialog}
            style={styles.closeIcon}
            // containerColor={theme.colors.backdrop}
          />
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

export default AddDevice;
