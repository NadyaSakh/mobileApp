
import { LOG } from '../../Utils/logger'
import { Observable } from 'rxjs/Rx'
import { AsyncStorage } from 'react-native'

export const Actions = {
    CHECK_SCAN_AVAILABILITY: 'CHECK_SCAN_AVAILABILITY',
    SCAN_DISABLE: 'SCAN_DISABLE',
    POINT_SELECTED: 'POINT_SELECTED',
    POINT_NOT_SELECTED: 'POINT_NOT_SELECTED',
    // SAVING_EVENT: 'SAVING_EVENT',
    // SAVING_EVENT_SUCCESS: 'SAVING_EVENT_SUCCESS'
}

//экшен на выбор пункта selectedPoint
export const choosePointAction = chosenPoint => ({
    type: Actions.POINT_SELECTED,
    payload: {chosenPoint}
})

//Экшены на доступность сканирования scanState:
export const checkScanAvailabilityAction = () => ({
    type: Actions.CHECK_SCAN_AVAILABILITY
})

export const checkScanAvailabilityEpic = action$ =>
    action$.ofType(Actions.CHECK_SCAN_AVAILABILITY)
        .mergeMap(() =>
            Observable.zip(
                getCurrentCompetition(),
                getCurrentDayCompetitionTime(),
                (dates, times) => ({dates, times})
            )
        )
        .map(data => {
            // LOG(data.dates, 'ДАННЫЕ по ДАТАМ:')
            // LOG(data.times, 'ДАННЫЕ по ВРЕМЕНИ:')
            return checkScanEnable(data.dates, data.times)
        })
        .mergeMap(scanAvailability => {
            LOG(scanAvailability, 'Сканирование доступно? ')
            let res = null
            scanAvailability ?
                res = Observable.of(scanPointEnableAction()) :
                res = Observable.of(scanPointDisableAction())
                LOG(res)
            return res
        })
        .catch(error => {
            LOG(error, 'checkScanAvailabilityError')
            // return Observable.of(requestCompetitionFail())//Здесь доделать фэил
        })

const scanPointEnableAction = () => ({
    type: Actions.POINT_NOT_SELECTED
})

const scanPointDisableAction = () => ({
    type: Actions.SCAN_DISABLE
})

const getCurrentDayCompetitionTime = () => {
    //запросить соревновательные дни
    // сверить с текущей датой
    // выбрать нужный день и вернуть его время начала и конца объектом
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

                    let timeStart = ''
                    let timeFinish = ''
                    // найти время начала и конца текущего дня
                    // РАСКОМЕНТИРОВАТЬ ТЕКУЩИЙ ДЕНЬ!
                    // let currDay = getCurrentDay()
                    const currDay = '2018-01-15'
                    parsedDays.forEach(day => {
                        if (day.date === currDay) {
                            timeStart = day.timeStart
                            timeFinish = day.timeFinish
                            LOG(timeStart, 'Время начала текущего дня:')
                        }
                    })
                    //А что, если день не нашёлся?
                    observer.next({timeStart: timeStart, timeFinish: timeFinish})
                }
                observer.complete()
            })
    })
}

const getCurrentCompetition = () => {
    // Вернуть даты начала и конца соревнования объектом
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetition',
            (errors, currentCompetition) => {
                if (errors !== null) {
                    LOG(errors, 'observerCompetitionName')
                    observer.next()
                }
                else {
                    let parsedCompetition = JSON.parse(currentCompetition)
                    let compStartDate = parsedCompetition.dateStart
                    let compEndDate = parsedCompetition.dateFinish
                    LOG(compStartDate, 'Начало соревнования: ')
                    observer.next({compStartDate: compStartDate, compEndDate: compEndDate})
                }
                observer.complete()
            })
    })
}

const checkScanEnable = (dates, times) => {
    //Вернуть bool можно ли сканировать?
    const currentDate = getCurrentDay()
    const currentTime = getTime()

    LOG(currentDate, 'currentDate')
    // LOG(currentTime, 'currentTime')
    // LOG(dates.compStartDate, 'DateBegin')
    // LOG(dates.compEndDate, 'DateFinish')
    // LOG(times.timeStart, 'TimeStart')
    // LOG(times.timeFinish, 'TimeFinish')

    // let dayRes = (currentDate >= dates.compStartDate && currentDate <= dates.compEndDate)
    // let timeRes = (currentTime >=times.timeStart && currentTime <= times.timeFinish)
    //Пока так делаю, чтобы можно было сканирование делать,
    // Потом раскоментить предыдущую строку
    let timeRes = (currentTime >= times.timeStart && currentTime <= '22:00:00') // НАДО СДЕЛАТЬ, ЧТОБЫ ВСЕГДА БЫЛ НОЛЬ ПЕРЕД ЧАСОМ
    let dayRes = (currentDate >= dates.compStartDate && currentDate <= '2018-09-20')
    let result = (dayRes && timeRes)
    LOG(dayRes, 'Сейчас можно сканировать?1')
    LOG(timeRes, 'Сейчас можно сканировать?')
    return result
}

//текущее время:
const getTime = () => {
    let timeString = ''
    let newDate = new Date()

    timeString += `0${newDate.getHours()}`.slice(-2) + ':'
    timeString += `0${newDate.getMinutes()}`.slice(-2) + ':'
    timeString += `0${newDate.getSeconds()}`.slice(-2)

    return timeString
}

const getCurrentDay = () => {
    let dateString = ''
    let newDate = new Date()

    dateString += newDate.getFullYear() + '-'
    dateString += `0${newDate.getMonth() + 1}`.slice(-2) + '-'
    dateString += `0${newDate.getDate()}`.slice(-2)
    return dateString
}

// //ЭКШН СОХРАНЕНИЯ СОБЫТИЯ В БАЗУ
// const saveEventAction = () => ({
//     type: Actions.SAVING_EVENT
// })
//
// export const saveEventEpic = action$ =>
//     action$.ofType(Actions.SAVING_EVENT)
//         .mergeMap(() => {
//             //функция сохранения события в базу
//             return Observable.of(saveEventSuccessAction())
//         })
//
// const saveEventSuccessAction = () => ({
//     type: Actions.SAVING_EVENT_SUCCESS
// })
