import { atom } from 'recoil'

type CashbackProps = {
  transactionName: string
  inValue?: number
  day: string
  type: 'IN'
}

const CashbackAtom = atom<CashbackProps[] | null>({
  key: 'Cashback',
  default: null
})

export default CashbackAtom
