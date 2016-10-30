import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentDidMount(){
    let authenticated = localStorage.getItem('token') === null ? false : true;
    this.setState({authenticated: authenticated});
  }

  render() {
    return (
      <div>
        Hello World from Home component. Authenticated? { this.state.authenticated.toString() }
      </div>
    );
  }
};
