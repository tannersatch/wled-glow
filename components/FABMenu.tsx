import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

const FABMenu = () => {
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
        icon={open ? 'close' : 'menu'}
        actions={[
          {
            icon: 'power',
            label: 'Power',
            onPress: () => toggleSetting('power'),
          },
          {
            icon: 'timer',
            label: 'Timer',
            onPress: () => toggleSetting('timer'),
          },
          {
            icon: 'sync',
            label: 'Sync',
            onPress: () => toggleSetting('sync'),
          },
          {
            icon: 'eye',
            label: 'Peek',
            onPress: () => toggleSetting('peek'),
          },
          {
            icon: 'information',
            label: 'Info',
            onPress: () => toggleSetting('info'),
          },
          {
            icon: 'cog',
            label: 'Config',
            onPress: () => toggleSetting('config'),
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

export default FABMenu;
