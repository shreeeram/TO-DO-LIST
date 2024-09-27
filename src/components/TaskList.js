import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getTasks().then((response) => setTasks(response.data));
  };

  const handleDelete = (id) => {
    TaskService.deleteTask(id).then(() => {
      fetchTasks();
      setOpenDeleteDialog(false);
    });
  };

  const handleSave = () => {
    setOpenForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  const openDeleteConfirmation = (task) => {
    setTaskToDelete(task);
    setOpenDeleteDialog(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => { setOpenForm(true); setEditingTask(null); }}>
        New Task
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.comments}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { setEditingTask(task); setOpenForm(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteConfirmation(task)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Render the TaskForm component when a new task is being created or edited */}
      {openForm && <TaskForm existingTask={editingTask} onSave={handleSave} />}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete task "{taskToDelete?.assignedTo}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDelete(taskToDelete.id)} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
