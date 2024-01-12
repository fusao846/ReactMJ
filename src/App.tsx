import {useState, useRef} from "react";
import {styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Grid} from '@mui/material';


type Meta = {
  connection_code:number;
  connection_name:string;
  schema_name:string;
  table_name:string;
  owner_name:string;
  record_count:number;
  table_comment:string;
  table_explanation:string;
  table_tag_contents:string;
  administrator:string;
  table_type_name:string;
  db_type_name:string;
  resource_type_name:string;
  column_names:string;
  column_comments:string;
  column_explanations:string;
  column_tag_contents:string;
  html:string;
  sample_datas:string;
};

const App = () => {
  const [meta, setMeta] = useState<Meta[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("★App");

  const fetchData = async (kw:string) => {
    console.log('★fetchData');
    console.log(kw);
    try {
      if (kw === '') return (<p>no data</p>);
      const j = {'words':kw, 'logicalOperator': 'or', 'isDataSearch': 'false', 'user_id': 'demo'};
      const query = new URLSearchParams(j);
      const res = await fetch("http://localhost:8089/dbaccess/metadata?"+query);
      console.log(res);
      console.log(res.status);
      if (res.status != 200) {
        setMeta([]);
        return (<p>No contents</p>);
      }
      
      const json = await res.json();

      setMeta(json.data);
    } catch (e: any) {
      console.error(e);
      return (<p>Error</p>);
    }
  };

  fetchData('');
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 1,
    },
  }));
  
  return (
    <div className="m-2">
      <Grid container alignItems="center">
      <Grid item xs={6} sx={{bgcolor: "#fff", p: 1 }}>
      <input type='text' ref={inputRef} className='border border-gray-400 w-full'
      placeholder="キーワード"/>
      </Grid>
      <Grid item xs={6} sx={{bgcolor: "#fff", p: 1 }}>
      <Button variant="contained" onClick={() => {
          fetchData(inputRef.current!.value);
        }}
        className="m-2" size="large">検索</Button>
      </Grid>
      </Grid>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>コネクション名</StyledTableCell>
            <StyledTableCell>スキーマ名</StyledTableCell>
            <StyledTableCell>テーブル名</StyledTableCell>
            <StyledTableCell>テーブルコメント</StyledTableCell>
            <StyledTableCell>レコード数</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meta?.map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell>{row.connection_name}</StyledTableCell>
              <StyledTableCell>{row.schema_name}</StyledTableCell>
              <StyledTableCell>{row.table_name}</StyledTableCell>
              <StyledTableCell>{row.table_comment}</StyledTableCell>
              <StyledTableCell align='right'>{row.record_count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default App;