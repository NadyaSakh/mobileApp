import React from 'react'
import {
    Text,
    View,
    Button
} from 'react-native'
import PropTypes from 'prop-types'
import { LOG } from '../Utils/logger'

export const ErrorView = props => {
    ErrorView.propTypes = {
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    }

    return <View>
        <Text> {props.text}</Text>
    </View>
}