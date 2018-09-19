import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'

const defaultState = {
    componentState: ComponentState.CONTENT
}

export const MenuReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SHOW_MENU: {
            return {
                ...prevState,
                componentState: ComponentState.CONTENT
            }
        }
        default: {
            return prevState
        }
    }
}