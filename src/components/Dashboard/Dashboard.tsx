import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, Item, Sticky, Header, List, Label, Card, Image, Statistic, Rating } from 'semantic-ui-react';

import './_Dashboard.scss';

import Storage from '../../storage/storage';
import { toJS } from 'mobx';

const Dashboard = () => {
    return (
        <div className="ui equal width grid">
            <div className="row banner">
                <div className="column middle aligned">
                    <img className="ui medium centered image" src="/images/I.Fest - Logo.svg" alt="Logo" />
                </div>
            </div>

            <div className="row centered">
                <div className="column middle aligned">
                    <br />
                    <br />
                    <h4>Introducing</h4>
                    <h1><b>FEST</b></h1>
                    <p>A Festival for you and your friends. <br />
                        We know what you like! ;)
                    </p>
                    <Header size='large'>Top 5: Genres</Header>
                    <List horizontal ordered>
                        {Storage.festResults[0] && Storage.festResults[0].festAvgGenresMax.map((e: any) => {
                            return (
                                <List.Item key={e.catName}>
                                    <Label as='a' color='yellow'>
                                        <Icon size='big' name='music' />
                                        {e.catName}
                                    </Label>
                                </List.Item>
                            );
                        })}
                    </List>
                    <br />
                    <br />
                    <br />
                    <Header size='large'>Top 5: Artists | Who you should see</Header>
                    <List horizontal ordered>
                        {Storage.festResults[0] && Storage.festResults[0].festAvgArtistsMax.map((e: any) => {
                            return (
                                <List.Item key={e.catName}>
                                    <Label as='a' color='teal'>
                                        <Icon size='big' name='star' />
                                        {e.catName}
                                    </Label>
                                </List.Item>
                            );
                        })}
                    </List>
                    <br />
                    <br />
                    <br />
                    <Header size='large'>Top 5: Foods | What you should eat</Header>
                    <List horizontal ordered>
                        {Storage.festResults[0] && Storage.festResults[0].festAvgFoodMax.map((e: any) => {
                            return (
                                <List.Item key={e.catName}>
                                    <Label as='a' color='orange'>
                                        <Icon size='big' name='food' />
                                        {e.catName}
                                    </Label>
                                </List.Item>
                            );
                        })}
                    </List>
                    <br />
                    <br />
                    <br />
                    <Header size='large'>Top 5: Drinks | What you should drink</Header>
                    <List horizontal ordered>
                        {Storage.festResults[0] && Storage.festResults[0].festAvgDrinkMax.map((e: any) => {
                            return (
                                <List.Item key={e.catName}>
                                    <Label as='a' color='pink'>
                                        <Icon size='big' name='bar' />
                                        {e.catName}
                                    </Label>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </List.Item>
                            );
                        })}
                    </List>
                </div>
            </div>
            <div className="row dashboard">
                <div className="seven wide column population">
                    <div role="list" className="ui medium very relaxed list population__list">
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
                                                    Storage.groupResults = [];
                                                    Storage.csvSelectedGroup.push(Storage.csvPopulation[pop.index]);
                                                    Storage.compareByArrayGroup();
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
                    <h1>Your group to compare</h1>
                    <div className="row group">
                        <div className="column">
                            {Storage.csvSelectedGroup && Storage.csvSelectedGroup.map((e: any) => {
                                return (
                                    <div className="group__person">
                                        <Label key={e.name} as='a' image size='medium'>
                                            <Image src={e.img} size='medium' />
                                            {e.name}
                                            {console.log(e)}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                        <h1>Recomendation for your group</h1>
                        <Header size='small'>Top 5: Genres</Header>
                        {Storage.groupResults[0] && console.log("HEY", Storage.groupResults[0].groupAvgGenresMax)}
                        <List horizontal ordered>
                            {Storage.groupResults[0] && Storage.groupResults[0].groupAvgGenresMax.map((e: any) => {
                                return (
                                    <List.Item key={e.catName}>
                                        <Label as='a' color='yellow'>
                                            <Icon size='small' name='music' />
                                            {e.catName}
                                        </Label>
                                    </List.Item>
                                );
                            })}
                        </List>
                        <br />
                        <br />
                        <br />
                        <Header size='small'>Top 5: Artists | Who your group should see</Header>
                        <List horizontal ordered>
                            {Storage.groupResults[0] && Storage.groupResults[0].groupAvgArtistsMax.map((e: any) => {
                                return (
                                    <List.Item key={e.catName}>
                                        <Label as='a' color='teal'>
                                            <Icon size='small' name='star' />
                                            {e.catName}
                                        </Label>
                                    </List.Item>
                                );
                            })}
                        </List>
                        <br />
                        <br />
                        <br />
                        <Header size='small'>Top 5: Foods | What your group should eat</Header>
                        <List horizontal ordered>
                            {Storage.groupResults[0] && Storage.groupResults[0].groupAvgFoodMax.map((e: any) => {
                                return (
                                    <List.Item key={e.catName}>
                                        <Label as='a' color='orange'>
                                            <Icon size='small' name='food' />
                                            {e.catName}
                                        </Label>
                                    </List.Item>
                                );
                            })}
                        </List>
                        <br />
                        <br />
                        <br />
                        <Header size='small'>Top 5: Drinks | What your group should drink</Header>
                        <List horizontal ordered>
                            {Storage.groupResults[0] && Storage.groupResults[0].groupAvgDrinkMax.map((e: any) => {
                                return (
                                    <List.Item key={e.catName}>
                                        <Label as='a' color='pink'>
                                            <Icon size='small' name='bar' />
                                            {e.catName}
                                        </Label>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </List.Item>
                                );
                            })}
                        </List>
                    </div>
                </div>

                <div className="column summary">
                    <h1>Summary</h1>
                    <div role="list" className="ui massive horizontal list">
                        <div role="listitem" className="item">
                            <img
                                src={Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].img}
                                className="ui tiny avatar image"
                            />
                            <div className="content">
                                <div className="header"><b><a>{Storage.csvPopulation[Storage.csvSelected] && Storage.csvPopulation[Storage.csvSelected].name}</a></b></div>
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
                                                    <a className="ui small green label">{e.catName}</a>
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
                                                    <a className="ui small red label">{e.catName}</a>
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
                                                    <a className="ui small green label">{e.catName}</a>
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
                                                    <a className="ui small red label">{e.catName}</a>
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
                                                    <a className="ui small green label">{e.catName}</a>
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
                                                    <a className="ui small red label">{e.catName}</a>
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
                                                    <a className="ui small green label">{e.catName}</a>
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
                                                    <a className="ui small red label">{e.catName}</a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="row date">
                        <h1>Your perfect date for the festival</h1>
                        <br />
                        <br />
                        <div className="ui divided two column grid">
                            <div className="column">
                                <Card color='pink'>
                                    <Image src={Storage.cosineRanking[1] && Storage.cosineRanking[1].img} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{Storage.cosineRanking[1] && Storage.cosineRanking[1].name}</Card.Header>
                                        <Card.Meta>I'm {Storage.cosineRanking[1] && Storage.cosineRanking[1].age}</Card.Meta>
                                        {Storage.cosineRanking[1] && console.log(Storage.cosineRanking[1])}
                                        <br />
                                        <Rating maxRating={5} defaultRating={5} icon='heart' size='massive' />
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className="column">
                                <Statistic color='pink'>
                                    <Statistic.Value>{Storage.cosineRanking[1] && parseInt(Storage.cosineRanking[1].scoreFinal)}%</Statistic.Value>
                                    <Statistic.Label>Match</Statistic.Label>
                                </Statistic>
                                <br />
                                <Button animated='vertical' color="pink">
                                    <Button.Content hidden>Chat</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='heart' />
                                    </Button.Content>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="row gang">
                        <h1>Your gang squad for the festival</h1>
                        <br />
                        <br />
                        {Storage.cosineRanking && Storage.cosineRanking.slice(2, 7).map((e: any) => {
                            return (
                                <div className="column gang__person">
                                    <Label as='a' color='yellow' image size='big'>
                                        <Image src={e.img} size='big' />
                                        {e.name}
                                        <Label.Detail><b>{e.age}</b></Label.Detail>
                                        <Label.Detail><b>{parseInt(e.scoreFinal)}%</b></Label.Detail>
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(Dashboard);