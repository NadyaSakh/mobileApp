import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { ActionContainer, ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { requestCompetitionAction } from './Actions'
import { styles } from '../../Components/Styles'

export const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    competitionName: state.reducer.competitionName
})

export const mapDispatchToProps = dispatch => ({
    onCompetitionPress: () => dispatch(requestCompetitionAction())
})

//
export class ChooseCompetition extends React.Component {
    static propTypes = {
        screenState: PropTypes.string.isRequired,
        competitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        onCompetitionPress: PropTypes.func
    }
    state = {
        pointsList: [
            {key: 'Enduro 2016'},
            {key: 'Enduro май 2017'},
            {key: 'Enduro июль 2017'},
            {key: 'Enduro август 2017'},
            {key: 'Enduro май 2018'},
            {key: 'Enduro июнь 2018'},
            {key: 'Enduro август 2018'},
            {key: 'Enduro Жара 2018'}
        ]
    }

    render = () => {
        return <View style={styles.container}>
            <ActionContainer
                screenState={this.props.screenState}
                contentView={
                    <ContentView
                        text={'Выберите соревнование1'}
                        onCompetitionPress={this.props.onCompetitionPress}
                        name={this.props.competitionName}
                    />
                }
                errorView={
                    <ErrorView
                        text='Список соревнований не загружен.'/>
                }
                loadingView={
                    <LoadingView
                        text={'Выберите соревнование'}/>
                }
            />
        </View>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCompetition)