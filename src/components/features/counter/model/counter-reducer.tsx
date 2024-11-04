import { CounterState } from "../../../app/types/types"
import { loadFromLocalStorage } from "../../../app/utils/localStorage"

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const RESET_COUNTER = 'RESET_COUNTER';
export const SET_COUNTER = 'SET_COUNTER';
export const MAX_VALUE_COUNTER = 'MAX_VALUE_COUNTER';
export const START_VALUE_COUNTER = 'START_VALUE_COUNTER';


export type IncrementCounterActionType = {
    type: typeof INCREMENT_COUNTER
    payload: {
        maxValue: number
        counter: number
    }
}

export type ResetCounterActionType = {
    type: typeof RESET_COUNTER
    payload: {
        startValue: number
    }
}

export type SetCounterActionType = {
    type: typeof SET_COUNTER
    payload: {
        startValue: number
        maxValue: number
    }
}

export type UpdateMaxValueCounterActionType = {
    type: typeof MAX_VALUE_COUNTER
    payload: {
        value: number
    }
}

export type UpdateStartValueCounterActionType = {
    type: typeof START_VALUE_COUNTER
    payload: {
        value: number
    }
}

type ActionsType =
    | IncrementCounterActionType
    | ResetCounterActionType
    | SetCounterActionType
    | UpdateMaxValueCounterActionType
    | UpdateStartValueCounterActionType

const savedState = loadFromLocalStorage()

const initialState: CounterState = savedState || {
    maxValue: 0,
    startValue: 0,
    counter: 0,
}

export const counterReducer = (state: CounterState = initialState, action: ActionsType): CounterState => {
    switch (action.type) {
        case INCREMENT_COUNTER: {
            return action.payload.counter < action.payload.maxValue
                ? { ...state, counter: state.counter + 1 }
                : state
        }
        case RESET_COUNTER: {
            return {
                ...state,
                counter: action.payload.startValue,
            };
        }
        case SET_COUNTER: {
            return action.payload.maxValue > action.payload.startValue
                ? {
                    ...state,
                    counter: action.payload.startValue,
                }
                : state;
        }
        case START_VALUE_COUNTER: {
            return {
                ...state,
                startValue: action.payload.value
            }
        }
        case MAX_VALUE_COUNTER: {
            return {
                ...state,
                maxValue: action.payload.value
            }
        }
        default:
            return state;
    }
}

export const incrementCounterAC = (counter: number, maxValue: number): IncrementCounterActionType => ({
    type: INCREMENT_COUNTER,
    payload: {
        counter,
        maxValue
    }
})

export const resetCounterAC = (startValue: number): ResetCounterActionType => ({
    type: RESET_COUNTER,
    payload: {
        startValue
    }
})

export const setCounterAC = (startValue: number, maxValue: number): SetCounterActionType => ({
    type: SET_COUNTER,
    payload: {
        startValue,
        maxValue
    }
})

export const setMaxValueAC = (value: number): UpdateMaxValueCounterActionType => ({
    type: MAX_VALUE_COUNTER,
    payload: {
        value
    }
})

export const setStartValueAC = (value: number): UpdateStartValueCounterActionType => ({
    type: START_VALUE_COUNTER,
    payload: {
        value
    }
})