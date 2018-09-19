import React from 'react'
import {
    View
} from 'react-native'
import PropTypes from 'prop-types'

import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { Strings } from '../../Strings'
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
            style={styles.loadingStyle}
        />
        <LoadingIndicator/>
    </View>
}

export const ContentView = props => {
    ContentView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        data: PropTypes.array,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        competitionExists: PropTypes.bool
    }

    let screenText = props.competitionExists ?
        Strings.CURRENT_COMPETITION_EXISTS :
        Strings.CURRENT_COMPETITION_NOT_EXISTS

    return <Info
        text={screenText}
        style={styles.textStyle}
    />
}