import React from 'react'
import {
    View,
    FlatList
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'

export const ListItem = props => {
    ListItem.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        name: PropTypes.string,
        surname: PropTypes.string,
        fatherName: PropTypes.string,
        level: PropTypes.string,
        vehicle: PropTypes.string,
        phone: PropTypes.string
    }
    return <View>
        <SingleLineText
            style={styles.boldStyle}
            text={`${props.surname} ${props.name} ${props.fatherName}`}/>
        <SingleLineText
            style={props.style}
            text={`Уровень участника: ${props.level}`}/>
        <SingleLineText
            style={props.style}
            text={`Телефон: ${props.phone}`}/>
        <SingleLineText
            style={props.style}
            text={`Транспортноне средство: ${props.vehicle}`}/>
    </View>
}

export const ParticipantsList = props => {
    ParticipantsList.propTypes = {
        participantsList: PropTypes.array,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    }
    return <FlatList
        data={props.participantsList}
        renderItem={({item}) => {
            return (
                <ListItem
                    style={props.style}
                    name={item.name}
                    surname={item.surname}
                    fatherName={item.fatherName}
                    level={item.racingMastery}
                    vehicle={item.vehicleType}
                    phone={item.phone}
                />
            )
        }}
        keyExtractor={(item, index) => index.toString()}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <SingleLineText
            text={props.text}
            style={styles.textStyle}
        />
        <LoadingIndicator/>
    </View>
}


export const ContentView = props => {
    ContentView.propTypes = {
        participants: PropTypes.array,
        quantity: PropTypes.string
    }

    return <View>
        <SingleLineText
            text={`Всего участников: ${props.quantity}`}
            style={styles.textStyle}
        />
        <ParticipantsList
            participantsList={props.participants}
            style={styles.textStyle}
        />
    </View>
}