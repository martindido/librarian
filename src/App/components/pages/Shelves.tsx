import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

import Page from '../../containers/pages/Page';
import '../../styles/Worlds.css';
import { ShelvesPageProps } from '../../types/Props/Pages/Shelves';

export default class Worlds extends Component<ShelvesPageProps> {
    // private static headerConfig: HeaderConfigProps = {
    //     menu: {
    //         admin: {
    //             items: [
    //                 {
    //                     key: 'worlds',
    //                     path: '/worlds',
    //                     icon: 'add'
    //                 }
    //             ]
    //         }
    //     }
    // };

    render() {
        return (
            <Page id='shelves' title='Shelves'>
                {this.props.shelves.length ? (
                    <List animated divided selection verticalAlign='middle' size='massive' inverted>
                        {this.props.shelves.map((shelf) => (
                            <List.Item to={`/shelves/${shelf.id}`} key={shelf.id}>
                                <List.Content>
                                    <List.Header>{shelf.id}</List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                ) : null}
            </Page>
        );
    }
}
