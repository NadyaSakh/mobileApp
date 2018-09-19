import React from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'

import { ErrorView } from '../../Components/ScreenError'
import { ContentView } from './Components'
import { LOG } from '../../Utils/logger'
import { ActionContainer } from '../../Components/ActionContainer'
import NfcManager, { NdefParser } from 'react-native-nfc-manager'
import { ScreensKeys } from '../../ScreenKey'
import { getFullNameAction } from './Actions'
import { styles } from '../../Components/Styles'
import { checkScanAvailabilityAction } from '../../Store/Scan/Actions'

export const mapStateToProps = state => ({
    ...state.ScanScreenReducer,
    ...state.ScanStoreReducer
})

export const mapDispatchToProps = dispatch => ({
    getFullName: () => dispatch(getFullNameAction()),
    checkScanAvailable: () => dispatch(checkScanAvailabilityAction())
})

export class ScanCompetition extends React.Component {
    static navigationOptions = {
        header: null
    }

    static propTypes = {
        screenState: PropTypes.string.isRequired,
        navigateTo: PropTypes.string,
        selectedPointName: PropTypes.string,
        scanState: PropTypes.string,
        fullName: PropTypes.string,
        getFullName: PropTypes.func,
        chosenPoint: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }),
        checkScanAvailable: PropTypes.func
    }

    state = {
        tag: ''
    }

    componentDidMount() {
        LOG('componentDidMount')
        this.getFullName()
        this.checkScanAvailable()
    }

    scanNFC = () => {
        NfcManager.start({
            onSessionClosedIOS: () => {
                LOG('ios session closed')
            }
        })
            .then(result => {
                LOG('start OK', result)
            })
            .catch(error => {
                LOG('device does not support nfc!')
                this.setState({supported: false})
            })

        NfcManager.registerTagEvent(tag => {
            LOG(tag, 'Tag Discovered:')
            this.setState({tag: tag.id})
            //Перейти на экран выбора типа события
            this.props.navigation.navigate(ScreensKeys.SCAN_TYPE_SCREEN, {
                tagId: tag.id,
                pointId: this.props.chosenPoint.id
            })
        }, 'Hold your device over the tag', true)
    }

    // Перейти на выбор пункта
    navigation = () => {
        this.props.navigation.navigate(ScreensKeys.POINTS)
    }
    // Получить польное имя судьи
    getFullName = () => {
        this.props.getFullName()
    }

    checkScanAvailable = () => {
        this.props.checkScanAvailable()
    }

    render = () => {
        return <View style={styles.container}>
            <NavigationEvents
                onDidFocus={payload => {
                    console.log('ss did focus', payload)
                    this.scanNFC()
                }}
                onWillBlur={payload => {
                    console.log('ss will blur', payload)
                    NfcManager.unregisterTagEvent()
                    NfcManager.stop()
                }}
            />
            <ActionContainer
                componentState={this.props.screenState}
                contentView={
                    <ContentView
                        judgeName={this.props.fullName}
                        selectedPoint={this.props.chosenPoint.name}
                        scanState={this.props.scanState}
                        description={'Текущих соревнований нет. Сканирование не доступно.'}
                        onPress={this.navigation}
                    />
                }
                loadingView={
                    <Text>Идёт проверка даты. Пожалуйста подождите.</Text>
                }
                errorView={
                    <ErrorView
                        text='Ошибка сканирования. Попробуйте ещё раз.'
                    />
                }
            />
        </View>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ScanCompetition)