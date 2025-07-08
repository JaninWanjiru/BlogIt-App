import express from 'express';

const app = express();

app.get('/', (_req, res) => {
    res.send(`<h1>You've unlocked Jane's Blog api</h1>`)
})

const port = process.env.PORT || 3850;
app.listen(port, () => console.log(`Server is running on port ${port}`));