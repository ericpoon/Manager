import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import {employeeUpdate, employeeSave, employeeRemove} from '../actions';
import {Card, CardSection, Button} from './common';
import {Confirm} from './common/Confirm';

class EmployeeEdit extends Component {
    state = {showModal: false};

    componentWillMount() {
        // map props to state - always use reducer state to share data among components
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({prop, value});
        });
    }

    onUpdatePress() {
        const {name, phone, shift} = this.props;
        this.props.employeeSave({name, phone, shift, key: this.props.employee.key});
    }

    onTextPress() {
        const {phone, shift} = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onRemovePress() {
        this.setState({showModal: true});
    }

    onAccept() {
        this.props.employeeRemove({key: this.props.employee.key});
    }

    onDecline() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <Card>
                <EmployeeForm/>
                <CardSection>
                    <Button onPress={this.onUpdatePress.bind(this)}>
                        Update
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onRemovePress.bind(this)}>
                        Remove
                    </Button>
                </CardSection>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to remove this employee?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};

};

export default connect(mapStateToProps, {employeeUpdate, employeeSave, employeeRemove})(EmployeeEdit);