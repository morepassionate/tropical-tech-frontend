import { atom } from 'recoil'

const FirstAccess = atom({
  key: 'FirstAccess',
  default: {
    isFirstAccess: true
  }
})

export default FirstAccess
