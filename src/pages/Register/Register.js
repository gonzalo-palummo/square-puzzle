import React, { Component } from 'react';
import './Register.css';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../../services/UserService';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
import CSSLoader from '../../components/CSSLoader/CSSLoader';
import { get } from '../../services/MultilingualService';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        user_name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      message: {
        header: null,
        text: null,
        type: null
      },
      success: false,
      errors: {},
      isLoading: false
    };
  }

  handleChange = ev => {
    const elem = ev.target;
    this.setState({
      formData: { ...this.state.formData, [elem.name]: elem.value }
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    if (this.state.formData.password != this.state.formData.confirm_password) {
      this.setState({
        message: {
          header: 'Oops!',
          text: get('pwdMustMatch') + '.',
          type: 'error'
        }
      });
      return false;
    }

    this.setState({
      isLoading: true
    });

    UserService.register({
      user_name: this.state.formData.user_name,
      email: this.state.formData.email,
      password: this.state.formData.password,
      plays: 0
    }).then(rta => {
      console.log(rta);
      if (rta.success) {
        this.setState({
          message: {
            header: get('success'),
            text: get('accountCreated') + '.',
            type: 'success'
          },
          isLoading: false
        });
      } else {
        if (rta.errors) {
          this.setState({
            message: {
              header: 'Oops!',
              text: rta.errors[Object.keys(rta.errors)[0]],
              type: 'error'
            },
            isLoading: false
          });
        } else {
          this.setState({
            message: {
              header: 'Oops!',
              text: get('error') + '.',
              type: 'error'
            },
            isLoading: false
          });
        }
      }
    });
  };

  handleRequestClose = () => {
    let success = true;
    if (this.state.message.type == 'error') {
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

  render() {
    if (this.state.success) {
      return <Redirect to="/login" />;
    }

    if (this.state.isLoading) {
      return <CSSLoader />;
    }

    const message = this.state.message;
    let modal = '';
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

    return (
      <main>
        {modal}
        <h1 className="h2 text-center">{get('register')}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_name">
              <div className="btn btn-icon btn-user"></div>
              {get('userName')}
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="form-control"
              value={this.state.formData.user_name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <div className="btn btn-icon btn-email"></div>
              {get('email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={this.state.formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <div className="btn btn-icon btn-password"></div>
              {get('password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={this.state.formData.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">
              <div className="btn btn-icon btn-password"></div>
              {get('confirm')} {get('password')}
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="form-control"
              value={this.state.formData.confirm_password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-block my-2 border-rounded w-75 mx-auto"
          >
            {get('register')}
          </button>
          <Link
            to="/login"
            className="btn btn-secondary btn-block my-2 border-rounded text-white w-75 mx-auto"
          >
            {get('goLogin')}
          </Link>
        </form>
      </main>
    );
  }
}

export default Register;
