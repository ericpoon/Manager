import React, {Component} from 'react';
import {Card, CardSection, Input, Button} from './common';

class EmployeeCreate extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label={'Name'}
                        placeholder={'Eric'}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label={'Phone'}
                        placeholder={'12348765'}
                    />
                </CardSection>

                <CardSection>
                    <Button>Create</Button>
                </CardSection>
            </Card>
        );
    }
}

export default EmployeeCreate;