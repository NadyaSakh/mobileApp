import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'

const defaultState = {
    screenState: ComponentState.CONTENT,
    competitionName: null
}

export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.REQUEST_COMPETITION: {
            return {
                screenState: ComponentState.LOADING,
                competitionName: null
            }
        }
        case Actions.REQUEST_COMPETITION_SUCCESS: {
            return {
                screenState: ComponentState.CONTENT,
                competitionName: action.payload.competitionName
            }
        }
        case Actions.REQUEST_COMPETITION_FAIL: {
            return {
                ...prevState,
                screenState: ComponentState.ERROR
            }
        }

        default: {
            return prevState
        }
    }
}