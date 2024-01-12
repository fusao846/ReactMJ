import { Box } from '@mui/material';
import './Pi.css';

interface PiProps {
  size?:'small'|'medium';
  number:number;
  marginLeft:string;
  mode:'real'|'dummy';
}

export const Pi = ({
  size = 'medium',
  number,
  marginLeft,
  mode,
} : PiProps) => {

  if (mode==='dummy') return (
    <Box
      sx={{
        display:'inline-flex',
        flexDirection:'column',
        marginLeft:marginLeft,
      }}
    >{number}</Box>
  );

  const kanjiNum:string[] = ['一','二','三','四','伍','六','七','八','九'];
  const baseSize = {
    w:57,
    h:75,
    f:35,
    l:35,
  }
  const w = (size==='medium'?baseSize.w:baseSize.w*0.7).toString()+'px';
  const h = (size==='medium'?baseSize.h:baseSize.h*0.7).toString()+'px';
  const f = (size==='medium'?baseSize.f:baseSize.f*0.7).toString()+'px';
  const l = (size==='medium'?baseSize.l:baseSize.l*0.7).toString()+'px';
  return (
    <>
      <Box sx={{
        border:'1px solid #ccc',
        backgroundColor:'#fffffa',
        width:w,
        height:h,
        fontSize:f,
        textAlign:'center',
        verticalAlign:'middle',
        borderRadius:'5px',
        display:'inline-flex',
        flexDirection:'column',
        marginLeft:marginLeft,
        fontFamily:'HG行書体',
        lineHeight:l,
        boxShadow:3,
      }} >
        <p>{kanjiNum[number - 1]}</p><p className='text-red-500' >萬</p>
      </Box>
    </>
  );
}
