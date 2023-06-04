import { Cycle } from './reducer'

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function finishCurrentCycleAction() {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE,
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
