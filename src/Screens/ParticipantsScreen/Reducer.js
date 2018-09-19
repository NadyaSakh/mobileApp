import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'

const defaultState = {
    componentState: ComponentState.CONTENT,
    participantsList: null,
    quantity: null
}

export const ParticipantsReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SHOW_PARTICIPANTS: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT
            }
        }

        case Actions.GET_PARTICIPANTS_SUCCESS: {
            return {
                ...prevState,
                screenState: ComponentState.CONTENT,
                participantsList: action.payload.participantsList,
                quantity: action.payload.quantity
            }
        }

        case Actions.GET_PARTICIPANTS_FAIL: {
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