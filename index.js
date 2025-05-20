const express = require('express');

const app = express()

const port = 3111

const books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

app.get('/', (req, res)=>{
    res.send("Hello NMD")
})

app.get('/api/books', (req, res)=>{
    res.json(books)
})

app.get('/api/books/:id', (req, res)=>{
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId)
    
    if (book)
        res.json(book)
    else
        res.status(404).json({message: "Book Not Found"})
})

app.get('/time', (req, res)=>{
    const currentTime= new Date().toLocaleDateString();
    console.log("current Time: ", currentTime)
    res.send(`Current DAte: ${currentTime}`) 
})

app.listen(port, ()=>{
    console.log(`server is running on port no. ${port}`)
})