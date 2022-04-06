import logo from './logo.svg';
import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { Box, Card, CardContent,Typography,CardActions,Button} from "@material-ui/core";
import { Theme,createStyles ,makeStyles} from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      backgroundColor:"lightskyblue",
      "& > *": {
        margin: theme.spacing(3),
      },
    },
  })
);


function App() {
  const classes=useStyles();

  
  const[data,setData]=useState([]);
  const [statename ,setStateName] = useState([]);
  const [statedata ,setStateData] = useState([]); 
  const getCovidData = async () => {
    
    const res = await fetch('https://data.covid19india.org/data.json');
    const actualData = await res.json();
    console.log(actualData.statewise)
    setData(actualData.statewise);
 
   }

  useEffect (() => {
    getCovidData();

 },[]);

 
 const handleChangeInput = (e) =>{
   console.log(e.target.value)
   setStateName(e.target.value)

 }

 const handleSearch = () =>{
   
   let found = false ; 

   for (var i =0 ;  i < data.length ; i++)
   {
    if(data[i].state.toLowerCase().match(statename.toLowerCase()))
    { 
      setStateData(data[i]);
      found=true; 
      console.log("state Found !! ")
      console.log(data[i].state)
      console.log(data[i])
      break; 

    }
  }
  if(found == false)
  {
    alert("Please enter valid city name")

  }
 }

 

  return (
    <div className="col-md-12">
      <div className='coronabg'>
        <h1 className='heading'>India Corona Tracker</h1>
        <div className=" d-grid gap-3 mt-4 col-4" >
        < input type="text" placeholder="Enter City name" onChange={handleChangeInput}></input>
        <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
        </div>
        </div>
        <div className='col-md-12 text-center bg-danger text-white' >
          <h3>StateName :{statedata.state}</h3>
        </div>
        
        <div className='col-md-12 bg-secondary' > 
                  
              
        <Box className={classes.root}>
           
        <Card>
    <CardContent>
      <Typography variant="h3">ACTIVE<br/>{statedata.active}</Typography>
    </CardContent>
    </Card>
  <Card>
    <CardContent>
      <Typography variant="h3" text="textSecondary" color="info">CONFIRMED<br/>{statedata.confirmed}</Typography>
    </CardContent>
    
  </Card>
  <Card>
    <CardContent>
      <Typography variant="h3">RECOVERED <br/>{statedata.recovered}</Typography>
    </CardContent>
          </Card>
  <Card>
    <CardContent>
      <Typography variant="h3">DEATHS<br/>{statedata.deaths}</Typography>
    </CardContent>
    
  </Card>
  <Card>
    <CardContent>
      <Typography variant="h3"> LAST UPDATED TIME<br/>{statedata.lastupdatedtime}</Typography>
    </CardContent>
    
  </Card>

</Box>

            )
            
          )
        
      

        </div>


      </div>
  );
}

export default App;