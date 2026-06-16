import * as React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AlarmIcon from "@mui/icons-material/Alarm";
import { useContext,useState } from "react";
import { todosContext } from "../contexts/todosContext";

export default function Todo({todo,handleCheck}){
  const [showDeleteDialog,setShowDeleteDialog]=useState(false);
  const [showUpdateDialog,setShowUpdateDialog]=useState(false);
  const [updatedTodo,setUpdatedTodo]=useState({title:todo.title,details:todo.details});


    const {todos,setTodos}=useContext(todosContext);

    function handleCheckClick(){
        const updatedTodos=todos.map((t)=>{
      if (t.id==todo.id){
        t.isCompleted=!t.isCompleted;
      }
      return t;
    }
  );
  setTodos(updatedTodos);
  localStorage.setItem("todos",JSON.stringify(updatedTodos));
        


       
    }
    function handleDeleteClick(){
      setShowDeleteDialog(true);
    }
    function handleUpdateClick(){
      setShowUpdateDialog(true);
    }
     function handleDeleteDialogClose(){
      setShowDeleteDialog(false);
    }
    function handleUpdateClose(){
      setShowUpdateDialog(false);
    }
     function handleDeleteConfirm(){
      const updatedTodos=todos.filter((t)=>{
        return t.id !=todo.id

      }
    );
    setTodos(updatedTodos);
     localStorage.setItem("todos",JSON.stringify(updatedTodos));
    }
     function handleUpdateConfirm(){
      const updatedTodos=todos.map((t)=>{
        if(t.id==todo.id){
          return{...t,title:updatedTodo.title,details:updatedTodo.details};

        }else{
          return t;
        }
      }
    );
     setTodos(updatedTodos);
     setShowUpdateDialog(false);
    localStorage.setItem("todos",JSON.stringify(updatedTodos)); 
      

      }








    return(
      <>
    {/* delete*/}
      <Dialog
        onClose={handleUpdateClose}
        open={showDeleteDialog}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure for delete this mission?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} >Yes,Delete</Button>
        </DialogActions>
      </Dialog>










       {/* update*/}

      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"update mission"}
        </DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin="dense" id="name" label="title of mission" fullWidth variant="standard"
          value={updatedTodo.title}
          onChange={(e)=>{
            setUpdatedTodo({...updatedTodo,title:e.target.value});
          }

          }
          
          
          />
           <TextField
          autoFocus
          margin="dense" id="name" label="details" fullWidth variant="standard"
          value={updatedTodo.details}
          onChange={(e)=>{
            setUpdatedTodo({...updatedTodo,details:e.target.value});
          }

          }
          
          
          
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleUpdateConfirm} >Confirm</Button>
        </DialogActions>
      </Dialog>




















        <Card className="todocard" sx={{ minWidth: 275,background:"grey",color:"white" ,marginTop:5}}>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                     <Typography variant="h5"  sx={{textalign:"center"}}>
                       {todo.title}
                    </Typography>
                    <Typography variant="h6"  sx={{textalign:"center"}}>
                       {todo.details }
                    </Typography>
                </Grid>
                    <Grid item xs={4}>
                        <IconButton className="iconbutton" aria-label="delete" style={{marginLeft:"20px", background:"white",color:"red"}}
                        
                        onClick={handleDeleteClick}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={()=>
                        {
                            handleCheckClick();
                        }

                        } className="iconbutton" aria-label="delete" style={{marginLeft:"20px",
                         background:todo.isCompleted? "#8bc34a":"white",
                        color:todo.isCompleted? "white":"#8bc34a"}}>
                             <AddShoppingCartIcon />
                        </IconButton>
                       <IconButton onClick={handleUpdateClick} className="iconbutton"
                       aria-label="edit"
  style={{
    marginLeft: "20px",
    background: "white",
    color: "#1976d2"
  }}
>
  <EditIcon />
</IconButton>








                    </Grid>
            </Grid>
        

          

         
         
          

        </CardContent>

        <CardActions>
          
        </CardActions>
      </Card>
       </>
    )
}
