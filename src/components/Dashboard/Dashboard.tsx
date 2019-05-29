import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Item } from 'semantic-ui-react';

import './_Dashboard.scss';

import Storage from '../../storage/storage';
import { toJS } from 'mobx';

const Dashboard = () => {
    return (
        <div className="ui grid">
            {console.log(Storage.csvSelectedGroup)}
            <div className="five wide column">
                <div role="list" className="ui medium very relaxed list populationList">
                    {Storage.csvPopulation && Storage.csvPopulation.map((pop: any) => {
                        if (pop.index === 0) return;
                        return (
                            <div role="listitem" className="item" key={pop.index}>
                                <div className="column">
                                    <div className="right floated content">
                                        <Button.Group size='tiny'>
                                            <Button onClick={() => {
                                                Storage.csvSelected = pop.index;
                                                Storage.cosineResultsData = [];
                                                Storage.cosineSingularityGeneral(pop.index);
                                            }}>View</Button>
                                            <Button.Or />
                                            <Button onClick={() => {
                                                Storage.csvSelectedGroup.push(Storage.csvPopulation[pop.index]);
                                                Storage.csvFest();
                                            }}>Add</Button>
                                        </Button.Group>
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

            <div className="eight wide column">
                <h1>Sumarry</h1>
                <div role="list" className="ui massive horizontal list">
                    <div role="listitem" className="item">
                        <img
                            src={Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].img}
                            className="ui tiny avatar image"
                        />
                        <div className="content">
                            <div className="header">Hey! My name is <b><a>{Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].name}</a></b></div>
                            I'm <b><a>{Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].age}</a></b>
                        </div>
                        <h3>The things that I love and hate are:</h3>
                    </div>
                </div>
                <div className="ui divided two column grid">
                    <div className="row">
                        <div className="column">
                            <a className="ui green big basic label">Loved genres</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByGenresMax.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui green label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="column">
                            <a className="ui red big basic label">Hated genres</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByGenresMin.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui red label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui divided two column grid">
                    <div className="row">
                        <div className="column">
                            <a className="ui green big basic label">Loved Artists</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByArtistsMax.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui green label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="column">
                            <a className="ui red big basic label">Hated Artists</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByArtistsMin.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui red label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui divided two column grid">
                    <div className="row">
                        <div className="column">
                            <a className="ui green big basic label">Loved Foods</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByFoodMax.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui green label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="column">
                            <a className="ui red big basic label">Hated Foods</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByFoodMin.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui red label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui divided two column grid">
                    <div className="row">
                        <div className="column">
                            <a className="ui green big basic label">Loved Drinks</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByDrinkMax.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui green label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="column">
                            <a className="ui red big basic label">Hated Drinks</a>
                            <br />
                            <br />
                            <div role="list" className="ui horizontal list">
                                {Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].scoreByDrinkMin.map((e: any) => {
                                    return (
                                        <div key={e.catName + e.score} role="listitem" className="item">
                                            <div className="content">
                                                <a className="ui red label">{e.catName}</a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <Item.Group>
                        <Item>
                        <Item.Image size='tiny' src={Storage.cosineRanking[1] && Storage.cosineRanking[1].name} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header>
                                    <Icon name='like' />
                                    {Storage.cosineRanking[1] && Storage.cosineRanking[1].name}
                                    </Item.Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </div>
            </div>
        </div>
    );
}

export default observer(Dashboard);