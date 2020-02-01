import React, { Component } from 'react';
import './Jigsaw.css';
import JigsawComponent from '../../components/Jigsaw/Jigsaw';
import UserService from './../../services/UserService';
import { getUserData, setUserData } from './../../services/AuthService';
import CSSLoader from '../../components/CSSLoader/CSSLoader';
import RecordService from '../../services/RecordService';
import { Link } from 'react-router-dom';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
import environment from '../../environment/environment';
import Explosion from '../../components/Explosion/Explosion';
import Advert from '../../components/Advert/Advert';
import { get } from '../../services/MultilingualService';

class Jigsaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movements: 0,
      elapsed: 0,
      start: Date.now(),
      isLoading: true,
      totalPieces:
        this.props.match.params.size * this.props.match.params.size - 1,
      countLoadedPieces: 1,
      showReference: false,
      showTutorial: getUserData().first_game,
      showJigsaw: true,
      completed: false,
      advert: true,
      counter: 5
    };
  }

  secondsElapsed = () => {
    return (Math.round(this.state.elapsed / 100) / 10).toFixed(1);
  };

  handleMove = () => {
    this.setState({
      movements: this.state.movements + 1
    });
  };

  handleLoad = () => {
    this.setState({ countLoadedPieces: this.state.countLoadedPieces + 1 });
    if (this.state.totalPieces == this.state.countLoadedPieces) {
      this.setState({
        start: Date.now(),
        isLoading: false
      });
    }
  };

  handleClickReference = () => {
    this.setState({
      showReference: true
    });
  };

  handleClickReload = () => {
    this.setState({
      showJigsaw: false
    });

    setTimeout(
      () =>
        this.setState({
          showJigsaw: true
        }),
      1
    );
  };

  handleRequestReferenceClose = () => {
    this.setState({
      showReference: false
    });
  };

  handleRequestTutorialClose = () => {
    this.setState({
      showTutorial: false
    });
    const userData = JSON.parse(localStorage.user_data);
    userData.first_game = false;
    setUserData(userData);
  };

  onComplete = () => {
    let time = this.secondsElapsed();
    clearInterval(this.timer);
    this.setState({ completed: true });

    setTimeout(() => {
      this.setState({
        isLoading: true
      });

      RecordService.create({
        puzzle_id: this.props.match.params.jigsawId,
        size: this.props.match.params.size,
        time: time,
        movements: this.state.movements,
        created_by: getUserData().id
      }).then(success => {
        if (success) {
          this.setState({
            isLoading: false
          });
          this.props.history.push(
            `/jigsaws/${this.props.match.params.jigsawId}/${this.props.match.params.size}/complete/${time}/${this.state.movements}`
          );
        } else {
          this.props.history.push('/login'); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
        }
      });
    }, 5000);
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
    UserService.incrementPlays(getUserData().id).then(success => {
      if (success) {
      } else {
        this.props.history.push('/login'); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });

    setTimeout(() => {
      this.setState({ advert: false });
    }, 5000);

    window.setInterval(() => {
      this.setState({ counter: this.state.counter - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({ elapsed: new Date() - this.state.start });
  };

  render() {
    if (this.state.advert) {
      return <Advert counter={this.state.counter} />;
    }
    return (
      <main className="text-center">
        <ModalDialog
          isOpen={this.state.showReference}
          onRequestClose={this.handleRequestReferenceClose}
          title={get('imageReference')}
          message={
            <img
              src={`${environment.publicUrl}/images/puzzles/${this.props.match.params.jigsawId}/complete.jpg`}
              alt={get('imageReference')}
              className="reference"
            />
          }
        ></ModalDialog>
        <ModalDialog
          isOpen={this.state.showTutorial}
          onRequestClose={this.handleRequestTutorialClose}
          title={get('howToPlay')}
          message={
            <img
              src={require('../../images/gameplay.gif')}
              alt={get('howToPlay')}
              className="tutorial"
            />
          }
        ></ModalDialog>
        {this.state.isLoading ? <CSSLoader /> : ''}
        {this.state.completed ? (
          <>
            <Explosion />
            <div className="wrapper"></div>
            <p className="congratulations h3 slide-in-elliptic-top-fwd">
              {get('congratulations')} !
            </p>
            <img
              src={require('../../images/win.svg')}
              className="icon-win slide-in-elliptic-top-fwd"
            />
          </>
        ) : (
          ''
        )}
        <div className="header">
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-icon btn-eye"
                onClick={this.handleClickReference}
              ></button>
              <button
                className="btn btn-icon btn-reload"
                onClick={this.handleClickReload}
              ></button>
            </div>
            <div className="col-6">
              <p className="timer font-weight-light">
                <span id="timer">{this.secondsElapsed()}</span> |{' '}
                {this.state.movements}
              </p>
            </div>
          </div>
        </div>
        {this.state.showJigsaw ? (
          <JigsawComponent
            size={this.props.match.params.size}
            jigsawId={this.props.match.params.jigsawId}
            onLoad={this.handleLoad}
            onMove={this.handleMove}
            onComplete={this.onComplete}
          />
        ) : (
          ''
        )}

        <Link to={'/'} className="btn btn-icon btn-back mt-4"></Link>
      </main>
    );
  }
}
export default Jigsaw;
