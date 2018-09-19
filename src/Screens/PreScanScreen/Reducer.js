import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'

const defaultState = {
    componentState: ComponentState.CONTENT,
    message: ''
}

export const PreScanReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SHOW_SCAN: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT
            }
        }
        case Actions.SEND_TAG_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT,
                message: action.payload.message
            }
        }
        case Actions.SEND_TAG_FAIL: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT,
                message: action.payload.message
            }
        }
        default: {
            return prevState
        }
    }
}