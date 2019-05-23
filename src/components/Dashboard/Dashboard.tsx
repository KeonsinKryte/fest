import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Storage from '../../storage/storage';

const Dashboard = () => {
    return (
        <div className="ui internally celled grid">
            <div className="row">
                <div className="three wide column">
                    <img src="/images/wireframe/image.png" className="ui image" />
                </div>
                <div className="ten wide column">
                    <img src="/images/wireframe/centered-paragraph.png" className="ui image" />
                </div>
                <div className="three wide column">
                    <img src="/images/wireframe/image.png" className="ui image" />
                </div>
            </div>
            <div className="row">
                <div className="three wide column">
                    <img src="/images/wireframe/image.png" className="ui image" />
                </div>
                <div className="ten wide column">
                    <img src="/images/wireframe/paragraph.png" className="ui image" />
                </div>
                <div className="three wide column">
                    <img src="/images/wireframe/image.png" className="ui image" />
                </div>
            </div>
        </div>
    );
}

export default observer(Dashboard);
