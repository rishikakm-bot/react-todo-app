console.log("🔥 THIS IS THE CORRECT SERVER.JS 🔥");
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running");
});
app.get("/users", (req, res) => {
    db.query(
        "SELECT * FROM users",
        (err, result) => {
            if (err) {
                res.send(err);
                return;
            }

            res.send(result);
        }
    );
});
app.post("/signup", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, password],
        (err, result) => {

            if (err) {
                res.send(err);
                return;
            }

            res.send("User Created");
        }
    );

});
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                res.send(err);
                return;
            }

            if (result.length > 0) {
                res.send("Login Success");
            } else {
                res.send("Invalid Credentials");
            }
        }
    );
});
app.post("/tasks", (req, res) => {

    const { user_id, task } = req.body;

    db.query(
        "INSERT INTO tasks (user_id, task) VALUES (?, ?)",
        [user_id, task],
        (err, result) => {

            if (err) {
                res.send(err);
                return;
            }

            res.send("Task Added");
        }
    );

});
app.get("/tasks/:userId", (req, res) => {

    const userId = req.params.userId;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ?",
        [userId],
        (err, result) => {

            if (err) {
                res.send(err);
                return;
            }

            res.send(result);
        }
    );

});
app.put("/tasks/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE tasks SET completed = 1 WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                res.send(err);
                return;
            }

            res.send("Task Updated");
        }
    );

});
app.delete("/tasks/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                res.send(err);
                return;
            }

            res.send("Task Deleted");
        }
    );

});
app.delete("/hello", (req, res) => {
    console.log("DELETE /hello hit");
    res.send("DELETE works!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});