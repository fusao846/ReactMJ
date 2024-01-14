import { useState } from 'react';
import { Button, Switch } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {PiGrid} from './PiGrid';
import {seepi} from './MJCommon';

interface pis  {
  haiPi:number[],
  agariPi:(number[])[],
  answerVisible:boolean,
  mode:'real'|'dummy',
  level:string,
}
export const MJ = () =>
{
  const [pi, setPi] = useState<pis>({
    haiPi:[],
    agariPi:[],
    answerVisible:false,
    mode:'dummy',
    level:'easy',
  });
  const [level, setLevel] = useState<string>('easy');

  const showNext = () => {
    const result = seepi(level);
    setPi((prevPi) => ({
      ...prevPi,
      haiPi: result.hipi,
      agariPi: result.agari,
      answerVisible:false,
    }));
  };
  const showAnswer = () => {
    setPi((prevPi) => ({
      ...prevPi,
      answerVisible:true,
      level:level,
    }))
  }
  const handleChange = (e:SelectChangeEvent) => {
    setLevel(e.target.value);
  }  
  return (
    <>
    <p>Real
    <Switch checked={pi.mode==='real'}
      onChange={(e) => {
        setPi((prevPi) => ({
          ...prevPi,
          mode:e.target.checked?'real':'dummy',
        }))
      }}
    />
    level
    <Select
      sx={{ m: 2, minWidth: 120 }}
      value={level}
      label="level"
      onChange={handleChange}
    >
      <MenuItem value={'easy'}>easy</MenuItem>
      <MenuItem value={'high'}>high</MenuItem>
      <MenuItem value={'mix'}>mix</MenuItem>
    </Select>
    </p>
    <Button onClick={showNext}>Next</Button>
    <p><PiGrid size={'medium'} numberArr={pi.haiPi} type={'haiPi'} mode={pi.mode}/></p>
    <p><Button onClick={showAnswer}>Answer</Button></p>
    {
        pi.agariPi.map((ag, index) => (
          <div key={index}>
            <PiGrid size={'small'} numberArr={ag} type={'agariPi'} visible={pi.answerVisible}  mode={pi.mode}/>
          </div>
        ))
    }
    </>
  );
}
