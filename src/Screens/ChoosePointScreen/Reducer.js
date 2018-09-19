import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'
// import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    componentState: ComponentState.CONTENT,
    currentPoints: null,
    competitionName: ''
    // navigateTo: ''
}

export const ChoosePointScreenReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.CHOOSING: {
            return {
                ...prevState,
                componentState: ComponentState.LOADING
            }
        }
        case Actions.CHOOSING_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT
                // navigateTo: ScreensKeys.APP.Scan
            }
        }

        case Actions.CHOOSING_FAIL: {
            return {
                ...prevState,
                componentState: ComponentState.ERROR
            }
        }

        case Actions.GETTING_COMPETITION_NAME_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT,
                competitionName: action.payload.competitionName
            }
        }

        case Actions.GETTING_POINTS_SUCCESS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT,
                currentPoints: action.payload.currentPoints
            }
        }

        // case Actions.GETTING_POINTS_ERROR: {
        //     return {
        //         ...prevState,
        //         screenState: ComponentState.ERROR
        //     }
        // }

        default: {
            return prevState
        }
    }
}