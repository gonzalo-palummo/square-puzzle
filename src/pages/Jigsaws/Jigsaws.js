import React, { Component } from 'react';
import './Jigsaws.css';
import { Link } from 'react-router-dom';
import environment from '../../environment/environment';
import PuzzleService from '../../services/PuzzleService';
import RecordService from '../../services/RecordService';
import CSSLoader from '../../components/CSSLoader/CSSLoader';
import { get } from '../../services/MultilingualService';
import Coverflow from 'react-coverflow';
import Switch from '../../components/Switch/Switch';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
import { getUserData } from '../../services/AuthService';

class Jigsaws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzles: [],
      filterPuzzles: [],
      mostWon: [],
      mostLost: [],
      isLoading: true,
      puzzleActive: 0,
      showFilters: false,
      showMyPuzzles: false,
      showMostWon: false,
      showMostLost: false,
      filterCounter: 0,
      showCoverflow: true
    };
  }

  componentDidMount() {
    PuzzleService.getAll().then(puzzles => {
      if (typeof puzzles === 'object') {
        this.setState({
          puzzles: puzzles,
          isLoading: false,
          filterCounter: this.state.filterCounter + 1
        });
        this.initialFilter();
      } else {
        this.props.history.push('/login'); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
    RecordService.getMostWon().then(puzzlesIds => {
      if (typeof puzzlesIds === 'object') {
        let ids = [];
        puzzlesIds.forEach(puzzleId => {
          ids.push(puzzleId.puzzle_id);
        });
        this.setState({
          mostWon: ids,
          filterCounter: this.state.filterCounter + 1
        });
        this.initialFilter();
      } else {
        this.props.history.push('/login'); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
    RecordService.getMostLost().then(puzzlesIds => {
      if (typeof puzzlesIds === 'object') {
        let ids = [];
        puzzlesIds.forEach(puzzleId => {
          ids.push(puzzleId.puzzle_id);
        });
        this.setState({
          mostLost: ids,
          filterCounter: this.state.filterCounter + 1
        });
        this.initialFilter();
      } else {
        this.props.history.push('/login'); // TODO: FIX THIS, SHOULD REDIRECT TO THE ERROR PAGE
      }
    });
  }

  initialFilter = () => {
    if (this.state.filterCounter === 3) {
      this.setState({
        showMostWon: true,
        filterPuzzles: this.filterPuzzles('showMostWon')
      });
    }
  };

  goTo = puzzleId => {
    this.props.history.push(`/jigsaws/${puzzleId}`);
  };

  handleFilterChange = ev => {
    const name = ev.target.name;
    this.setState({
      showMyPuzzles: false,
      showMostWon: false,
      showMostLost: false
    });
    this.setState({
      [name]: true,
      filterPuzzles: this.filterPuzzles(name)
    });
  };

  filterPuzzles = name => {
    this.setState({
      showCoverflow: false
    });
    setTimeout(() => {
      this.setState({
        showCoverflow: true
      });
    }, 10);
    let puzzles = this.state.puzzles;
    switch (name) {
      case 'showMyPuzzles':
        return puzzles.filter(puzzle => puzzle.created_by === getUserData().id);
        break;
      case 'showMostWon':
        return puzzles.filter(puzzle => this.state.mostWon.includes(puzzle.id));
        break;
      case 'showMostLost':
        return puzzles.filter(puzzle =>
          this.state.mostLost.includes(puzzle.id)
        );
        break;
    }
  };

  handleClickFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters
    });
  };

  render() {
    if (this.state.isLoading) {
      return <CSSLoader />;
    }
    return (
      <main className="text-center">
        <h1 className="d-none">{get('puzzlesList')}</h1>
        <button className="btn" id="filters" onClick={this.handleClickFilters}>
          {get('filters')}
        </button>
        <ModalDialog
          isOpen={this.state.showFilters}
          onRequestClose={this.handleClickFilters}
          title={get('filters')}
          message={
            <>
              <div className="text-center">
                <Switch
                  label={get('myPuzzles')}
                  checked={this.state.showMyPuzzles}
                  name="showMyPuzzles"
                  onInputChange={this.handleFilterChange}
                ></Switch>
              </div>
              <div className="text-center">
                <Switch
                  label={get('mostWon')}
                  checked={this.state.showMostWon}
                  name="showMostWon"
                  onInputChange={this.handleFilterChange}
                ></Switch>
              </div>
              <div className="text-center">
                <Switch
                  label={get('mostLost')}
                  checked={this.state.showMostLost}
                  name="showMostLost"
                  onInputChange={this.handleFilterChange}
                ></Switch>
              </div>
            </>
          }
        ></ModalDialog>
        {this.state.showCoverflow ? (
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
            {this.state.filterPuzzles.length > 0
              ? this.state.filterPuzzles.map((puzzle, index) => (
                  <img
                    src={`${environment.publicUrl}/${puzzle.url}/complete.jpg`}
                    alt={puzzle.user.user_name}
                    onClick={() => this.goTo(puzzle.id)}
                    key={puzzle.id}
                  />
                ))
              : null}
          </Coverflow>
        ) : (
          ''
        )}

        <Link
          to={'/'}
          className="btn btn-icon btn-back mt-2 btn-back-fixed"
        ></Link>
      </main>
    );
  }
}
export default Jigsaws;
