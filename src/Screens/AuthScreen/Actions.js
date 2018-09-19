import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
// import {AjaxResponse} from 'rxjs/observable/dom/AjaxObservable'
import { AsyncStorage } from 'react-native'

export const Actions = {
    AUTHORISATION: 'AUTHORISATION',
    AUTHORISATION_SUCCESS: 'AUTHORISATION_SUCCESS',
    AUTHORISATION_FAIL: 'AUTHORISATION_FAIL'
}

export const signInAction = (login, password) => ({
    type: Actions.AUTHORISATION,
    payload: {
        login: login,
        password: password
    }
})

export const authorisationEpic = action$ =>
    action$.ofType(Actions.AUTHORISATION)
    // .mergeMap(action => {
        .mergeMap(() => {
            // return ajax.post('https://my-json-server.typicode.com/NadyaSakh/Auth1/auth',
            //     {
            //         'login': action.payload.login,
            //         'password': action.payload.password
            //     },
            //     {'Content-Type': 'application / json'})

            return ajax.getJSON('https://my-json-server.typicode.com/NadyaSakh/Auth1/auth')
                .timeout(10000)
                .mergeMap(response => {
                    LOG(response, 'Success')
                    return requestAuthorisation(response)
                        .mergeMap(() => Observable.of(requestAuthorisationSuccess()))
                })
                .catch(error => {
                    LOG(error, 'AuthEpic')
                    return Observable.of(requestAuthorisationFail())
                })
        })

const requestAuthorisationSuccess = () => ({
    type: Actions.AUTHORISATION_SUCCESS
})

const requestAuthorisationFail = () => ({
    type: Actions.AUTHORISATION_FAIL,
    payload: {
        error: 'Вход не осуществлён'
    }
})

const requestAuthorisation = (response) => {
    return Observable.create(observer => {
        AsyncStorage.multiSet([
            ['accessToken', response.accessToken],
            ['refreshToken', response.refreshToken],
            ['judgeID', `${response.judgeID}`],
            ['fullName', response.fullName]
        ], errors => {
            if (errors !== null) {
                observer.error(errors)
            }
            else {
                LOG('сomplete', 'observer')
                observer.next()
                observer.complete()
            }
        })
    })
}