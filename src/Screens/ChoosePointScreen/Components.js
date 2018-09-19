import React from 'react'
import {
    View,
    // Button,
    Alert,
    TouchableOpacity,
    FlatList,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'
import { LOG } from '../../Utils/logger'

export const ListItem = props => {
    ListItem.propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        point: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    }
    return <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
            LOG('0')
            props.onPress ?
                props.onPress(props.point) :
                Alert.alert('Внимание!', 'Обработчик нажатия не назначен')
        }}>
        <SingleLineText
            style={props.style}
            text={props.point.name}/>
    </TouchableOpacity>
}

export const PointsList = props => {
    PointsList.propTypes = {
        pointsList: PropTypes.array,
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    return <FlatList
        data={props.pointsList}
        renderItem={({item}) => {
            return (
                <ListItem
                    onPress={props.onPress}
                    style={props.style}
                    point={{id: item.id, name: item.name}}
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
        competitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        points: PropTypes.array,
        day: PropTypes.string,
        isChecked: PropTypes.bool,
        yourPoint: PropTypes.string,
        onPress: PropTypes.func
    }

    let text = (props.isChecked ? `Ваш пункт "${props.yourPoint}"` : 'Выберите свой пункт:')

    return <View>
        <SingleLineText
            text={`Гонка "${props.competitionName}"`}
            style={styles.textStyle}
        />
        <SingleLineText
            text={`Сегодня: ${props.day}`}
            style={styles.textStyle}
        />
        <SingleLineText
            text={text}
            style={styles.textStyle}
        />
        <PointsList
            pointsList={props.points}
            onPress={props.onPress}
            style={styles.item}
        />
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={props.onChange}
            >
                <Text style={styles.buttonText}> Изменить пункт </Text>
            </TouchableOpacity>
        </View>
    </View>
}