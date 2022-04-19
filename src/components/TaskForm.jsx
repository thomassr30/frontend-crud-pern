import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const TaskForm = () => {

  const [task, settask] = useState({
    title: '',
    description: ''
  })

  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setloading(true)
    await axios.post('http://localhost:4000/tasks', task)
    setloading(false)
    navigate('/')
  }

  const handleChange = (e) => {
    settask({...task, [e.target.name]: e.target.value})
  }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Grid item xs={6}>
        <Card sx={{mt:5}} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant='5' textAlign='center' color='white'>
            Crear Tarea
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField 
                variant='filled'
                label='Titulo'
                sx={{display: 'block', margin: '.5rem 0'}}
                inputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
                name='title'
                onChange={handleChange}
              />

              <TextField 
                variant='filled'
                label='Descripción'
                multiline
                rows={4}
                sx={{display: 'block', margin: '.5rem 0'}}
                inputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
                name='description'
                onChange={handleChange}
              />  
              <Button variant='contained' 
                      color='primary' 
                      type='submit'
                      disabled={!task.title || !task.description}
                      >
                {loading ? <CircularProgress 
                  color='inherit'
                  size={24}
                /> : 'Guardar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm