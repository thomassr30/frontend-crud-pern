import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button
} from '@mui/material'
import {useState, useEffect} from 'react'

const TaskForm = () => {

  const [task, settask] = useState({
    title: '',
    description: ''
  })

  const handleSubmit = (e) =>{
    e.preventDefault()

    console.log(task)
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
              <Button variant='contained' color='primary' type='submit'>
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm