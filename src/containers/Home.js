import React, { Component } from "react";
import Link from "../components/Link";
import "../styles/Home.css";
import upvote from "../static/upvote.png";
import upvote_a from "../static/upvote-a.png";
import { apiUrl } from "../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaList: []
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    this.setState({token, username});
    let url = apiUrl + 'ideas/get';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let ideaList = responseJson.ideaList;
      this.setState({ideaList});
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
      let ideaList = this.state.ideaList;
      let index = ideaList.findIndex(i => i._id == idea._id);
      ideaList[index].upvotes = idea.upvotes;
      this.setState({ideaList});
    })
    .catch((e) => {
      console.log(e);
    })
  }
 
  render() {
    const { ideaList, username } = this.state;
    return (
      <div>
        {
          ideaList.map((idea) => {
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
    );
  }
}

export default Home;