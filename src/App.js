import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const API_KEY = process.env.REACT_APP_API_KEY_FaceRec;

console.log(API_KEY);

const particleOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1200
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: API_KEY
});

class App extends Component {
  state = {
    input: ""
  };

  onInputChange = event => {
    console.log(event.target.value);
  };

  onSubmit = () => {
    console.log("click");
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b",
        "https://samples.clarifai.com/face-det.jpg"
      )
      .then(
        function(response) {
          // do something with response
        },
        function(err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
