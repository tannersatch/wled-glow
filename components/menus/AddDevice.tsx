import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

const AddDevice = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  const toggleSetting = (setting: string) => {
    switch (setting) {
      case 'power':
        break;
      case 'timer':
        break;
      case 'sync':
        break;
      case 'peek':
        break;
      case 'info':
        break;
      case 'config':
        break;
      default:
        break;
    }
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'string-lights',
            label: 'Add Device',
            onPress: () => toggleSetting('power'),
          },
          {
            icon: 'lightbulb-group',
            label: 'Add Group',
            onPress: () => toggleSetting('timer'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default AddDevice;
