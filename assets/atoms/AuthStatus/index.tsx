import { atom } from 'recoil'

type AuthStatusProps = {
  isAuthenticated: boolean
}

const AuthStatus = atom<AuthStatusProps | null>({
  key: 'AuthStatus',
  default: {
    isAuthenticated: false
  }
})

export default AuthStatus
