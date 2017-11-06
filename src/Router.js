import React from 'react';
import {Dimensions} from 'react-native';
import {Scene, Router, Stack, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
    const NAV_BAR_HEIGHT = 64;
    const {height} = Dimensions.get('window');
    const sceneStyle = {
        backgroundColor: '#FFF',
        marginTop: NAV_BAR_HEIGHT,
        height: (height - NAV_BAR_HEIGHT),
    };
    return (
        <Router sceneStyle={sceneStyle}>
            <Stack key={'root'}>
                <Scene
                    key={'login'}
                    component={LoginForm}
                    title={'Login'}
                    // initial
                />

                <Scene
                    rightTitle={'Add'}
                    onRight={() => Actions.employeeCreate()}
                    key={'employeeList'}
                    component={EmployeeList}
                    title={'Employee List'}
                    type={'replace'}
                    initial
                />

                <Scene
                    key={'employeeCreate'}
                    component={EmployeeCreate}
                    title={'Create Employee'}
                />
            </Stack>
        </Router>
    );
};

export default RouterComponent;