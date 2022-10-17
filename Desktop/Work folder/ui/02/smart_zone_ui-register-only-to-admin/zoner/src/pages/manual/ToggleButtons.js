import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

const ToggleButtons = (props) => {
  const [edition, setEdition] = React.useState('toim');

  const handleChange = (event, newEdition) => {
    setEdition(newEdition);
    // console.log(newEdition);
    props.EditionHandler(newEdition);
    // console.log(event.target.value);
  };
  return (
    <div>
        <ToggleButtonGroup
          color="primary"
          value={edition}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="toim">TOIM</ToggleButton>
          <ToggleButton value="toih">TOIH</ToggleButton>
          <ToggleButton value="toit">TOIT</ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
};

export default ToggleButtons;
