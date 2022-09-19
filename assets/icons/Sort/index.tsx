import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SortIcon = (props: SvgProps | any) => (
  <Svg width={14} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m.856 3.145 2.79-2.79c.19-.19.51-.19.7 0l2.79 2.79c.32.31.1.85-.35.85h-1.79v6.01c0 .55-.45 1-1 1s-1-.45-1-1v-6.01h-1.79c-.45 0-.67-.54-.35-.85Zm10.14 4.86v6.01h1.8c.44 0 .67.54.35.85l-2.79 2.78c-.2.19-.51.19-.71 0l-2.79-2.78c-.32-.31-.1-.85.35-.85h1.79v-6.01c0-.55.45-1 1-1s1 .45 1 1Z"
      fill="#1B4298"
    />
  </Svg>
)

export default SortIcon
