const express = require('express');

const app = express()

const port = 3111

const books = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

app.get('/api/books', (req, res) => {
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(book => book.id === bookId)

    if (book)
        res.json(book)
    else
        res.status(404).json({ message: "Book Not Found" })
})

app.post('/api/books', (req, res) => {
   

    const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    const newBook = {
        id: 5,
        title: "YYAAYA",
        author: "RETYR",
        year: 2001
    }
    books.push(newBook);

    res.status(201).json(books)
})

app.delete('/api/books/:id', (req, res) => {
    console.log("delete ")
    const bookId = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === bookId)

    const deletedBook = books.splice(bookIndex, 1);
    res.status(201).json(books)
})


app.listen(port, () => {
    console.log(`server is running on port no. ${port}`)
})