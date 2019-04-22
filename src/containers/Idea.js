import React, { Component } from "react";
import Button from "../components/Button";
import "../styles/Home.css";
import upvote from "../static/upvote.png";
import upvote_a from "../static/upvote-a.png";
import { apiUrl } from "../constants";

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: null,
      comment: ""
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

  handleCommentChange(e) {
    this.setState({comment: e.target.value});
  }

  addComment() {
    let url = apiUrl + 'ideas/comment/' + this.state.idea._id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token
      },
      body: JSON.stringify({
        body: this.state.comment
      })
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
    let body = idea.body.split("<br />");

    return (
      <div>
        <div className="item-container">
          <div>
            <h2>{idea.title}</h2>
            <div className="body">
              {body.map(p => 
                <p>{p}</p>
              )}
            </div>
          </div>
          <div className="metadata">
            <div className="upvote" onClick={this.upvote.bind(this, idea._id)}>
              <img src={upvoted? upvote_a: upvote} className="upvote-icon"/>
              <div className="upvote-text">{idea.upvotes.length}</div>
            </div>
            <div>
              <div className="author">By {idea.author.username}</div>
              <div className="date">{idea.date}</div>
            </div>
          </div>
        </div>
        <div className="comment-section">
          <h3 className="thin">Comment</h3>
          <textarea type="text-area" rows={3} className="input" placeholder="comment here..." onChange={this.handleCommentChange.bind(this)}/>
          <Button label={"comment"} type="primary" onClick={this.addComment.bind(this)}/>
          <h3 className="thin">Comments</h3>
          {
            idea.comments.map(comment => 
              <div className="comment-container">
                <div className="right-date date">{comment.date}</div>
                <div className="comment-author thin">{comment.author.username}</div>
                <div>
                  {comment.body}
                </div>
              </div>
            )
          }
          {
            !idea.comments.length &&
            <div className="comment-container">
              Be first to comment!
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Idea;