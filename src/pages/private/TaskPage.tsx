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
  name?: string;
  title?: string;
  status?: boolean;
  done?: boolean;
}

export const TaskPage = () => {
  const axios = useAxios();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // GET TASKS
  const cargarTareas = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/tasks');

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setTasks(data);
    } catch (error) {
      console.error('Error cargando tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // CREATE
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

  // DELETE
  const eliminarTarea = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`);
      cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  // PATCH STATUS
  const cambiarEstado = async (task: Task) => {
    const actual = task.status ?? task.done ?? false;

    try {
      await axios.patch(`/tasks/${task.id}`, {
        done: !actual,
      });

      cargarTareas();
    } catch (error) {
      console.error('Error estado:', error);
    }
  };

  // EDIT MODE
  const iniciarEdicion = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.name || task.title || '');
  };

  const guardarEdicion = async (id: number) => {
    try {
      await axios.put(`/tasks/${id}`, {
        name: editText,
      });

      setEditingId(null);
      setEditText('');
      cargarTareas();
    } catch (error) {
      console.error('Error editando:', error);
    }
  };

  const getText = (task: Task) =>
    task.name || task.title || 'Sin nombre';

  const getStatus = (task: Task) =>
    task.status ?? task.done ?? false;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Gestión de Tareas
      </Typography>

      {/* CREATE */}
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

      {/* LIST */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => {
            const texto = getText(task);
            const estado = getStatus(task);

            return (
              <Paper key={task.id} sx={{ p: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>

                    {/* EDIT MODE */}
                    {editingId === task.id ? (
                      <TextField
                        value={editText}
                        onChange={(e) =>
                          setEditText(e.target.value)
                        }
                        size="small"
                      />
                    ) : (
                      <Typography variant="h6">
                        {texto}
                      </Typography>
                    )}

                    <Chip
                      label={estado ? 'Finalizada' : 'Pendiente'}
                      color={estado ? 'success' : 'warning'}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  <Stack direction="row" spacing={1}>
                    {/* STATE */}
                    <Button
                      variant="outlined"
                      onClick={() => cambiarEstado(task)}
                    >
                      Estado
                    </Button>

                    {/* EDIT */}
                    {editingId === task.id ? (
                      <Button
                        variant="contained"
                        onClick={() => guardarEdicion(task.id)}
                      >
                        Guardar
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => iniciarEdicion(task)}
                      >
                        Editar
                      </Button>
                    )}

                    {/* DELETE */}
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
            );
          })}
        </Stack>
      )}
    </Container>
  );
};
