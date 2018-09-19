import { Actions } from './Actions'
import { ScreensKeys } from '../../ScreenKey'

const defaultState = {
    navigateTo: ''
}

export const splashScreenReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.NAVIGATE_TO_AUTH: {
            return {
                navigateTo: ScreensKeys.AUTH
            }
        }
        case Actions.NAVIGATE_TO_INIT: {
            return {
                navigateTo: ScreensKeys.INIT
            }
        }
        case Actions.NAVIGATE_TO_APP: {
            return {
                navigateTo: ScreensKeys.APP
            }
        }

        default: {
            return prevState
        }
    }
}