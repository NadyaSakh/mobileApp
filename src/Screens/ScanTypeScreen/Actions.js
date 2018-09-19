import { Observable } from 'rxjs/Rx'
import { LOG } from '../../Utils/logger'
import { AsyncStorage } from 'react-native'

export const Actions = {
    LOADING_PARTICIPANT_INFO: 'LOADING_PARTICIPANT_INFO',
    LOADING_SUCCESS: 'LOADING_SUCCESS',
    LOADING_FAIL: 'LOADING_FAIL',
    SAVE_EVENT: 'SAVE_EVENT',
    SAVE_EVENT_SUCCESS: 'SAVE_EVENT_SUCCESS',
    SAVE_EVENT_FAIL: 'SAVE_EVENT_FAIL'
}

export const getParticipantInfoAction = (tagId) => ({
    type: Actions.LOADING_PARTICIPANT_INFO,
    payload: {
        tagId: tagId
    }
})

export const getParticipantInfoEpic = action$ =>
    action$.ofType(Actions.LOADING_PARTICIPANT_INFO)
    // .mergeMap(action => {
    //     return getNFCAndIdLinks(action.payload.tagId)
    // })
    // .map((participantId) => {
        .mergeMap(action => {
            return getParticipantInfo(action.payload.tagId) //participantId
        })
        .mergeMap(data => Observable.of(requestParticipantInfoSuccess(data)))
        .catch(error => {
            LOG(error, 'GetParticipantEpicFail')
            return Observable.of(requestParticipantInfoFail())
        })


const requestParticipantInfoSuccess = participant => ({
    type: Actions.LOADING_SUCCESS,
    payload: {
        participant
    }
})

const requestParticipantInfoFail = () => ({
    type: Actions.LOADING_FAIL,
    payload: {
        error: 'Данные участника не загружены!'
    }
})

// Получение меток с базы
const getNFCAndIdLinks = tagId => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetitionNFC',
            (errors, tags) => {
                if (errors !== null) {
                    LOG(errors, 'NFC метки не получены!')
                    observer.next()
                }
                else {
                    let parsedTags = JSON.parse(tags)
                    LOG(parsedTags)

                    let participantId = ''
                    parsedTags.forEach(tag => {
                        if (tag.tagId === tagId) {
                            participantId = tag.participantId
                            LOG(participantId, 'Айди отсканированного участника:')
                        }
                    })
                    observer.next(participantId)
                }
                observer.complete()
            })
    })
}

const getParticipantInfo = participantId => {
    return Observable.create(observer => {
        AsyncStorage.getItem('currentCompetitionParticipants',
            (errors, participants) => {
                if (errors !== null) {
                    LOG(errors, 'Участники не получены!')
                    observer.next()
                }
                else {
                    let parsedParticipants = JSON.parse(participants)
                    LOG(parsedParticipants)

                    let data = {}
                    parsedParticipants.forEach(participant => {
                        if (participant.id === participantId) {
                            data = {
                                id: participant.id,
                                name: participant.name,
                                surname: participant.surname,
                                fatherName: participant.fatherName,
                                vehicleType: participant.vehicleType,
                                racingMastery: participant.racingMastery
                            }
                            LOG(data, 'Данные по участнику:')
                        }
                    })
                    observer.next(data)
                }
                observer.complete()
            })
    })
}

export const saveEventAction = data => ({
    type: Actions.SAVE_EVENT,
    payload: {
        data: data
    }
})

export const saveEventEpic = action$ => // добавить
    action$.ofType(Actions.SAVE_EVENT)
        .mergeMap(action => {
            return saveEvent(action.payload.data) //participantId
        })
        .mergeMap(() => Observable.of(savingEventSuccess()))
        .catch(error => {
            LOG(error, 'SaveEventEpicFail')
            return Observable.of(savingEventFail())
        })

const savingEventSuccess = () => ({
    type: Actions.SAVE_EVENT_SUCCESS
})

const savingEventFail = () => ({
    type: Actions.SAVE_EVENT_FAIL,
    payload: {
        error: 'Событие не сохранено!'
    }
})

const saveEvent = data => {
    return Observable.create(observer => {
        LOG('saveEvent', 'HERE!')
        AsyncStorage.setItem('Events', JSON.stringify(data), error => {
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
