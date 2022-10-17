import './ManualZoning.css';
import DatePicker from './DatePicker';
import ToggleButtons from './ToggleButtons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Shared/Header';
import { CssBaseline } from '@mui/material';

function App() {
  const [edition, setEdition] = useState('toim');
  const [date, setDate] = useState('2022/09/29');
  const [pages, setPages] = useState([]);
  const [ImagePath, setImagePath] = useState('');

  function EditionHandler(invalue) {
    console.log('edition handler');
    console.log(invalue);
    setEdition(invalue);
    setPages([]);
    setImagePath('');
  }
  function DateHandler(invalue) {
    console.log('date handler');
    console.log(invalue);
    setDate(invalue);
    setImagePath('');
  }

  function PageClickHandler(e) {
    console.log(e.target);
    const pageName = e.target.innerHTML;
    console.log(pageName);

    // const example = '/SampleData/toim/2022/09/29/Page/29_09_2022_001_toim.jpg';

    const path = `/SampleData/toim/2022/09/${pageName.substr(
      0,
      2
    )}/Page/${pageName}`;
    console.log(path);
    setImagePath(path);
  }

  useEffect(() => {
    // const pagesPath = `/SampleData/toim/2022/09/30/Page`;
    const pagesPath = `/SampleData/${edition}/2022/09/${date.substr(
      7,
      3
    )}/Page`;
    axios.get(pagesPath).then((res) => {
      console.log(res.data);
      setPages(res.data);
    });
  }, [edition, date]);
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Header />
        <h1>Welcome to TOI NEWS paper Manual Zoning tool</h1>
        <ToggleButtons EditionHandler={EditionHandler} />
        <hr />
        <div className="mainPage">
          <div
            style={{
              width: '18vw',
              margin: '10px',
              border: '2px solid gray',
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <DatePicker DateHandler={DateHandler} />
            <hr />
            <h3>All Pages</h3>
            <div>
              {pages.map((pageName, index) => (
                <button
                  key={index}
                  onClick={(pageName) => PageClickHandler(pageName)}
                >
                  {pageName}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              margin: '10px',
              padding: '10px',
              width: '83vw',
            }}
          >
            <h3>Page Preview</h3>
            <hr />
            <div>
              <img
                // src={'/SampleData/toim/2022/09/29/Page/29_09_2022_001_toim.jpg'}
                src={ImagePath}
                alt=""
                width="90%"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
