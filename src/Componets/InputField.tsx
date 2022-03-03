import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const InputField = () => {
    const[value, setValue] = useState<string>();
    const[country, setCountry]= useState<string[]>();

    const handleChange = (event: any) => {
        setValue(event.target.value);
        setCountry(event.target.value)
      };
    const navigate = useNavigate();   
    const handleClick = () => navigate(`/recordshow/`, { state: country }); 

    


  return (
    <div><div>
    <TextField
      id="standard-textarea"
      placeholder="Enter Counry Name"
      variant="standard"
      type ="text"
      value={value} onChange={handleChange}
     
    />
  </div>
  <div>
      <Button disabled={!value} onClick={() => {
         alert('clicked');
          handleClick()
          }}>Submit</Button>
  </div>
  </div>
  )
}

export default InputField