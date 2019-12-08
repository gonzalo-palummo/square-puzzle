import React, { Component } from 'react';
import './Jigsaws.css';
import { Link } from 'react-router-dom';
import environment from '../../environment/environment';
import PuzzleService from '../../services/PuzzleService';
import CSSLoader from '../../components/CSSLoader/CSSLoader';
import { get } from '../../services/MultilingualService';
import Coverflow from 'react-coverflow';

class Jigsaws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: [],
      isLoading: true,
      puzzleActive: 0
    };
  }

  componentDidMount() {
    PuzzleService.getAll().then(puzzles => {
      if (typeof puzzles === 'object') {
        this.setState({
          puzzles: puzzles,
          isLoading: false
        });
      } else {
        this.props.history.push('/login'); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  goTo = puzzleId => {
    this.props.history.push(`/jigsaws/${puzzleId}`);
  };

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }
    return (
      <main className="text-center">
        <h1 className="d-none">Puzzles list</h1>
        <Coverflow
          displayQuantityOfSide={1}
          infiniteScroll
          navigation
          enableHeading
          active={this.state.puzzleActive}
          media={{
            '@media (max-width: 100000px)': {
              width: '100vw',
              height: '100vh',
              background: 'none',
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0'
            }
          }}
        >
          {this.state.puzzles.length > 0
            ? this.state.puzzles.map((puzzle, index) => (
                <img
                  src={`${environment.publicUrl}/${puzzle.url}/complete.jpg`}
                  alt={puzzle.user.user_name}
                  onClick={() => this.goTo(puzzle.id)}
                  key={puzzle.id}
                />
              ))
            : null}
        </Coverflow>

        <Link
          to={'/'}
          className="btn btn-icon btn-back mt-2 btn-back-fixed"
        ></Link>
      </main>
    );
  }
}
export default Jigsaws;
