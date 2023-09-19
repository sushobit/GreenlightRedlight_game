import React, { Component } from 'react';
import GreenLightRedLight from '../GamePage';
import './index.css'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      registrationComplete: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;

    // Check if the name field is empty
    if (name.trim() === '') {
      window.alert('Please enter your name.');
      return; // Prevent further execution if the name is empty
    }

    // You can add your registration logic here
    // For now, just set registrationComplete to true
    this.setState({ registrationComplete: true });

    // Set a cookie when the user registers
    
  };

  render() {
    const { name, email, mobile, registrationComplete } = this.state;

    if (registrationComplete) {
      return (
        <div className='gamepage'>
          <div className='card2'>
          <GreenLightRedLight />
          <div className="button-container">
            <button className='logoutbutton' onClick={() => this.setState({ registrationComplete: false })}>
              Log Out
            </button>
          </div>

          </div>
        </div>
      );
    }

    return (
      <div className='mainpage'>
        <div className='card'>
        <h2 className='userregistration'>User Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              className='inputitems'
              type="text"
              id="name"
              placeholder='ENTER YOUR NAME'
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className='inputitems'
              type="email"
              id="email"
              placeholder='ENTER YOUR EMAIL'
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mobile">Mobile No:</label>
            <input
              className='inputitems'
              type="number"
              id="mobile"
              placeholder='ENTER YOUR MOBILE No.'
              name="mobile"
              value={mobile}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="registerbutton">
            Register
          </button>
        </form>
        </div>
      </div>
    );
  }
}

export default HomePage;
