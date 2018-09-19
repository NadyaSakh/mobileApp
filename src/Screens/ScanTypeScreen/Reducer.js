import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'

const defaultState = {
    componentState: ComponentState.LOADING,
    participant: null
}

export const ScanTypeReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.LOADING_PARTICIPANT_INFO: {
            return {
                ...prevState,
                componentState: ComponentState.LOADING
            }
        }
        case Actions.LOADING_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT,
                participant: action.payload.participant
            }
        }
        case Actions.LOADING_FAIL: {
            return {
                ...prevState,
                componentState: ComponentState.ERROR
            }
        }
        default: {
            return prevState
        }
    }
}