import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Text,
    View
} from 'react-native'
import { NavigationEvents } from 'react-navigation'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView } from './Components'
import { LOG } from '../../Utils/logger'
import NfcManager from 'react-native-nfc-manager'
import { sendTagsAction } from './Actions'
import { styles } from '../../Components/Styles'

const mapStateToProps = state => ({...state.PreScanReducer})

const mapDispatchToProps = dispatch => ({
    sendTags: (tags) => dispatch(sendTagsAction(tags))
})

export class PreScanScreen extends React.Component {
    static navigationOptions = {
        title: 'Предварительное сканирование',
        headerStyle: {
            backgroundColor: '#2080ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }

    static propTypes = {
        componentState: PropTypes.string.isRequired,
        navigateTo: PropTypes.string,
        sendTags: PropTypes.func,
        message: PropTypes.string
    }

    state = {
        tags: []
    }

    componentDidMount() {
        LOG('MOUNT_PreScanScreen', 'MOUNT')
    }

    scanNFC = () => {

        // Проверить надо ли включить NFC?
        // NfcManager.isEnabled() //Доступно ли сканирование NFC
        // NfcManager.goToNfcSetting() // переводит на включение
        NfcManager.start({
            onSessionClosedIOS: () => {
                LOG('ios session closed')
            }
        })
            .then(result => {
                LOG('start OK', result)
            })
            .catch(error => {
                LOG('device does not support nfc!', error)
                this.setState({supported: false})
            })
        // let tagI = null
        NfcManager.registerTagEvent(tag => {
            LOG(tag, 'Tag Discovered:')
            LOG(tag.id, 'Id тега: ')
            LOG(this.state)
            if (!this.state.tags.includes(tag.id)) {
                this.setState(prevState => ({
                    tags: [...prevState.tags, tag.id]
                }))
            }
        }, 'Hold your device over the tag', true)
    }

    onSend = () => {
        this.props.sendTags(this.state.tags)
        // "FD7CDEC0"
    }

    render = () => {


        return <View style={styles.container}>
            <NavigationEvents
                onDidFocus={payload => {
                    LOG(' ps did focus', payload)
                    this.scanNFC()
                }}
                onWillBlur={payload => {
                    LOG('ps will blur', payload)
                    NfcManager.unregisterTagEvent()
                    NfcManager.stop()
                }}
            />
            <ActionContainer
                componentState={this.props.componentState}
                contentView={
                    <ContentView
                        tags={this.state.tags}
                        onPress={this.onSend}
                        message={this.props.message}
                    />
                }
                errorVisibility={false}
                errorView={
                    <Text>Ошибка экрана сканирвоания</Text>
                }
                loadingView={
                    <Text>Подготтовка экрана сканирования. Пожалуйста, подождите.</Text>
                }
            />
        </View>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreScanScreen)