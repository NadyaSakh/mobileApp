import React from 'react'
import {
    View,
    // Button,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { styles } from '../../Components/Styles'

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
        onPrevScanPress: PropTypes.func
    }

    return <View>
        <Info
            text={'Меню'}
            style={styles.textStyle}
        />
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={props.onPrevScanPress}
        >
            <Text style={styles.buttonText}> Предварительное сканирование </Text>
        </TouchableOpacity>
        {/*<Button*/}
        {/*onPress={props.onPrevScanPress}*/}
        {/*title='Предварительное сканирование'*/}
        {/*/>*/}
    </View>
}
