import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { authReducer } from './Screens/AuthScreen/Reducer'
import { InitScreenReducer } from './Screens/InitCompScreen/Reducer'
import { ScanScreenReducer } from './Screens/ScanScreen/Reducer'
import { ChoosePointScreenReducer } from './Screens/ChoosePointScreen/Reducer'
import { splashScreenReducer } from './Screens/SplashScreen/Reducer'
import { logger } from 'redux-logger'

import { requestCompetitionEpic } from './Screens/InitCompScreen/Actions'
import { authorisationEpic } from './Screens/AuthScreen/Actions'
import { getFullNameEpic } from './Screens/ScanScreen/Actions'
import { getCompNameEpic, getPointsEpic } from './Screens/ChoosePointScreen/Actions'
import { checkAuthEpic } from './Screens/SplashScreen/Actions'
import { MenuReducer } from './Screens/MenuScreen/Reducer'
import { PreScanReducer } from './Screens/PreScanScreen/Reducer'
import { ScanStoreReducer } from './Store/Scan/Reducer'
import { sendTagEpic } from './Screens/PreScanScreen/Actions'
import { ParticipantsReducer } from './Screens/ParticipantsScreen/Reducer'
import { getParticipantsEpic } from './Screens/ParticipantsScreen/Actions'
import { checkScanAvailabilityEpic } from './Store/Scan/Actions'
import { ScanTypeReducer } from './Screens/ScanTypeScreen/Reducer'
import { getParticipantInfoEpic, saveEventEpic } from './Screens/ScanTypeScreen/Actions'


export const rootReducer = combineReducers({
    InitScreenReducer,
    authReducer,
    ScanScreenReducer,
    ChoosePointScreenReducer,
    splashScreenReducer,
    MenuReducer,
    PreScanReducer,
    ScanStoreReducer,
    ParticipantsReducer,
    ScanTypeReducer
})

export const rootEpic = combineEpics(
    requestCompetitionEpic,
    authorisationEpic,
    checkAuthEpic,
    getCompNameEpic,
    getPointsEpic,
    getFullNameEpic,
    sendTagEpic,
    getParticipantsEpic,
    checkScanAvailabilityEpic,
    getParticipantInfoEpic,
    saveEventEpic
)

export const epicMiddleware = createEpicMiddleware(rootEpic)

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        logger,
        epicMiddleware
    )
)

