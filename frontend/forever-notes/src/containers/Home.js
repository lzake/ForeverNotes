import React, {Component} from "react";
import {PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import {invokeApig} from '../libs/awsLib';

import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            notes: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        try {
            const results = await this.notes();
            this.setState({notes: results});
        } catch (e) {
            alert(e);
            console.log(e)
        }
        this.setState({isLoading: false});
    }
    notes() {
        return invokeApig({path: "/notes"});
    }

    renderNotesList(notes) {
        return [{}]
            .concat(notes)
            .map((note, i) => i !== 0
                ? <ListGroupItem
                        className="hvr-sweep-to-right"
                        key={note.NoteId}
                        href={`/notes/${note.NoteId}`}
                        onClick={this.handleNoteClick}
                        header={note
                        .content
                        .trim()
                        .split("\n")[0]}>

                        {"Created: " + new Date(note.createdAt).toLocaleString()}
                    </ListGroupItem>
                : <ListGroupItem
                    key="new"
                    href="/notes/new"
                    onClick={this.handleNoteClick}
                    className="hvr-sweep-to-right">
                    <h4>
                        <span className="hvr-icon-pulse-grow">
                            Create a new note</span>
                    </h4>
                </ListGroupItem>);
    }

    handleNoteClick = event => {
        event.preventDefault();
        this
            .props
            .history
            .push(event.currentTarget.getAttribute("href"));
    }

    renderLander() {
        return (
            <div className="lander">
            <div className="intro">
                <img
                    src={require('../images/icon.png')}
                    className="img-responsive maxicon"
                    alt=""/><br/>
                    
                <p>Keep notes until the heat death of the universe</p>
                <p>Guaranteed to last&nbsp;
                    <strong>1,898,734,109%</strong>&nbsp; longer than the average lifespan!</p>
                    </div>
            </div>
        );
    }
    renderNotes() {
        return (
            <div className="notes">
                <PageHeader className="yourNotes">Your Notes</PageHeader>
                <ListGroup>
                    {!this.state.isLoading && this.renderNotesList(this.state.notes)}
                </ListGroup>
            </div>
        );
    }
    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated
                    ? this.renderNotes()
                    : this.renderLander()}
            </div>
        );
    }
}