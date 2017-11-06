import React from 'react';
import {Dimensions} from 'react-native';
import {Scene, Router, Stack} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    const NAV_BAR_HEIGHT = 64;
    const {height} = Dimensions.get('window');
    const getSceneStyle = () => ({
        marginTop: NAV_BAR_HEIGHT,
        height: (height - NAV_BAR_HEIGHT),
    });
    return (
        <Router getSceneStyle={getSceneStyle}>
            <Stack key="root">
                <Scene key={'login'} component={LoginForm} title={'Login'}/>
            </Stack>
        </Router>
    );
};

export default RouterComponent;