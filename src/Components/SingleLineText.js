import React from 'react'
import {
    Text
} from 'react-native'
import PropTypes from 'prop-types'

export const SingleLineText = props => {
    SingleLineText.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }
    return <Text style={props.style}>{props.text}</Text>
}