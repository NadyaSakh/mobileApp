import React from 'react'
import {
    View,
    TouchableHighlight,
    FlatList,
    Alert,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import { ComponentState } from '../../Components/ActionContainer'
import { LoadingIndicator } from '../../Components/LoadingIndicator'
import { SingleLineText } from '../../Components/SingleLineText'
import { LOG } from '../../Utils/logger'
import { Button } from 'react-native'
import { styles } from '../../Components/Styles'

export const CompetitionItem = props => {
    CompetitionItem.propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <TouchableHighlight
        onPress={() => {
            props.onPress ?
                props.onPress() :
                Alert.alert('Внимание!', 'Обработчик нажатия не назначен')
        }}>
        <SingleLineText
            style={props.style}
            text={props.text}/>
    </TouchableHighlight>
}

export const CompetitionList = props => {
    CompetitionList.propTypes = {
        competitionList: PropTypes.array,
        onPress: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    const onPress = props => {
        onPress.propTypes = {
            onPress: PropTypes.func
        }
        props.onPress()
    }

    return <FlatList
        data={props.competitionList}
        renderItem={({item}) => {
            return (
                <CompetitionItem
                    onPress={this.onPress}
                    style={props.style}
                    text={item.key}/>
            )
        }}
        keyExtractor={(item, index) => index}
    />
}

export const Info = props => {
    Info.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }
    return <SingleLineText
        text={props.text}
        style={props.style}
    />
}

export const LoadingView = props => {
    LoadingView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
    return <View>
        <Info
            text={props.text}
            style={styles.textStyle}
        />
        <LoadingIndicator/>
    </View>
}

export const ContentView = props => {
    ContentView.propTypes = {
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        data: PropTypes.array,
        onCompetitionPress: PropTypes.func,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    }

    return <View>
        <Info
            text={props.text}
            style={styles.textStyle}
        />
        <Button
            onPress={props.onCompetitionPress}
            title='Показать'/>
        <Text>Название:{props.name}
        </Text>
        <CompetitionList
            competitionList={props.data}
            onPress={() =>
                props.onCompetitionPress()
            }
            style={styles.item}
        />
    </View>
}

export class ActionContainer extends React.Component {
    static propTypes = {
        screenState: PropTypes.oneOf([
            ComponentState.LOADING,
            ComponentState.CONTENT,
            ComponentState.ERROR
        ]),

        loadingView: PropTypes.object,
        contentView: PropTypes.object.isRequired,
        errorView: PropTypes.object
    }

    render = () => {
        LOG('render', 'ActionContainer')
        switch (this.props.screenState) {
            case ComponentState.LOADING: {
                return this.renderLoadingView()
            }

            case ComponentState.ERROR: {
                return this.renderErrorView()
            }

            case ComponentState.CONTENT: {
                return this.renderContentView()
            }
        }
    }

    renderLoadingView = () => {
        return <View style={styles.container}>
            {this.props.loadingView}
        </View>
    }

    renderErrorView = () => {
        return <View style={styles.container}>
            {this.props.errorView}
        </View>
    }

    renderContentView = () => {
        return <View style={styles.container}>
            {this.props.contentView}
        </View>
    }
}