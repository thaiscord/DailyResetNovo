import { View } from 'react-native';
import { DailyResetLogo } from './DailyResetLogo';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

const SIZE_MAP = {
  sm:  { width: 110, height: 55  },
  md:  { width: 200, height: 100 },
  lg:  { width: 220, height: 110 },
  xl:  { width: 240, height: 120 },
};

export function AppLogo({ size = 'lg', opacity = 1 }: AppLogoProps) {
  const { width, height } = SIZE_MAP[size];

  return (
    <View style={{ opacity, alignItems: 'center' }}>
      <DailyResetLogo width={width} height={height} />
    </View>
  );
}
