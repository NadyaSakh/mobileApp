import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    View,
    TextInput,
    // Button,
    TouchableOpacity,
    Text
} from 'react-native'

import { styles } from '../../Components/Styles'
import { ActionContainer } from '../../Components/ActionContainer'
import { LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { signInAction } from './Actions'

const mapStateToProps = state => ({...state.authReducer})

const mapDispatchToProps = dispatch => ({
    signIn: (login, password) => dispatch(signInAction(login, password))
})


export class AuthScreen extends React.Component {
    static propTypes = {
        componentState: PropTypes.string.isRequired,
        navigateTo: PropTypes.string,
        signIn: PropTypes.func,
        navigation: PropTypes.object
    }


    state = {
        login: '',
        password: ''
    }

    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.focusTextInput = this.focusTextInput.bind(this)
    }

    //Для перехода на другой экран
    componentDidUpdate = prevProps => {
        if (this.props.navigateTo !== prevProps.navigateTo) {
            this.props.navigation.navigate(this.props.navigateTo)
        }
    }

    focusTextInput() {
        this.textInput.current.focus()
    }

    onSubmit = () => {
        this.props.signIn(this.state.login, this.state.password)
    }

    render = () => {
        return <View style={styles.container}>
            <Text> Включите интернет для авторизации </Text>
            <TextInput
                style={styles.textInput}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={this.focusTextInput}
                placeholder='Введите логин'
                onChangeText={(text) => this.setState({login: text})}/>
            <TextInput
                style={styles.textInput}
                ref={this.textInput}
                onSubmitEditing={this.onSubmit}
                placeholder='Введите пароль'
                onChangeText={(text) => this.setState({password: text})}/>
            <ActionContainer
                componentState={this.props.componentState}
                contentView={
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.onSubmit}
                        disabled={this.state.login.length === 0 && this.state.password.length === 0}
                    >
                        <Text style={styles.buttonText}> Войти </Text>
                    </TouchableOpacity>
                }
                errorVisibility={false}
                errorView={
                    <ErrorView
                        text='Ошибка авторизации.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Авторизация. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}


// <Button
// onPress={this.onSubmit}
// disabled={this.state.login.length === 0 && this.state.password.length === 0}
// title='Войти'/>
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)