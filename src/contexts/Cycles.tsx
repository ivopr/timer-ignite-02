import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  handleFinishedCycle: () => void
  secondsPassedAmount: number
  handleUpdateSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

const CyclesContext = createContext({} as CyclesContextType)

export function CyclesProvider({ children }: PropsWithChildren) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      activeCycleId: null,
      cycles: [],
    },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state',
      )

      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }

      return initialState
    },
  )

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  const [secondsPassedAmount, setSecondsPassedAmount] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
  }, [cyclesState])

  function handleFinishedCycle() {
    dispatch(finishCurrentCycleAction())
  }

  function handleUpdateSecondsPassed(seconds: number) {
    setSecondsPassedAmount(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassedAmount(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        handleFinishedCycle,
        secondsPassedAmount,
        handleUpdateSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCycles = () => useContext(CyclesContext)
