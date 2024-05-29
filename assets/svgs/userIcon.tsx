import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const UserIcon = ({ color, fill }: { color: string; fill?: string }) => (
    <Svg width={56} height={54} fill={fill ?? 'none'}>
        <Path
            stroke={color}
            strokeWidth={4}
            d="M53.5 27c0 13.773-11.382 25-25.5 25S2.5 40.773 2.5 27 13.882 2 28 2s25.5 11.227 25.5 25Z"
        />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M28.384 24c3.776 0 6.837-3.134 6.837-7s-3.061-7-6.837-7-6.838 3.134-6.838 7 3.062 7 6.838 7ZM43.767 45c0-8.699-6.887-15.75-15.383-15.75C19.887 29.25 13 36.301 13 45"
        />
    </Svg>
)
export default UserIcon
