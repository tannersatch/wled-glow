import { DarkAppTheme, LightAppTheme } from '@/constants/Theme';
import { useTheme } from 'react-native-paper';

export type AppThemeType = LightAppTheme | DarkAppTheme;

const useGlowTheme = () => useTheme<AppThemeType>();

export default useGlowTheme;
