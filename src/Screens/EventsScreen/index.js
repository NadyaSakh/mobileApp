import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    View,
    Text
} from 'react-native'

// import { ActionContainer } from '../../Components/ActionContainer'
// import { ContentView, LoadingView } from './Components'
// import { ErrorView } from '../../Components/ScreenError'
// import { ScreensKeys } from '../../ScreenKey'
import { styles } from '../../Components/Styles'

const mapStateToProps = state => ({
    ...state.MenuReducer
})

export class EventsScreen extends React.Component {
    static navigationOptions = {
        title: 'События',
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
        navigation: PropTypes.object

    }

    constructor(props) {
        super(props)
    }

    render = () => {
        return <View style={styles.container}>
            <Text>События</Text>
            {/*<ActionContainer*/}
            {/*componentState={this.props.componentState}*/}
            {/*contentView={*/}
            {/*<ContentView*/}
            {/*onPrevScanPress={this.onPrevScan}*/}
            {/*/>*/}
            {/*}*/}
            {/*errorVisibility={false}*/}
            {/*errorView={*/}
            {/*<ErrorView*/}
            {/*text='Ошибка экрана меню.'/>*/}
            {/*}*/}
            {/*loadingView={*/}
            {/*<LoadingView*/}
            {/*text={'Загрузка меню. Пожалуйста, подождите.'}/>*/}
            {/*}*/}
            {/*/>*/}
        </View>
    }
}

export default connect(mapStateToProps)(EventsScreen)//, mapDispatchToProps