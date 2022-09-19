import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const LocationIcon = (props: SvgProps | any) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 3.49 3.62 8.19 5.23 10.12.4.48 1.13.48 1.53 0C14.38 16.19 18 11.49 18 8Zm-8 0c0-1.1.9-2 2-2s2 .9 2 2a2 2 0 1 1-4 0ZM6 22c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1H6Z"
      fill={props.color ?? '#DEE9FF'}
    />
  </Svg>
)

export default LocationIcon
