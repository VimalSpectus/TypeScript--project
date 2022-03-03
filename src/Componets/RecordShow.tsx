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

    interface First{
        capital:string;
        population:Number;
        latlng :Number;
        flags:string
    }

    interface second{
        temperature:Number;
        weather_icons:string;
        precip:Number;
        wind_speed:Number;
    }

   

    const [data, setData] = useState<First | null>();
    const [dataNew, setDataNew] = useState<second | null>();
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
                setData({
                    capital: result[0].capital[0],
                    population: result[0].population,
                    latlng: result[0].latlng[0],
                    flags: result[0].flags['png'],
                });
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
                setDataNew({
                    temperature: result.current.temperature,
                    weather_icons: result.current.weather_icons,
                    wind_speed: result.current.wind_speed,
                    precip: result.current.precip,
                });
              
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
                <TableCell data-testid="capital"  align="center">{data.capital}</TableCell>
                <TableCell align="center">{data.population}</TableCell>
                <TableCell align="center">{data.latlng}</TableCell>
                <TableCell align="center"><img src={data.flags}/></TableCell>
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
                        <TableCell align="center">{dataNew.temperature}</TableCell>
                        <TableCell align="center"><img src={dataNew.weather_icons}/></TableCell>
                        <TableCell align="center">{dataNew.wind_speed} kph</TableCell>
                        <TableCell align="center">{dataNew.precip}</TableCell>
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