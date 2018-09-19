import React from 'react'
import {
    ActivityIndicator,
    StatusBar,
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { checkAuthAction } from './Actions'
import { styles } from '../../Components/Styles'

const mapStateToProps = state => ({...state.splashScreenReducer})

const mapDispatchToProps = dispatch => ({
    checkAction: () => dispatch(checkAuthAction())
})


export class SplashScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
        navigateTo: PropTypes.string,
        checkAction: PropTypes.func
    }

    componentDidUpdate = prevProps => {
        if (this.props.navigateTo !== prevProps.navigateTo) {
            this.props.navigation.navigate(this.props.navigateTo)
        }
    }

    componentDidMount = () => {
        this.props.checkAction()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Загрузка приложения</Text>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)