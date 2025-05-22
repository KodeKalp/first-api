const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express()
app.use(express.json());
app.use(cors());


const port = 3111

mongoose.connect("mongodb+srv://vaibhavkatre005:cwfAn86SRKWLLLAk@cluster0.rwwla38.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0", {
}).then(()=>{
    console.log("Mongo DB Connected");
}).catch(error =>{
    console.log(error)
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number
})
const Book = mongoose.model('Book', bookSchema)

// const books = [
//     { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
//     { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
//     { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
// ];

app.get('/api/books', async(req, res) => {
    const books = await Book.find();
    res.json(books)
})

app.get('/api/books/:id', async(req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (book)
        res.json(book)
    else
        res.status(404).json({ message: "Book Not Found" })
})

app.post('/api/books', async(req, res) => {

    const body = req.body;
    console.log(body)

    // const newBook = new Book(body)
    const newBook = new Book({
        title : body.title,
        author : body.author,
        year: parseInt(body.year)
    })

    await newBook.save();
    res.status(201).json(newBook)



    // const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
    // const newBook = {
    //     id: newId,
    //     title : body.title,
    //     author : body.author,
    //     year: parseInt(body.year)
    // }
    // books.push(newBook);

    // res.status(201).json(books)
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