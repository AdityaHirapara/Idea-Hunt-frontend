import React, { Component } from "react";
import Link from "../components/Link";
import "../styles/Home.css";
import upvote from "../static/upvote.png";
import upvote_a from "../static/upvote-a.png";
import { apiUrl } from "../constants";

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: null
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    this.setState({token, username});
    let url = apiUrl + 'ideas/get/' + this.props.match.params.id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let idea = responseJson.idea;
      this.setState({idea});
      console.log(idea)
    })
    .catch((e) => {
      console.log(e);
    })
  }

  upvote(id) {
    let url = apiUrl + 'ideas/upvote/' + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let idea = responseJson.idea;
      this.setState({idea});
    })
    .catch((e) => {
      console.log(e);
    })
  }
 
  render() {
    const { idea, username } = this.state;
    if (!idea) {
      return "Loading";
    }
    let upvoted = idea.upvotes.find(i => i.username == username);

    return (
      <div>
        <div className="item-container">
          <div>
            <h2>{idea.title}</h2>
            <div className="body">
              {idea.body}
            </div>
          </div>
          <div className="metadata">
            <div className="upvote" onClick={this.upvote.bind(this, idea._id)}>
              <img src={upvoted? upvote_a: upvote} className="upvote-icon"/>
              <div className="upvote-text">{idea.upvotes.length}</div>
            </div>
            <div>
              <h3 className="author">By {idea.author.username}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Idea;