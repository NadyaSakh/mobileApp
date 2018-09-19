import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { requestCompetitionAction } from './Actions'
import { styles } from '../../Components/Styles'

export const mapStateToProps = state => ({
    ...state.InitScreenReducer //когда вся ифа из стора редьюсера
})

export const mapDispatchToProps = dispatch => ({
    loadCurrentCompetitionData: () => dispatch(requestCompetitionAction())
})

export class CurrentCompetition extends React.Component {
    static propTypes = {
        screenState: PropTypes.string.isRequired,
        loadCurrentCompetitionData: PropTypes.func,
        competitionExists: PropTypes.bool,
        navigateTo: PropTypes.string
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadCurrentCompetitionData()
    }

    componentDidUpdate = prevProps => {
        if (this.props.navigateTo !== prevProps.navigateTo) {
            this.props.navigation.navigate(this.props.navigateTo)
        }
    }

    render = () => {
        return <View style={styles.container}>
            <ActionContainer
                componentState={this.props.screenState}
                contentView={
                    <ContentView
                        competitionExists={this.props.competitionExists}
                    />
                }

                errorView={
                    <ErrorView
                        text='Список соревнований не загружен.'
                        onRepeat={this.props.loadCurrentCompetitionData}
                    />
                }
                loadingView={
                    <LoadingView
                        text={'Загрузка информации о соревновании. Пожалуйста, подождите.'}/>
                }
            />
        </View>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentCompetition)