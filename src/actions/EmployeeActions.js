import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS,
} from './types';

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value},
    };
};

export const employeeCreate = ({name, phone, shift}) => {
    console.log('creating an employee', name, phone, shift);
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then(() => {
                Actions.employeeList({type: 'reset'});
                dispatch({type: EMPLOYEE_CREATE});
            });
    };
};

export const employeesFetch = () => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                // snapshot doesn't contain actual data, but it describes the data

                // This 'on value' event handler is persistent, once we call it, it's set up
                // - firebase will automatically run this function whenever there's a update in the values
                // - and hence dispatch the action below

                dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
            });
    };
};

export const employeeSave = ({name, phone, shift, key}) => {
    console.log('saving an employee', key, name, phone, shift);
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase.database().ref(`users/${currentUser.uid}/employees/${key}`)
            .set({name, phone, shift})
            .then(() => {
                Actions.employeeList({type: 'reset'});
                dispatch({type: EMPLOYEE_SAVE_SUCCESS});
            });
    };
};