import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'


export const ComponentState = {
    LOADING: 'LOADING',
    CONTENT: 'CONTENT',
    ERROR: 'ERROR'
}

export class ActionContainer extends React.Component {
    static propTypes = {
        componentState: PropTypes.oneOf([
            ComponentState.LOADING,
            ComponentState.CONTENT,
            ComponentState.ERROR
        ]),

        loadingView: PropTypes.object,
        contentView: PropTypes.object.isRequired,
        errorView: PropTypes.object,
        errorVisibility: PropTypes.bool
    }

    static defaultProps = { errorVisibility : true }

    render = () => {
        switch (this.props.componentState) {
            case ComponentState.LOADING: {
                return this.renderLoadingView()
            }

            case ComponentState.ERROR: {
                if (this.props.errorVisibility)
                    return this.renderErrorView()
            }

            //special fallthrough
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

export const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'// 0 - для авторизации, нужно переправить, чтобы корректно отображалось
    }
})

