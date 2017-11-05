import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header = (props) => {
    const {viewStyle, textStyle} = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
    },
    textStyle: {
        fontSize: 20,
    },
});

export {Header};