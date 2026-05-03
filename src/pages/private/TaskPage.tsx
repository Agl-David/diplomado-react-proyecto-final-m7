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

  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const cargarTareas = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/tasks');

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setTasks(data);
    } catch (error) {
      console.error(error);
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
        name: newTask.trim(),
      });
    } catch {
      try {
        await axios.post('/tasks', {
          title: newTask.trim(),
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }

    setNewTask('');
    cargarTareas();
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
    const actual =
      task.status ?? task.done ?? false;

    try {
      await axios.patch(`/tasks/${task.id}`, {
        done: !actual,
      });
    } catch {
      try {
        await axios.patch(`/tasks/${task.id}`, {
          status: !actual,
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }

    cargarTareas();
  };

  const iniciarEdicion = (task: Task) => {
    setEditId(task.id);
    setEditText(task.name || task.title || '');
  };

  const guardarEdicion = async () => {
    if (!editText.trim() || editId === null) return;

    try {
      await axios.put(`/tasks/${editId}`, {
        name: editText.trim(),
      });
    } catch {
      try {
        await axios.put(`/tasks/${editId}`, {
          title: editText.trim(),
        });
      } catch (error) {
        console.error(error);
        return;
      }
    }

    setEditId(null);
    setEditText('');
    cargarTareas();
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Gestión de Tareas
      </Typography>

      {/* CREAR */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Nueva tarea"
            value={newTask}
            onChange={(e) =>
              setNewTask(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={crearTarea}
          >
            Agregar
          </Button>
        </Stack>
      </Paper>

      {/* LISTADO */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => {
            const texto =
              task.name || task.title || '';

            const estado =
              task.status ?? task.done ?? false;

            const editando =
              editId === task.id;

            return (
              <Paper key={task.id} sx={{ p: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ width: '60%' }}>
                    {editando ? (
                      <TextField
                        fullWidth
                        value={editText}
                        onChange={(e) =>
                          setEditText(
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <>
                        <Typography
                          variant="h6"
                          sx={{
                            textDecoration:
                              estado
                                ? 'line-through'
                                : 'none',
                            color: estado
                              ? 'gray'
                              : 'black',
                          }}
                        >
                          {texto}
                        </Typography>

                        <Chip
                          label={
                            estado
                              ? 'Finalizada'
                              : 'Pendiente'
                          }
                          color={
                            estado
                              ? 'success'
                              : 'warning'
                          }
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </>
                    )}
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                  >
                    {editando ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={
                            guardarEdicion
                          }
                        >
                          Guardar
                        </Button>

                        <Button
                          color="inherit"
                          onClick={
                            cancelarEdicion
                          }
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color={
                            estado
                              ? 'warning'
                              : 'success'
                          }
                          onClick={() =>
                            cambiarEstado(
                              task
                            )
                          }
                        >
                          {estado
                            ? 'Reabrir'
                            : 'Finalizar'}
                        </Button>

                        <Button
                          variant="contained"
                          onClick={() =>
                            iniciarEdicion(
                              task
                            )
                          }
                        >
                          Editar
                        </Button>

                        <Button
                          color="error"
                          variant="contained"
                          onClick={() =>
                            eliminarTarea(
                              task.id
                            )
                          }
                        >
                          Eliminar
                        </Button>
                      </>
                    )}
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
