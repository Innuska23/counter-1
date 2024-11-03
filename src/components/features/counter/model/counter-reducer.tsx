import { CounterState } from "../../../app/types/types"
import { loadFromLocalStorage } from "../../../app/utils/localStorage"

export type IncrementCounterActionType = {
    type: 'INCREMENT_COUNTER'
}

export type resetCounterActionType = {
    type: 'RESET_COUNTER'
}

export type setCounterActionType = {
    type: 'SET_COUNTER'
}

export type updateMaxValueCounterActionType = {
    type: 'MAX_VALUE_COUNTER'
    payload: {
        value: number
    }
}

export type updateStartValueCounterActionType = {
    type: 'START_VALUE_COUNTER'
    payload: {
        value: number
    }
}

type ActionsType =
    | IncrementCounterActionType
    | resetCounterActionType
    | setCounterActionType
    | updateMaxValueCounterActionType
    | updateStartValueCounterActionType

const savedState = loadFromLocalStorage()

const initialState: CounterState = savedState || {
    maxValue: 0,
    startValue: 0,
    counter: 0,
}

export const counterReducer = (state: CounterState = initialState, action: ActionsType): CounterState => {
    switch (action.type) {
        case 'INCREMENT_COUNTER': {
            return state.counter < state.maxValue
                ? { ...state, counter: state.counter + 1 }
                : state
        }
        case 'RESET_COUNTER': {
            return {
                ...state,
                counter: state.startValue,
            };
        }
        case "SET_COUNTER": {
            return state.maxValue > state.startValue
                ? {
                    ...state,
                    counter: state.startValue,
                }
                : state;
        }
        case "START_VALUE_COUNTER": {
            return {
                ...state,
                startValue: action.payload.value
            }

        }
        case "MAX_VALUE_COUNTER": {
            return {
                ...state,
                maxValue: action.payload.value
            }
        }

        default:
            return state;
    }
}

export type incrementCounterACType = ReturnType<typeof incrementCounterAC>
export type resetCounterACType = ReturnType<typeof resetCounterAC>
export type setCounterACType = ReturnType<typeof setCounterAC>
export type setMaxValueCounterACType = ReturnType<typeof setMaxValueAC>
export type setStartValueCounterACType = ReturnType<typeof setStartValueAC>

export const incrementCounterAC = (): ActionsType => {
    return {
        type: 'INCREMENT_COUNTER',
    } as const
}

export const resetCounterAC = (): ActionsType => {
    return {
        type: 'RESET_COUNTER',
    } as const
}

export const setCounterAC = (): ActionsType => {
    return {
        type: 'SET_COUNTER',
    } as const
}

export const setMaxValueAC = (value: number): ActionsType => {
    return {
        type: 'MAX_VALUE_COUNTER',
        payload: {
            value
        }
    } as const
}

export const setStartValueAC = (value: number): ActionsType => {
    return {
        type: "START_VALUE_COUNTER",
        payload: {
            value
        }
    } as const
}


