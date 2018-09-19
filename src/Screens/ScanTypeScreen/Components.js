import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'
import { LOG } from '../../Utils/logger'

export const Info = props => {
    Info.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }
    return <SingleLineText
        text={props.text}
        style={props.style}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <Info
            text={props.text}
            style={styles.textStyle}
        />
        <LoadingIndicator/>
    </View>
}

export const ContentView = props => {
    ContentView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        pointId: PropTypes.string,
        participantInfo: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            surname: PropTypes.string,
            fatherName: PropTypes.string,
            vehicleType: PropTypes.string,
            racingMastery: PropTypes.string
        }),
        onArrivalPress: PropTypes.func,
        onDeparturePress: PropTypes.func,
        onCancelPress: PropTypes.func,
        onSavePress: PropTypes.func,
        tag: PropTypes.string,
        eventType: PropTypes.string
    }
    let eventType = ''
    if (props.eventType === 'arrival') {
        eventType = 'Приезд'
    }
    else if (props.eventType === 'departure') {
        eventType = 'Отъезд'
    }
    else {
        eventType = 'Не назначен'
    }

    let eventId = 0
    return <View>
        <Info
            text={'Участник: '}
            style={styles.boldStyle}
        />
        <Info
            text={`${props.participantInfo.name} ${props.participantInfo.fatherName} ${props.participantInfo.surname}`}
            style={styles.textStyle}
        />
        <Info
            text={` NFC тег: ${props.tag}`}
            style={styles.textStyle}
        />
        <Info
            text={` Уровень: ${props.participantInfo.racingMastery}`}
            style={styles.textStyle}
        />
        <Info
            text={`Тип транспорта: ${props.participantInfo.vehicleType}`}
            style={styles.textStyle}
        />
        <Info
            text={`Тип события: ${eventType}`}
            style={styles.boldStyle}
        />
        <Info
            text={'Выберите тип события: '}
            style={styles.boldStyle}
        />
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonBorderStyle}
                onPress={props.onArrivalPress}
            >
                <Text style={styles.buttonText}> Приезд </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonBorderStyle}
                onPress={props.onDeparturePress}
            >
                <Text style={styles.buttonText}> Отъезд </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={styles.buttonGreyStyle}
                    onPress={props.onCancelPress}
                >
                    <Text style={styles.buttonText}> Отмена </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonBorderStyle}
                    onPress={() => {
                        if (props.eventType === '') {
                            Alert.alert('Внимание!', 'Выберите тип события')
                        }
                        else {
                            LOG('0')
                            eventId = eventId + 1
                            let currentTime = getTime()
                            let currentDate = getCurrentDay()

                            let event = {
                                eventId: eventId,
                                eventType: props.eventType,
                                tag: props.tag,
                                participantId: props.participantInfo.id,
                                time: currentTime,
                                date: currentDate,
                                pointNumber: props.pointId,
                                sendStatus: 'NOT_SENDED'
                            }

                            LOG(event, 'СОБЫТИЕ: ')
                            props.onSavePress ?
                                props.onSavePress(event) :
                                Alert.alert('Внимание!', 'Обработчик нажатия не назначен')
                        }
                    }}
                >
                    <Text style={styles.buttonText}> Сохранить </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const getCurrentDay = () => {
    let dateString = ''
    let newDate = new Date()

    dateString += newDate.getFullYear() + '-'
    dateString += `0${newDate.getMonth() + 1}`.slice(-2) + '-'
    dateString += newDate.getDate()
    return dateString
}

const getTime = () => {
    let timeString = ''
    let newDate = new Date()

    timeString += `0${newDate.getHours()}`.slice(-2) + ':'
    timeString += `0${newDate.getMinutes()}`.slice(-2) + ':'
    timeString += `0${newDate.getSeconds()}`.slice(-2)

    return timeString
}