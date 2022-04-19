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
import { useNavigate, useParams } from 'react-router-dom'


const TaskForm = () => {

  const [task, settask] = useState({
    title: '',
    description: ''
  })

  const [loading, setloading] = useState(false)
  const [editing, setediting] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setloading(true)

    if(editing){
      await axios.put(`http://localhost:4000/tasks/${params.id}`, task)
    }else{
      await axios.post('http://localhost:4000/tasks', task)
    }

    setloading(false)
    navigate('/')
  }

  const handleChange = (e) => {
    settask({...task, [e.target.name]: e.target.value})
  }

  const loadTask = async (id) => {
    const result = await axios.get(`http://localhost:4000/tasks/${id}`)
    const {data} = result
    
    settask(
      {
        title: data[0].title,
        description: data[0].description
      }
    )
    setediting(true)
  }

  useEffect(() => {
    if(params.id){
      loadTask(params.id)
    }
  }, [params.id])

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Grid item xs={6}>
        <Card sx={{mt:5}} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant='5' textAlign='center' color='white'>
            {
              editing ? 'Editar Tarea' : 'Nueva Tarea'
            }
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
                value={task.title}
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
                value={task.description}
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