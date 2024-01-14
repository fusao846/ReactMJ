import { Pi } from './Pi';

interface PiGridProps {
  size?:'small'|'medium';
  type?:'haiPi'|'atariPi'|'agariPi';
  numberArr:number[];
  visible?:boolean;
  mode:'real'|'dummy';
}


export const PiGrid = ({
  size = 'medium',
  numberArr,
  type,
  visible = true,
  mode,
} : PiGridProps) => {

  const marginLeftArr = [
    {
      type:'haiPi',
      ml:[10,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
      type:'atariPi',
      ml:[10,0,0,0,0,0,0,0,0],
    },
    {
      type:'agariPi',
      ml:[10,20,0,10,0,0,10,0,0,10,0,0,10,0,0],
    },
    {
      type:'agariPi7',
      ml:[10,20,0,10,0,10,0,10,0,10,0,10,0,10,0,0],
    },
  ];
  let ml = marginLeftArr;
  if (type==='agariPi' && numberArr.length === 16) {
    //numberArr.pop();
    ml = marginLeftArr.filter(m => m.type==='agariPi7');
  } else {
    ml = marginLeftArr.filter(m => m.type===type);
  }
  if (visible === false) return (<></>);
  return (
    <>
      {
        numberArr.map((n, idx) => (
          <Pi key={idx} marginLeft={`${ml[0].ml[idx]}px`} size={size} number={n} mode={mode}/>
        ))
      }
    </>
  );
}
