import { ScanState } from './Constants'
import { Actions } from './Actions'
import { ComponentState } from '../../Components/ActionContainer'


const defaultState = {
    scanState: ScanState.SCAN_DISABLE,
    chosenPoint: {}
}

export const ScanStoreReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case Actions.SCAN_DISABLE: {
            return {
                ...prevState,
                scanState: ScanState.SCAN_DISABLE
            }
        }
        case Actions.POINT_NOT_SELECTED: {
            return {
                ...prevState,
                scanState: ScanState.POINT_NOT_SELECTED
            }
        }
        case Actions.POINT_SELECTED: {
            return {
                scanState: ScanState.POINT_SELECTED,
                chosenPoint: action.payload.chosenPoint
            }
        }
        case Actions.SCANING: {
            return {
                ...prevState,
                screenState: ComponentState.LOADING
            }
        }
        // case Actions.SCANING_SUCCESS: {
        //     return {
        //         ...prevState,
        //         screenState: ComponentState.CONTENT
        //         // navigateTo: ScreensKeys.APP // Переход на экран о типе события
        //     }
        // }
        //
        // case Actions.SCANING_FAIL: {
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

