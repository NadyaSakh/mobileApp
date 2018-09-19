import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'
// import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    screenState: ComponentState.CONTENT,
    navigateTo: '',
    fullName: ''
}

export const ScanScreenReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.GETTING_FULL_NAME_SUCCESS: {
            return {
                ...prevState,
                screenState: ComponentState.CONTENT,
                fullName: action.payload.fullName
            }
        }

        default: {
            return prevState
        }
    }
}