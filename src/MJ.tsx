import { useState } from 'react';
import { Button, Switch } from '@mui/material';
import {PiGrid} from './PiGrid';
import {seepi} from './MJCommon';

interface pis  {
  haiPi:number[],
  agariPi:(number[])[],
  answerVisible:boolean,
  mode:'real'|'dummy',
}
export const MJ = () =>
{
  const [pi, setPi] = useState<pis>({
    haiPi:[],
    agariPi:[],
    answerVisible:false,
    mode:'dummy',
  });

  const showNext = () => {
    const result = seepi();
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
    }))
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
