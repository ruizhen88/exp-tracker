import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { picture: undefined };
  }

  onChange = (e) => {
    this.setState({ picture: e.target.files[0] });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.picture);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8080/upload", formData, config)
      .then((response) => {
        console.log("res", response);
        this.setState({ fileName: response.data.filename });
        alert("The file is successfully uploaded");
      })
      .catch((error) => {});
  };

  render() {
    console.log(">>", this.state);
    return (
      <div className="App">
        <header className="App-header">
          {this.state.fileName && (
            <img src={`http://localhost:8080/uploads/${this.state.fileName}`} />
          )}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button
            onClick={async () => {
              const result = await axios.get("http://localhost:8080/products");
              console.log(result);
            }}
          >
            CLICK
          </button>
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="myImage" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
          {/* <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          /> */}
        </header>
      </div>
    );
  }
}

export default App;
