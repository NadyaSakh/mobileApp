import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { LOG } from '../../Utils/logger'
import { AsyncStorage } from 'react-native'

export const Actions = {
    REQUEST_COMPETITION: 'REQUEST_COMPETITION',
    REQUEST_COMPETITION_SUCCESS: 'REQUEST_COMPETITION_SUCCESS',
    REQUEST_COMPETITION_FAIL: 'REQUEST_COMPETITION_FAIL',
    REQUEST_DAYS_PARTICIPANTS_FAIL: 'REQUEST_COMPETITION_FAIL',
    REQUEST_POINTS_FAIL: 'REQUEST_POINTS_FAIL'
}

export const requestCompetitionAction = () => ({
    type: Actions.REQUEST_COMPETITION
})

export const requestCompetitionEpic = action$ =>
    action$.ofType(Actions.REQUEST_COMPETITION)
        .mergeMap(() => {
            // Получение текущего соревнования:
            // return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/current')
            return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/competitions/1')
            // return ajax.getJSON('http://my-json-server.typicode.com/NadyaSakh/Weather-app1/currentCompetition/')

                .timeout(5000)
                .mergeMap(response => {
                    LOG(response, 'Получен ответ')
                    if (response) {
                        return saveCompetition(response)
                        //получить айди текущего соревнования
                            .mergeMap(() => getCurrentCompetitionId())
                            .mergeMap(id => requestDaysAndParticipants(id))//получить дни и участников
                            .mergeMap(() => Observable.of(
                                requestCompetitionSuccessAction(true))
                            )
                    }
                    else {
                        return Observable.of(requestCompetitionSuccessAction(false))//Нет соревнования
                    }
                })
                .catch(error => {
                    LOG(error, 'requestCompetitionEpic')
                    return Observable.of(requestCompetitionFail())
                })
        })

export const requestDaysAndParticipants = id => {
    // Получение дней и участников текущего соревнования
    LOG('requestDaysAndParticipantsEpic', 'HERE!')
    return Observable.zip(
        getDaysAndPoints(id),
        getParticipantsList(),
        // getNFCandIds(),
        (daysAndPoints, participantsAndNumber) => ({daysAndPoints, participantsAndNumber}) // Добавить data.NFC
    )
        .mergeMap(data => {
            LOG(data)
            //Сохранение дней и участников текущего соревнования
            return Observable.zip(
                saveCurrentCompetitionParticipants(data.participantsAndNumber.participants,
                    data.participantsAndNumber.quantity),
                saveCurrentCompetitionPoints(data.daysAndPoints.points),
                saveCurrentCompetitionDays(data.daysAndPoints.days),
                // saveNFCAndIds(data.NFC),
                () => {
                }
            )
        })
        .catch(error => {
            LOG(error, 'requestDaysAndPointsError')
            return Observable.of(requestCompetitionFail())//Здесь доделать фэил
        })
}

export const getCurrentCompetitionId = () => {
    return Observable.create(observer => {
        LOG('getCurrentCompetitionId', 'HERE!')
        AsyncStorage.getItem('currentCompetition',
            (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionId')
                    observer.next(false)
                }
                else {
                    let parsedCompetition = JSON.parse(currentCompetition)
                    LOG(parsedCompetition, 'observer')
                    observer.next(parsedCompetition.id)
                }
                observer.complete()
            })
    })
}

const saveCurrentCompetitionDays = response => {
    return Observable.create(observer => {
        LOG('saveCurrentCompetitionDays', 'HERE!')
        AsyncStorage.setItem('currentCompetitionDays', JSON.stringify(response), error => {
            if (error !== null) {
                observer.error(error)
            }
            else {
                observer.next()
                observer.complete()
            }
        })
    })
}

