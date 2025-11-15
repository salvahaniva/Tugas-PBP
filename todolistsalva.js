
const express = require('express');
const port = 9000;

const app = express();
app.use(express.json());
const tasks = [
    {"id" : 1, "title" : "Makan di temani pacar", "completed" : true },
    {"id" : 2, "title" : "Menonton di bioskop sukabumi", "completed" : true },
    {"id" : 3, "title" : "Bermain bersama teman", "completed" : true },
];

//Route: Mendapatkan semua task
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Route: Membuat task baru
app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: completed || false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

//Route: Mendapatkan task berdasarkan ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json(task);
});

//Route: Update task berdasarkan ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    const { title, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (typeof completed === "string") {
    completed = completed === "true";
    }
    res.json(task);
});

//Route: Delete task berdasarkan ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    tasks.splice(index, 1);
    res.json({ message: "Task berhasil dihapus" });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
