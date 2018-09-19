import { Observable } from 'rxjs'
import { AsyncStorage } from 'react-native'
import { LOG } from '../../Utils/logger'

export const Actions = {
    SCANING: 'SCANING',
    SCANING_SUCCESS: 'SCANING_SUCCESS',
    SCANING_FAIL: 'SCANING_FAIL',
    GETTING_FULL_NAME: 'GETTING_FULL_NAME',
    GETTING_FULL_NAME_SUCCESS: 'GETTING_FULL_NAME_SUCCESS'
}

export const getFullNameAction = () => ({
    type: Actions.GETTING_FULL_NAME
})

export const getFullNameEpic = action$ =>
    action$.ofType(Actions.GETTING_FULL_NAME)
        .mergeMap(() => {
            return getFullName()
        })
        .mergeMap(fullName => {
            LOG(fullName, 'Полное имя:')
            return Observable.of(gettingFullNameSuccessAction(fullName))
        })

const gettingFullNameSuccessAction = (fullName) => ({
    type: Actions.GETTING_FULL_NAME_SUCCESS,
    payload: {
        fullName
    }
})

const getFullName = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('fullName',
            (errors, name) => {
                if (errors !== null) {
                    LOG(errors, 'Имя судьи не получено!')
                    observer.next()
                }
                else {
                    LOG(name)
                    observer.next(name)
                }
                observer.complete()
            })
    })
}