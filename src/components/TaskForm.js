import React, { useState } from 'react';
import { TextField, Button, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TaskService from '../services/TaskService';

const TaskForm = ({ existingTask, onSave }) => {
  const [task, setTask] = useState(existingTask || {
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    comments: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.id) {
      TaskService.updateTask(task).then(onSave);
    } else {
      TaskService.createTask(task).then(onSave);
    }
  };

  return (
    <Dialog open={true} onClose={onSave} fullWidth>
      <DialogTitle>{task.id ? 'Edit Task' : 'New Task'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Assigned To"
            value={task.assignedTo}
            onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Status"
            select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Priority"
            select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
          <TextField
            label="Comments"
            value={task.comments}
            onChange={(e) => setTask({ ...task, comments: e.target.value })}
            fullWidth
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
