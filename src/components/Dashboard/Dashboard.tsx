import React, { Component } from 'react';
import { observer } from 'mobx-react';

import './_Dashboard.scss';

import Storage from '../../storage/storage';

const Dashboard = () => {
    return (
        <div className="ui grid">
            <div className="four wide column">
                <div role="list" className="ui big very relaxed list populationList">
                    {Storage.csvPopulation && Storage.csvPopulation.map((pop: any) => {
                        if (pop.index === 0) return;
                        return (
                            <div role="listitem" className="item" key={pop.index}>
                                <div className="right floated content">
                                    <div className="ui buttons">
                                        <button className="ui compact button">View</button>
                                        <div className="or" data-text="or"></div>
                                        <button className="ui compact teal button">Add</button>
                                    </div>
                                </div>
                                <img src={pop.img} className="ui avatar image" />
                                <div className="content">
                                    <a className="header">{pop.name}</a>
                                    <div className="description">
                                        Age: <b>{pop.age}</b>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="nine wide column">
                <img src="/images/wireframe/paragraph.png" className="ui image" />
            </div>
            <div className="three wide column">
                <img src="/images/wireframe/media-paragraph.png" className="ui image" />
            </div>
        </div>
    );
}

export default observer(Dashboard);
