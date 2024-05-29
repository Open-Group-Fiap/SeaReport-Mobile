import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const HomeIcon = ({ color, fill }: { color: string; fill?: string }) => (
    <Svg width={53} height={52} fill={fill ?? 'none'}>
        <Path
            fill={color}
            stroke={color}
            strokeWidth={4}
            d="M49.151 20.9c.886.773 1.349 1.808 1.349 2.849v22.256C50.5 48.063 48.64 50 46 50h-6.5c-2.64 0-4.5-1.938-4.5-3.995v-9.99c0-2.358-2.021-3.998-4.167-3.998h-8.666c-2.146 0-4.167 1.64-4.167 3.998v9.99C18 48.063 16.14 50 13.5 50H7c-2.64 0-4.5-1.938-4.5-3.995V23.75c0-1.041.463-2.076 1.349-2.848L24.837 2.6c.918-.8 2.408-.8 3.326 0L49.15 20.9Z"
        />
    </Svg>
)
export default HomeIcon
