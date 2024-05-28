import * as React from 'react';
import { ToggleButton } from 'react-native-paper';

const QuickMenu = () => {
  const [value, setValue] = React.useState<string[]>([]);

  const onValueChange = (val: string) =>
    setValue((prev: string[]) => {
      console.debug(val);
      if (prev.includes(val)) {
        return prev.filter((v) => v !== val);
      }
      if (val === null) {
        return [...prev];
      }
      return [...prev, val];
    });

  return (
    <ToggleButton.Row onValueChange={() => {}} value="">
      <ToggleButton
        icon="power"
        value="power"
        status={value.includes('power') ? 'checked' : 'unchecked'}
        onPress={() => onValueChange('power')}
      />
      <ToggleButton
        icon="timer"
        value="timer"
        status={value.includes('timer') ? 'checked' : 'unchecked'}
        onPress={() => onValueChange('timer')}
      />
      <ToggleButton
        icon="sync"
        value="sync"
        status={value.includes('sync') ? 'checked' : 'unchecked'}
        onPress={() => onValueChange('sync')}
      />
      <ToggleButton
        icon="eye"
        value="peek"
        status={value.includes('peek') ? 'checked' : 'unchecked'}
        onPress={() => onValueChange('peek')}
      />
      <ToggleButton
        icon="information"
        value="info"
        status={value.includes('info') ? 'checked' : 'unchecked'}
        onPress={() => onValueChange('info')}
      />
      <ToggleButton
        icon="cog"
        value="config"
        status={value.includes('config') ? 'checked' : 'unchecked'}
        onPress={() => onValueChange('config')}
      />
    </ToggleButton.Row>
  );
};

export default QuickMenu;
