import React, { Component } from "react";
import "../styles/User.css";
import Link from "../components/Link";
import Button from "../components/Button";
import upvote from "../static/upvote.png";
import upvote_a from "../static/upvote-a.png";
import { apiUrl } from "../constants";

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    this.setState({token, username});
    let url = apiUrl + 'user/info/' + this.props.match.params.id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let user = responseJson;
      this.setState({user});
      console.log(user)
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
      let ideas = this.state.user.ideas;
      let index = ideas.findIndex(i => i._id == idea._id);
      ideas[index].upvotes = idea.upvotes;
      this.setState({user: {...this.state.user, ideas}});
    })
    .catch((e) => {
      console.log(e);
    })
  }
 
  render() {
    const { user, username } = this.state;
    if (!user) {
      return "Loading";
    }

    return (
      <div>
        <div className="user-card">
          <h2 className={"user-title"}>{user.username}</h2>
          <div className="detail-container">
            <div className="field">
              <div className="label">Email</div>
              {user.email}
            </div>
            <div className="field">
              <div className="label">Joined on</div>
              {user.joining}
            </div>
          </div>
        </div>
        <div className="user-card">
        {
          !user.ideas.length &&
          <div className="center">{username == user.username? "You have": user.username + " has"} not added any ideas yet!</div>
        }
        {
          username == user.username &&
          <div className="user-button">
            <Link to={'/new'}>
              <Button label={"ADD IDEA"} type="primary" onClick={()=>{}}/>
            </Link>
          </div>
        }
        {
          user.ideas.map((idea) => {
            let upvoted = idea.upvotes.find(i => i.username == username);
            return <div className="item-container" key={idea._id}>
              <Link to={'/idea/' + idea._id}>
                <div className="preview">
                  <h2>{idea.title}</h2>
                  <div className="body-preview">
                    {idea.body}
                  </div>
                </div>
              </Link>
              <div className="metadata">
                <div className="upvote" onClick={this.upvote.bind(this, idea._id)}>
                  <img src={upvoted? upvote_a: upvote} className="upvote-icon"/>
                  <div className="upvote-text">{idea.upvotes.length}</div>
                </div>
                <div>
                  <Link to={'/user/' + idea.author._id}>
                    <div className="author">By {idea.author.username}</div>
                  </Link>
                  <div className="date">{idea.date}</div>
                </div>
              </div>
            </div>
          })
        }
        </div>
      </div>
    );
  }
}

export default Idea;