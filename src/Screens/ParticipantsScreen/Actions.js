import { LOG } from '../../Utils/logger'
import { Observable } from 'rxjs/Rx'
import { AsyncStorage } from 'react-native'

export const Actions = {
    SHOW_PARTICIPANTS: 'SHOW_PARTICIPANTS',
    GET_PARTICIPANTS: 'GET_PARTICIPANTS',
    GET_PARTICIPANTS_SUCCESS: 'GET_PARTICIPANTS_SUCCESS',
    GET_PARTICIPANTS_FAIL: 'GET_PARTICIPANTS_FAIL'
}

export const getParticipantsAction = () => ({
    type: Actions.GET_PARTICIPANTS
})

export const getParticipantsEpic = action$ =>
    action$.ofType(Actions.GET_PARTICIPANTS)
        .mergeMap(() => {
            return Observable.zip(
                getParticipants(),
                getQuantity(),
                (participants, quantity) => ({participants, quantity})
            )
        })
        .mergeMap(data => {
            LOG(data, 'Участники и количество: ')
            return Observable.of(getParticipantsSuccessAction(data.participants, data.quantity))
        })


const getParticipantsSuccessAction = (participantsList, quantity) => ({
    type: Actions.GET_PARTICIPANTS_SUCCESS,
    payload: {
        participantsList,
        quantity: quantity
    }
})

const getParticipants = () => {
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
                    observer.next(parsedParticipants)
                }
                observer.complete()
            })
    })
}

const getQuantity = () => {
    return Observable.create(observer => {
        AsyncStorage.getItem('participantsQuantity',
            (errors, participantsNumber) => {
                if (errors !== null) {
                    LOG(errors, 'Число участников не получено!')
                    observer.next()
                }
                else {
                    observer.next(participantsNumber)
                }
                observer.complete()
            })
    })
}

