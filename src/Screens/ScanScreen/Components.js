import React from 'react'
import {
    View,
    Button,
    TouchableOpacity,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import { SingleLineText } from '../../Components/SingleLineText'
import { ScanState } from '../../Store/Scan/Constants'
import { Strings } from '../../Strings'
import { styles } from '../../Components/Styles'

export const ContentView = props => {
    ContentView.propTypes = {
        scanState: PropTypes.oneOf([
            ScanState.SCAN_DISABLE,
            ScanState.POINT_NOT_SELECTED,
            ScanState.POINT_SELECTED
        ]),
        selectedPoint: PropTypes.string,
        judgeName: PropTypes.string,
        onPress: PropTypes.func,
        description: PropTypes.string
    }

    return <View>
        <SingleLineText
            text={`Вы зашли как: ${props.judgeName}`}
            style={styles.boldStyle}
        />
        {selectScanState({...props})}
    </View>
}

const selectScanState = ({scanState, selectedPoint, description, onPress}) => {
    switch (scanState) {
        case ScanState.POINT_SELECTED: {
            return <EnableScanView pointName={selectedPoint} onPress={onPress}/>
        }
        case ScanState.POINT_NOT_SELECTED: {
            return <SelectPointView onPress={onPress}/>
        }
        case ScanState.SCAN_DISABLE: {
            return <DisabledScanView description={description}/>
        }
    }
}

const DisabledScanView = props => {
    DisabledScanView.propTypes = {
        description: PropTypes.string
    }
    //description: не начались соревнования /прошли соревнования
    return <SingleLineText
        text={props.description}
        style={styles.textStyle}
    />
}

const EnableScanView = props => {
    EnableScanView.propTypes = {
        pointName: PropTypes.string,
        onPress: PropTypes.func
    }
    return <View>
        <SingleLineText
            text={`Ваш пункт: ${props.pointName}`}
            style={styles.textStyle}
        />
        <SingleLineText
            text={Strings.SCANING}
            style={styles.boldStyle}
        />
        <SingleLineText
            text={Strings.SCAN_TIP}
            style={styles.textStyle}
        />
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonGreyStyle}
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}> Изменить пункт </Text>
            </TouchableOpacity>
        </View>
    </View>
}

const SelectPointView = props => {
    SelectPointView.propTypes = {
        onPress: PropTypes.func
    }
    return <View>
        <SingleLineText
            text={Strings.POINT_NOT_SELECTED}
            style={styles.textStyle}
        />
        {/*<Button*/}
        {/*onPress={props.onPress}*/}
        {/*title='Выбрать пункт'/>*/}
        <View style={styles.centredView}>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={props.onPress}
            >
                <Text style={styles.buttonText}> Выбрать пункт </Text>
            </TouchableOpacity>
        </View>
    </View>
}