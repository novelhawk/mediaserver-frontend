import React from 'react';
import '../StyleSheets/Home.scss';

class Home extends React.Component {
  render() { 
    return (
      <div className="Home">
        <h1>Welcome to media server</h1>
        <p>Press <a href='/anime'>here</a> to list the available animes</p>
      </div>
    );
  }
}
 
export default Home;
