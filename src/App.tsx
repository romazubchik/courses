import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import ResponsiveExample from "./components/Containers";
import CoursePage from './components/CoursePage';

function App() {
  return (
    <div className="App">
      <header className="App-header center-block">
        <Routes>
          <Route path='/' Component={ResponsiveExample} />
          <Route path='/coursePage/:id' Component={CoursePage} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
