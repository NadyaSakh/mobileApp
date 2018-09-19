import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'
import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    componentState: ComponentState.CONTENT,
    navigateTo: ''
}

export const authReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.AUTHORISATION: {
            return {
                ...prevState,
                componentState: ComponentState.LOADING,
            }
        }
        case Actions.AUTHORISATION_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT,
                navigateTo: ScreensKeys.INIT

            }
        }
        case Actions.AUTHORISATION_FAIL: {
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