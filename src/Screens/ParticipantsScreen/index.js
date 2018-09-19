import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    View
} from 'react-native'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { styles } from '../../Components/Styles'
import { LOG } from '../../Utils/logger'
import { getParticipantsAction } from './Actions'


const mapStateToProps = state => ({
    ...state.ParticipantsReducer
})

export const mapDispatchToProps = dispatch => ({
    getParticipants: () => dispatch(getParticipantsAction())
})

export class ParticipantsScreen extends React.Component {
    static navigationOptions = {
        title: 'Участники',
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
        getParticipants: PropTypes.func,
        participantsList: PropTypes.array,
        quantity: PropTypes.string
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        LOG('ParticipantsScreenMount')
        this.getParticipants()
    }

    getParticipants = () => {
        this.props.getParticipants()
    }

    render = () => {
        return <View style={styles.container}>
            <ActionContainer
                componentState={this.props.componentState}
                contentView={
                    <ContentView
                        participants={this.props.participantsList}
                        quantity={this.props.quantity}
                    />
                }
                errorVisibility={false}
                errorView={
                    <ErrorView
                        text='Ошибка экрана участников.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Загрузка экрана участников. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsScreen)