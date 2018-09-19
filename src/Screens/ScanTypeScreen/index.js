import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { styles } from '../../Components/Styles'
import { LOG } from '../../Utils/logger'
import { getParticipantInfoAction, saveEventAction } from './Actions'

const mapDispatchToProps = dispatch => ({
    getParticipantsInfo: tagId => dispatch(getParticipantInfoAction(tagId)),
    saveEvent: info => dispatch(saveEventAction(info))
})

const mapStateToProps = state => ({
    ...state.ScanTypeReducer
})

export class ScanTypeScreen extends React.Component {
    static navigationOptions = {
        title: 'Выбор типа события',
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
        participant: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            surname: PropTypes.string,
            fatherName: PropTypes.string,
            vehicleType: PropTypes.string,
            racingMastery: PropTypes.string
        }),
        getParticipantsInfo: PropTypes.func,
        saveEvent: PropTypes.func
    }

    state = {
        eventType: ''
    }

    componentDidMount() {
        LOG('MOUNT_ScanTypeScreen', 'MOUNT')
        // const tagId = this.props.navigation.getParam('tagId', 'NO-ID')
        // const parsedTagId = JSON.stringify(tagId)
        this.getParticipantsInfo(11) //parsedTagId
    }

    constructor(props) {
        super(props)
    }


    // получить имя участника и его инфу по метке
    getParticipantsInfo = (tagId) => {
        this.props.getParticipantsInfo(tagId)
    }

    //  Создать событие, Сохранить событие в БД, отправить на сервер, если Интернет есть, нужен эпик
    onSaveEvent = data => {
        this.props.saveEvent(data)
    }

    // приезд
    onArrivalPress = () => {
        LOG(this.state, 'СТЕЙТ')   //  Выводит почему то старый стейт?
        this.setState({eventType: 'arrival'}) // НЕ ПОЛУЧАЕТСЯ В МАССИВ ЗАПИСАТТЬ В СТЕЙТЕ?
    }
    // отъезд
    onDeparturePress = () => {
        LOG(this.state, 'СТЕЙТ')
        this.setState({eventType: 'departure'})
    }

    onCancelPress = () => {
        //отменить выбранный тип события
        LOG(this.state, 'СТЕЙТ')
        this.setState({eventType: ''})
    }

    onSavePress = data => {
        // сохранить и выйти назад
        this.onSaveEvent(data)
        // this.props.navigation.goBack()
    }

    render = () => {
        const tagId = this.props.navigation.getParam('tagId', 'NO-ID')
        const parsedTagId = JSON.stringify(tagId)

        const pointId = this.props.navigation.getParam('pointId', 'NO-ID')
        const parsedPointId = JSON.stringify(pointId)

        return <View style={styles.container}>
            <ActionContainer
                componentState={this.props.componentState}
                contentView={
                    <ContentView
                        tag={parsedTagId}
                        pointId={parsedPointId}
                        participantInfo={this.props.participant}
                        onArrivalPress={this.onArrivalPress}
                        onDeparturePress={this.onDeparturePress}
                        onCancelPress={this.onCancelPress}
                        onSavePress={this.onSavePress}
                        eventType={this.state.eventType} //БУДЕТ ЛИ ПЕРЕДАВАТЬ СВЕЖИЙ СТЕЙТ?
                    />
                }
                errorVisibility={false}
                errorView={
                    <ErrorView
                        text='Ошибка экрана выбора типа события.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Загрузка экрана. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanTypeScreen)