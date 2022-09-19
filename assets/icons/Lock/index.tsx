import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const LockIcon = (props: SvgProps | any) => (
  <Svg width={13} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M12.8 8c0-.882-.718-1.6-1.6-1.6h-.8V4c0-2.206-1.794-4-4-4s-4 1.794-4 4v2.4h-.8C.718 6.4 0 7.118 0 8v6.4c0 .882.718 1.6 1.6 1.6h9.6c.882 0 1.6-.718 1.6-1.6V8ZM4 4c0-1.323 1.077-2.4 2.4-2.4S8.8 2.677 8.8 4v2.4H4V4Z"
      fill="#000"
    />
  </Svg>
)

export default LockIcon
