import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const PersonLocationIcon = (props: SvgProps | any) => (
  <Svg width={11} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25 0A5.256 5.256 0 0 0 0 5.25c0 3.127 3.315 7.44 4.68 9.082.3.36.848.36 1.147 0C7.185 12.69 10.5 8.377 10.5 5.25A5.256 5.256 0 0 0 5.25 0Zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-3 5.888A3.587 3.587 0 0 0 5.25 9a3.587 3.587 0 0 0 3-1.612c-.015-.99-2.003-1.538-3-1.538-.997 0-2.985.548-3 1.538Z"
      fill="#4A5CAE"
    />
  </Svg>
)

export default PersonLocationIcon
