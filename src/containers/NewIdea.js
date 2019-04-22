import React, { Component } from "react";
import Button from "../components/Button";
import "../styles/Idea.css";
import { apiUrl } from "../constants";

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      title: ""
    }
  }

  componentDidMount() {
    this.setState({
      token: localStorage.getItem('token')
    });
  }

  handleBodyChange(e) {
    this.setState({body: e.target.value});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  create() {
    if (!this.state.title.trim()) {
      this.state.message = "Give your idea a good title!";
    } else if (!this.state.body.trim()) {
      this.state.message = "Describe your idea!";
    } else {
      let body = this.state.body.replace(/\r?\n/g, '<br />');
      let url = apiUrl + 'ideas/post/';
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.token
        },
        body: JSON.stringify({
          title: this.state.title,
          body: body
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let idea = responseJson.idea;
        if (idea) window.location.href = '../../';
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }
 
  render() {
    const { title, body } = this.state;

    return (
      <div>
        <div className="idea-form">
          <input type="text" className="editor-input editor-title" placeholder="Title..." onChange={this.handleTitleChange.bind(this)}/>
          <textarea type="text-area" rows={20} className="editor-input" placeholder="Tell us more about it..." onChange={this.handleBodyChange.bind(this)}/>
          <div className="button-container">
            <Button label={"POST"} type="primary" onClick={this.create.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Idea;