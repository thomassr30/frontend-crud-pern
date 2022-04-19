import {useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Card, CardContent, Typography } from '@mui/material'
import {useNavigate} from 'react-router-dom'

const TaskList = () => {

  const [tasks, settasks] = useState([])
  const navigate =  useNavigate()

  const loadTasks = async () => {
    const result = await axios.get('http://localhost:4000/tasks')
    
    settasks(result.data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`)
    settasks(tasks.filter((task) => task.id !== id));
  }

  useEffect(() => {
    loadTasks()
  }, [])
  

  return (
    <>
      <h1>Lista de Tareas</h1>
      
        {
          tasks.map((task) => (
            <Card key={task.id}
              style={{
                marginBottom: '.7rem',
                backgroundColor: '#1e272e',
                color: 'white'
              }}
            >
              <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <Typography variant='h5'>{task.title}</Typography>
                  <Typography style={{paddingLeft: '1rem'}}>{task.description}</Typography>
                </div>

                <div>
                  <Button variant='contained' color='inherit' style={{
                    color: 'black'
                  }} onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                    Editar
                  </Button>
                  <Button variant='contained' color='warning'
                  style={{marginLeft: '.5rem'}}
                  onClick={() => handleDelete(task.id)}>
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        }
    </>
  )
}

export default TaskList