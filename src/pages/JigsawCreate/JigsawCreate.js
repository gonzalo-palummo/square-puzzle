import React, { Component } from "react";
import "./JigsawCreate.css";
import { Link, Redirect } from "react-router-dom";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import CSSLoader from "../../components/CSSLoader/CSSLoader";
import AvatarEditor from "react-avatar-editor";
import PuzzleService from "../../services/PuzzleService";
import { getUserData } from "../../services/AuthService";
import Resizer from "react-image-file-resizer";
import { get } from "../../services/MultilingualService";

class JigsawCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: {
        scale: 1,
        rotate: 0,
        public: false
      },
      imageChosen: null,
      message: {
        header: null,
        text: null,
        type: null
      },
      success: false,
      errors: {},
      isLoading: false
    };

    this.imageInput = React.createRef();
  }

  handleChooseFile = () => {
    const fileToUpload = this.imageInput.current.files[0];
    if (
      fileToUpload.type != "image/jpg" &&
      fileToUpload.type != "image/jpeg" &&
      fileToUpload != "image/png"
    ) {
      this.setState({
        message: {
          header: "Oops!",
          text: "You must upload an image.",
          type: "error"
        },
        imageChosen: null
      });
    } else {
      this.setState({
        imageChosen: fileToUpload
      });
    }
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ isLoading: true });
    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL();
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          //let imageCropped = window.URL.createObjectURL(blob);

          Resizer.imageFileResizer(
            blob,
            500,
            500,
            "JPEG",
            30,
            0,
            uri => {
              PuzzleService.upload({
                image: uri,
                created_by: getUserData().id,
                public: this.state.imageData.public
              }).then(success => {
                this.setState({ isLoading: false });
                if (success) {
                  this.setState({
                    message: {
                      header: get("success"),
                      text: "Your puzzle was uploaded succesfully.",
                      type: "success"
                    }
                  });
                } else {
                  this.setState({
                    message: {
                      header: "Oops!",
                      text: "Your puzzle cannot be uploaded.",
                      type: "error"
                    }
                  });
                }
              });
            },
            "base64"
          );
        });
    }

    return;
  };

  handleRequestClose = () => {
    let success = true;
    if (this.state.message.type == "error") {
      success = false;
    }
    this.setState({
      message: {
        header: null,
        text: null,
        type: null
      },
      success: success
    });
  };

  handleChange = ev => {
    const elem = ev.target;
    if (elem.name == "public") {
      this.setState({
        imageData: {
          ...this.state.imageData,
          [elem.name]: !this.state.imageData[elem.name]
        }
      });
    } else {
      this.setState({
        imageData: { ...this.state.imageData, [elem.name]: elem.value }
      });
    }
  };

  setEditorRef = editor => (this.editor = editor);

  rotateImage = () => {
    this.setState({
      imageData: {
        ...this.state.imageData,
        rotate: this.state.imageData.rotate + 90
      }
    });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="/jigsaws" />;
    }

    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    const message = this.state.message;
    let modal = "";
    if (message.text !== null) {
      modal = (
        <ModalDialog
          isOpen={true}
          onRequestClose={this.handleRequestClose}
          title={this.state.message.header}
          message={this.state.message.text}
        ></ModalDialog>
      );
    }

    let avatarEditor = "";

    if (this.state.imageChosen !== null) {
      avatarEditor = (
        <>
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.state.imageChosen}
            border={25}
            rotate={this.state.imageData.rotate}
            scale={this.state.imageData.scale}
            className="d-block mx-auto my-3"
          />
          <label className="d-block">
            {get("scale")}
            <input
              type="range"
              onChange={this.handleChange}
              value={this.state.imageData.scale}
              id="scale"
              name="scale"
              min="1"
              step="0.01"
              max="2"
              className="slider"
            />
          </label>
          <button
            className="btn my-2 border-rounded mx-auto btn-secondary"
            type="button"
            onClick={this.rotateImage}
          >
            {get("rotate")}
          </button>
          <div class="form-check my-3 mb-4">
            <input
              type="checkbox"
              class="form-check-input checkbox-custom"
              id="public"
              name="public"
              onChange={this.handleChange}
              value={this.state.imageData.public}
            />
            <label class="form-check-label checkbox-custom-label" for="public">
              {get("makePublic")}
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-block my-2 border-rounded mx-auto"
          >
            {get("upload")} {get("puzzle")}
          </button>
        </>
      );
    } else {
      avatarEditor = ""; // TODO: CHECK WHY THIS DON'T WORK
    }

    return (
      <main className="text-center">
        {modal}
        <h1 className="h2">
          {get("select")} {get("image")}
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="file-upload mx-auto my-5">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*;capture=camera"
              capture="camera"
              ref={this.imageInput}
              onChange={this.handleChooseFile}
            />
          </div>
          {avatarEditor}
        </form>
        <Link to={"/"} className="btn btn-icon btn-back mt-4"></Link>
      </main>
    );
  }
}

export default JigsawCreate;
