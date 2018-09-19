import React from 'react'
import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation'
import { Provider } from 'react-redux'

import { store } from './Store'
import CurrentCompetition from './Screens/InitCompScreen'
import SplashScreen from './Screens/SplashScreen'
import AuthScreen from './Screens/AuthScreen'
import ScanCompetition from './Screens/ScanScreen'
import { ScreensKeys } from './ScreenKey'
import ChoosePointScreen from './Screens/ChoosePointScreen'
import MenuScreen from './Screens/MenuScreen'
import PreScanScreen from './Screens/PreScanScreen'
import ParticipantsScreen from './Screens/ParticipantsScreen'
import EventsScreen from './Screens/EventsScreen'
import ScanTypeScreen from './Screens/ScanTypeScreen'

export const EventsStack = createStackNavigator({
    [ScreensKeys.EVENTS]: EventsScreen
})

export const ParticipantsStack = createStackNavigator({
    [ScreensKeys.PARTICIPANTS]: ParticipantsScreen
})

export const AppStack = createStackNavigator({
    [ScreensKeys.SCAN]: ScanCompetition,
    [ScreensKeys.POINTS]: ChoosePointScreen
})

export const MenuStack = createStackNavigator({
    [ScreensKeys.MENU]: MenuScreen,
    [ScreensKeys.PRE_SCAN]: PreScanScreen,
    [ScreensKeys.SCAN_TYPE_SCREEN]: ScanTypeScreen
})

export const TabNavigator = createBottomTabNavigator(
    {
        Scan: AppStack,
        Events: EventsStack,
        Participants: ParticipantsStack,
        Menu: MenuStack
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarVisible: navigation.state.index === 0
        }),
        tabBarOptions: {
            activeTintColor: '#2080ff',
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
                paddingBottom: 14
            },
            style: {
                // backgroundColor: 'blue'
            }
        }
    }
)
const RootStack = createSwitchNavigator(
    {
        [ScreensKeys.SPLASH]: SplashScreen,
        [ScreensKeys.AUTH]: AuthScreen,
        [ScreensKeys.INIT]: CurrentCompetition,
        [ScreensKeys.APP]: TabNavigator
    },
    {
        initialRouteName: ScreensKeys.SPLASH
        // initialRouteName: ScreensKeys.AUTH
    }
)

export class App extends React.Component {
    render = () =>
        <Provider store={store}>
            <RootStack/>
        </Provider>
}


