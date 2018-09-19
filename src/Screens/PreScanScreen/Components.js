import React from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'


export const ListItem = props => {
    ListItem.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        tag: PropTypes.string

    }
    return <View>
        <SingleLineText
            style={styles.boldStyle}
            text={`Тег: ${props.tag}`}/>
    </View>
}

export const TagsList = props => {
    TagsList.propTypes = {
        tags: PropTypes.array,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    }
    return <FlatList
        data={props.tags}
        renderItem={({item}) => {
            return (
                <ListItem
                    style={props.style}
                    tag={item}
                />
            )
        }}
        keyExtractor={(item, index) => index.toString()}
    />
}


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
        tags: PropTypes.array,
        onPress: PropTypes.func,
        message: PropTypes.string
    }
    let sendStatus = ''
    if (props.message) {
        sendStatus = props.message
    }
    else {
        sendStatus = 'Ожидание отправки...'
    }

    return <View>
        <Info
            text={'Для сканирования включите NFC и поднесите NFC метку к телефону.'}
            style={styles.boldStyle}
        />
        <Info
            text={'Отсканированные метки:'}
            style={styles.textStyle}
        />
        <TagsList
            tags={props.tags}
            style={styles.textStyle}
        />
        <Info
            text={`Статус отправки: ${sendStatus}`}
            style={styles.textStyle}
        />
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}> Отправить метки </Text>
            </TouchableOpacity>
        </View>
    </View>
}
