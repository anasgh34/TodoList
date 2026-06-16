import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import{useState} from "react";
import {useContext } from "react";
import {useEffect } from "react";
import { todosContext } from "../contexts/todosContext";
export default function TodoList() {
  const {todos,setTodos}=useContext(todosContext);
   
  const[titleInput,setTitleInput]=useState("");
  const [DisplayedTodosType,setDisplayedTodosType]=useState("all");



  const completedTodos=todos.filter((t)=>
{
  return t.isCompleted;
}
)



const notcompletedTodos=todos.filter((t)=>
{
  return !t.isCompleted;
}
)


let todosToBeRendered=todos;
if(DisplayedTodosType=="complete"){
  todosToBeRendered=completedTodos;

}else if (DisplayedTodosType=="not-complete"){
  todosToBeRendered=notcompletedTodos;
}else{
  todosToBeRendered=todos;
}
  


  const todoJsx=todosToBeRendered.map((t)=>{
    return <Todo key={t.id} todo={t} />;
  }
);





useEffect(()=>{
  const storageTodos=JSON.parse(localStorage.getItem("todos"))??[];
  setTodos(storageTodos);
  



},
[]);


function changeDisplayedType(e){
  setDisplayedTodosType(e.target.value);
}
  function handleAddClick(){
    const newTodo={
      id:uuidv4(),
      title:titleInput,
      details:"",
      isCompleted:false,

    };
    const updatedTodos=[...todos,newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));

   setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh",overflow:"scroll"}}>
        <CardContent>
          <Typography variant="h2">
            My Mission
          </Typography>

          <Divider />

          <ToggleButtonGroup value={DisplayedTodosType} onChange={changeDisplayedType}  style={{direction:"ltr",marginTop:"30px"}} exclusive>
            <ToggleButton value="all">
              All
            </ToggleButton>

            <ToggleButton value="complete">
               Complete
            </ToggleButton>

            <ToggleButton value="not-complete">
              Not Complete
            </ToggleButton>
          </ToggleButtonGroup>
          {todoJsx}
          <Grid container style={{marginTop:"20px"}} spacing={2}>
            <Grid item xs={8} display="flex" justifyContent="space-around" alignItems="center"
             style={{}}
             > 
             <TextField style={{width:"100%"}} id="outlined-basic" label="title of mission" variant="outlined" value={titleInput} 
             onChange={(e)=>{
              setTitleInput(e.target.value);
             }
             }/>
               </Grid>


               <Grid item xs={4} display="flex" justifyContent="space-around" alignItems="center"
             style={{}}
             > 
             <Button style={{width:"100%" ,height:"100%"}} variant="contained" onClick={()=>{
              handleAddClick();
             }

             }
             disabled={titleInput.length==0}



             >ADD</Button>
               </Grid>
                     
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          </Grid>

        </CardContent>

        <CardActions>
          
        </CardActions>
      </Card>
    </Container>
  );
}

