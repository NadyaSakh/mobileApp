import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
import {
    Alert
} from 'react-native'


export const Actions = {
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL'
}

export const requestCompetitionAction = () => ({
    type: Actions.REQUEST_COMPETITION,
    payload: {}
})

export const requestCompetitionEpic = action$ =>
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(() => {
            LOG('I HERE', 'RESPONSE')
            // return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/1')
            return ajax.getJSON('http://my-json-server.typicode.com/NadyaSakh/Weather-app1/currentCompetition')
                .timeout(5000)
                .map(response => {
                    if (response) {
                        return requestCompetitionSuccess(response.name)
                    }
                    else {
                        return requestCompetitionFail()
                    }
                })
                .catch(error => {
                    LOG(error, 'requestCompetitionEpic')
                    return Observable.of(requestCompetitionFail())
                })
        })

const requestCompetitionSuccess = (competitionName) => ({
    type: Actions.REQUEST_COMPETITION_SUCCESS,
    payload: {
        competitionName
    }
})

const requestCompetitionFail = () => ({
    type: Actions.REQUEST_COMPETITION_FAIL,
    payload: {
        error: 'Соревнования не загружены'
    }
})

export const onCompetitionPress = () => {
    return Alert.alert('Вы нажали', 'на соревнование')
}
