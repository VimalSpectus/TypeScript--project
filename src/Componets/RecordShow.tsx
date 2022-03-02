import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

const RecordShow = () => {
    const [data, setData] = useState<any>();
    const [dataNew, setDataNew] = useState<any>();
    const { state } = useLocation();
    


    React.useEffect(() => {
        ApiCall();
    }, []);

    const ApiCall = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://restcountries.com/v3.1/name/${state}`)
            .then(response => response.json())
            .then((result) => {
                console.log(result);

                setData(result);
                // console.log(data);
            })
            .catch(error => console.log('error', error));
    };

    const ApiCallWeather = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`http://api.weatherstack.com/current?access_key=12700ec246607b0da6baa1e34ea85377&query=${state}`)
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                setDataNew(result);
              
            })
            .catch(error => console.log('error', error));
    };

    const handleClick = () =>{
        ApiCallWeather();
      }

  return (
    <div><TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="spanning table" data-testid="tb">
        <TableHead>
            <TableRow>
                <TableCell align="center">capital</TableCell>
                <TableCell align="center">population</TableCell>
                <TableCell align="center">latlng</TableCell>
                <TableCell align="center">flags</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {data ? (
            <TableRow>
                <TableCell data-testid="capital"  align="center">{data[0].capital[0]}</TableCell>
                <TableCell align="center">{data[0].population}</TableCell>
                <TableCell align="center">{data[0].latlng[0]},{data[0].latlng[1]}</TableCell>
                <TableCell align="center"><img src={data[0].flags['png']} /></TableCell>
            </TableRow>
        ) : null}
        </TableBody>
    </Table>
</TableContainer>
<div>
     <Button onClick={() => {
          handleClick()
          }}>Capital Weather</Button>

     {dataNew ? (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell  data-testid="weather_icon" align="center">temp</TableCell>
                        <TableCell align="center">weather_icon</TableCell>
                        <TableCell align="center">wind speed</TableCell>
                        <TableCell align="center">pricip</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
               
                    <TableRow>
                        <TableCell align="center">{dataNew.current.temperature}</TableCell>
                        <TableCell align="center"><img src={dataNew.current.weather_icons}/></TableCell>
                        <TableCell align="center">{dataNew.current.wind_speed} kph</TableCell>
                        <TableCell align="center">{dataNew.current.precip}</TableCell>
                    </TableRow>
              
                </TableBody>
            </Table>
        </TableContainer>
        ):null}

     </div> 
</div>
  )
}

export default RecordShow