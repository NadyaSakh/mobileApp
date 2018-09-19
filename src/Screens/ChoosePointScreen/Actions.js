import { LOG } from '../../Utils/logger'
import { Observable } from 'rxjs/Rx'
import { AsyncStorage } from 'react-native'

export const Actions = {
    GETTING_COMPETITION_NAME: 'GETTING_COMPETITION_NAME',
    GETTING_COMPETITION_NAME_SUCCESS: 'GETTING_COMPETITION_NAME_SUCCESS',
    GETTING_CURRENT_DAY_POINTS: 'GETTING_CURRENT_DAY_POINTS',
    GETTING_POINTS_SUCCESS: 'GETTING_POINTS_SUCCESS',
    GETTING_POINTS_ERROR: 'GETTING_POINTS_ERROR'
}

export const getCompNameAction = () => ({
    type: Actions.GETTING_COMPETITION_NAME
})

export const getCompNameEpic = action$ =>
    action$.ofType(Actions.GETTING_COMPETITION_NAME)
        .mergeMap(() =>
            getCompName()
        )
        .mergeMap(competitionName => {
            LOG(competitionName, 'Название текущего соревнования')
            return Observable.of(gettingCompetitionNameSuccess(competitionName))
        })

export const getPointsAction = () => ({
    type: Actions.GETTING_CURRENT_DAY_POINTS
})

export const getPointsEpic = action$ =>
    action$.ofType(Actions.GETTING_CURRENT_DAY_POINTS)
        .mergeMap(() => {
            return requestDaysAndPoints()
        })
        .mergeMap(currentDayPoints => {
            LOG(currentDayPoints, 'Список пунктов текущего дня')
            return Observable.of(gettingPointsSuccess(currentDayPoints))
        })
        .catch(error => {
            LOG(error, 'requestPointsEpic')
            return Observable.of(requestPointsFail())
        })

const requestPointsFail = () => ({
    type: Actions.GETTING_POINTS_ERROR,
    payload: {
        error: 'Пункты не загружены.'
    }
})

const getCompName = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetition',
            (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionName')
                    observer.next()
                }
                else {
                    let parsedCompetition = JSON.parse(currentCompetition)
                    let compName = parsedCompetition.name
                    LOG(compName, 'Название соревнования')
                    observer.next(compName)
                }
                observer.complete()
            })
    })
}

export const requestDaysAndPoints = () => {
    LOG('requestDaysAndPointsEpic', 'HERE!')
    return Observable.zip(
        getCurrentDayId(),
        getCurrentCompetitionPoints(),
        (id, points) => ({id, points})
    )
        .mergeMap(data => {
            LOG(data, 'Айди и пункты:')
            // Функция, которая возвращает пункты текущего дня
            return findCurrentDayPoints(data.id, data.points)
        })
}

const gettingPointsSuccess = (currentPoints) => ({
    type: Actions.GETTING_POINTS_SUCCESS,
    payload: {
        currentPoints
    }
})

const gettingCompetitionNameSuccess = (competitionName) => ({
    type: Actions.GETTING_COMPETITION_NAME_SUCCESS,
    payload: {
        competitionName
    }
})

const getCurrentDayId = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetitionDays',
            (errors, allDays) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionDays')
                    observer.next()
                }
                else {
                    let parsedDays = JSON.parse(allDays)
                    LOG(parsedDays, 'Дни')


                    let currentDayId = ''
                    // найти айди текущего дня
                    let currDay = getCurrentDay()
                    parsedDays.forEach(day => {
                        if (day.date === currDay) {
                            currentDayId = day.id
                            LOG(currentDayId, 'Айди текущего дня:')
                        }
                    })
                    //А что, если ошибка какая-нибудь? или день не нашёлся?
                    observer.next(currentDayId)
                }
                observer.complete()
            })
    })
}

const getCurrentCompetitionPoints = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetitionPoints',
            (errors, allPoints) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionPoints')
                    observer.next()
                }
                else {
                    let parsedPoints = JSON.parse(allPoints)
                    LOG(parsedPoints, 'Распарсенные пункты:')
                    observer.next(parsedPoints)
                }
                observer.complete()
            })
    })
}

const getCurrentDay = () => {
    // let dateString = ''
    // let newDate = new Date()
    //
    // dateString += newDate.getFullYear() + '-'
    // dateString += `0${newDate.getMonth() + 1}`.slice(-2) + '-'
    // dateString += newDate.getDate()
    // return dateString


    //Так как нет дней в текущем соревновании ,то я возвращаю фейковый день
    // для поиска дня среди соревновательных дней
    return '2018-01-15'
}

//Доделать
const findCurrentDayPoints = (dayId, allPoints) => {

    let currentDayPoints = []
    allPoints.forEach(point => {
        if (point.competitionDayId === dayId) {
            currentDayPoints.push(point)
        }
    })

    return Observable.of(currentDayPoints)
}