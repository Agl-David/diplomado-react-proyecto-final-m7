import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAxios } from '../../hooks';

interface Task {
  id: number;
  name: string;
  status: boolean;
}

export const TaskPage = () => {
  const axios = useAxios();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState('');

  const cargarTareas = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/tasks');

      console.log('API TASKS =>', response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setTasks(data);
    } catch (error) {
      console.error('Error cargando tareas:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const crearTarea = async () => {
    if (!newTask.trim()) return;

    try {
      await axios.post('/tasks', {
        name: newTask,
      });

      setNewTask('');
      cargarTareas();
    } catch (error) {
      console.error('Error creando tarea:', error);
    }
  };

  const eliminarTarea = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`);
      cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarEstado = async (task: Task) => {
    try {
      await axios.patch(`/tasks/${task.id}`, {
        status: !task.status,
      });

      cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Gestión de Tareas
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Nueva tarea"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <Button variant="contained" onClick={crearTarea}>
            Agregar
          </Button>
        </Stack>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => (
            <Paper key={task.id} sx={{ p: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6">
                    {task.name}
                  </Typography>

                  <Chip
                    label={
                      task.status
                        ? 'Finalizada'
                        : 'Pendiente'
                    }
                    color={
                      task.status
                        ? 'success'
                        : 'warning'
                    }
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={() => cambiarEstado(task)}
                  >
                    Estado
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => eliminarTarea(task.id)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
};
