import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

const App = () => {

  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(respone => respone.json())
      .then(users => setRobots(users));
  },[]); // run only once as componentDidMount

  useEffect(() => {
    console.log('count',count);
  }, [count]) // only run if count changes.

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
  });

  return !robots.length ? <h1>Loading...</h1>
    :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <button 
          onClick={() => setCount(count + 1)}
        >Click Me!
        </button>
        <SearchBox onSearchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
}

export default App;