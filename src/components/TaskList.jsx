import {useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Card, CardContent, Typography } from '@mui/material'

const TaskList = () => {

  const [tasks, settasks] = useState([])

  const loadTasks = async () => {
    const result = await axios.get('http://localhost:4000/tasks')
    
    settasks(result.data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`)
  }

  useEffect(() => {
    loadTasks()
  }, [tasks])
  

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
                  }} onClick={() => console.log('Editando')}>
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