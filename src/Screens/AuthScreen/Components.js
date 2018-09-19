import React from 'react'
import {
    View
} from 'react-native'
import PropTypes from 'prop-types'

import { SingleLineText } from '../../Components/SingleLineText'
import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { styles } from '../../Components/Styles'

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