import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../actions';
import {Button, Card, CardSection, Input, Spinner} from './common';

class LoginForm extends Component {

    onButtonPress() {
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    renderButton() {
        if (this.props.loading)
            return <Spinner size={'large'}/>;
        else
            return (
                <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
            );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Email'}
                        placeholder={'user@gmail.com'}
                        value={this.props.email}
                        onChangeText={this.onEmailChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label={'Password'}
                        placeholder={'password'}
                        value={this.props.password}
                        onChangeText={this.onPasswordChange.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
        flex: 1,
    },
};

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;
    return {email, password, error, loading};
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
})(LoginForm);