const saveCurrentCompetitionParticipants = (response, count) => {
    return Observable.create(observer => {
        LOG('saveCurrentCompetitionParticipants', 'HERE!')
        AsyncStorage.multiSet([
            ['currentCompetitionParticipants', JSON.stringify(response)],
            ['participantsQuantity', `${count}`]
        ], errors => {
            if (errors !== null) {
                observer.error(errors)
            }
            else {
                LOG('сompleteSavingParticipants!', 'observer')
                observer.next()
                observer.complete()
            }
        })
    })
}

const saveCurrentCompetitionPoints = response => {
    return Observable.create(observer => {
        LOG('saveCurrentCompetitionPoints', 'HERE!')
        AsyncStorage.setItem('currentCompetitionPoints', JSON.stringify(response), error => {
            if (error !== null) {
                observer.error(error)
            }
            else {
                observer.next()
                observer.complete()
            }
        })
    })
}

const getDaysAndPoints = id => {
    LOG(id, 'id: ')
    return ajax.getJSON(`https://afternoon-woodland-86438.herokuapp.com/days/list?competitionId=${id}`)
        .timeout(5000)
        .mergeMap(response => {//Можно вынести в функцию ParserPointsAndDays
            let days = []
            let points = []
            if (response) {
                response.content.forEach(dayWithPoints => {
                    let day = {
                        ...dayWithPoints,
                        pointList: []
                    }
                    days.push(day)
                })
                // response.content.forEach(dayWithPoints => {
                //     points.push(dayWithPoints.pointList)
                // })
                response.content.forEach(dayWithPoints => {
                    dayWithPoints.pointList.forEach(point => {
                        points.push(point)
                    })
                })

                LOG(days, 'Дни')
                LOG(points, 'Пункты')
                return Observable.of({days, points})
            }
        })
    // .catch(error => {
    //     LOG(error, 'requestDaysAndPointsError')
    //     return Observable.of(requestCompetitionFail())//Здесь доделать фэил дней
    // })
}

const getParticipantsList = () => {
    return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/participants/list?page=0&size=0&competitionId=1&status=accepted')
        .timeout(5000)
        .mergeMap(response => {
            LOG(response.content, 'Участники: ')
            let participants = response.content
            let quantity = response.numberOfElements
            return Observable.of({participants, quantity})
        })
        .catch(error => {
            LOG(error, 'requestParticipantsError')
            return Observable.of(requestCompetitionFail())//Здесь доделать фэил участников
        })
}

const requestCompetitionSuccessAction = (competitionExists) => ({
    type: Actions.REQUEST_COMPETITION_SUCCESS,
    payload: {
        competitionExists
    }
})

const requestCompetitionFail = () => ({
    type: Actions.REQUEST_COMPETITION_FAIL,
    payload: {
        error: 'Соревнования не загружены.'
    }
})


const saveCompetition = response => {
    return Observable.create(observer => {
        AsyncStorage.setItem('currentCompetition', JSON.stringify(response), error => {
            if (error !== null) {
                observer.error(error)
            }
            else {
                observer.next()
                observer.complete()
            }
        })
    })
}

// const getNFCandIds = () => {
//     return ajax.getJSON('https://afternoon-woodland-86438.herokuapp.com/participants/list?page=0&size=0&competitionId=1&status=accepted')
//         .timeout(5000)
//         .mergeMap(response => {
//             LOG(response, 'Таблица связей NFC & Ids: ')
//             return Observable.of(response)
//         })
//     // .catch(error => {
//     //     LOG(error, 'requestNFCError')
//     //     return Observable.of(requestCompetitionFail())//Здесь доделать фэил дней
//     // })
// }
//
// const saveNFCAndIds = responce => {
//     return Observable.create(observer => {
//         LOG('saveCurrentCompetitionNFC', 'HERE!')
//         AsyncStorage.setItem('currentCompetitionNFC', JSON.stringify(responce), error => {
//             if (error !== null) {
//                 observer.error(error)
//             }
//             else {
//                 observer.next()
//                 observer.complete()
//             }
//         })
//     })
// }

