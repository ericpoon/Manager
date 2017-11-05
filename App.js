import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import {Header, Button} from './src/components/common';
import LoginForm from './src/components/LoginForm';
import {Card} from './src/components/common/Card';
import {CardSection} from './src/components/common/CardSection';
import {Spinner} from './src/components/common/Spinner';

export default class App extends React.Component {
    state = {isLoggedIn: null};
    store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    componentWillMount() {
        // Initialize Firebase
        let config = {
            apiKey: 'AIzaSyBxW5auHfr8B7_Pt7Jo64oL5UbMJFUa3T0',
            authDomain: 'authentication-fa10e.firebaseapp.com',
            databaseURL: 'https://authentication-fa10e.firebaseio.com',
            projectId: 'authentication-fa10e',
            storageBucket: '',
            messagingSenderId: '694201549038',
        };
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(user => {
            if (user) this.setState({isLoggedIn: true});
            else this.setState({isLoggedIn: false});
        });
    }

    renderContent() {

        switch (this.state.isLoggedIn) {
        case true:
            return (
                <Card>
                    <CardSection>
                        <Button
                            onPress={() => firebase.auth().signOut()}
                        >
                            Log out
                        </Button>
                    </CardSection>
                </Card>
            );
        case false:
            return <LoginForm/>;
        default:
            return <Spinner size={'large'}/>;
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <View>
                    <Header text={'Authentication'}/>
                    {this.renderContent()}
                </View>
            </Provider>
        );
    }
}
