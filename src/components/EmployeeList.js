import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ListView} from 'react-native';
import {employeesFetch} from '../actions/EmployeeActions';
import ListItem from './ListItem';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();

        // console.log('creating data source from component will MOUNT 1');

        this.createDataSource(this.props); // 145
    }

    componentWillReceiveProps(nextProps) {
        // every time the state is changed
        // the mapStateToProps will be called
        // and hence this component will receive new props
        // - nextProps are the next set of of props that this component
        // - will be rendered with
        // - this.props is still the old set of props

        this.createDataSource(nextProps); // 145 ?? global state in react native?
    }

    createDataSource({employees}) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <ListItem employee={employee}/>;
    }

    render() {
        console.log(this.props);
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            >
            </ListView>
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, key) => {
        return {...val, key};
    });
    return {employees};
};

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);