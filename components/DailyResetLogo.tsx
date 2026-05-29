import React from 'react'
import { Image, View } from 'react-native'

interface DailyResetLogoProps {
  width?: number
  height?: number
  variant?: 'dark' | 'light'
}

export const DailyResetLogo = ({
  width = 460,
  height = 230,
  variant = 'dark',
}: DailyResetLogoProps) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={require('../assets/images/novalogo5.png')}
        style={{
          width: width,
          height: height,
          resizeMode: 'contain',
        }}
        fadeDuration={0}
      />
    </View>
  )
}

export default DailyResetLogo
