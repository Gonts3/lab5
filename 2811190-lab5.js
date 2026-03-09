const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];
// Your routes here



app.get('/whoami',(req,res) => {
    const me = {studentNumber: '2811190'};
    res.send(me).json();
})

app.get('/books',(req,res) => {
    if(books.length === 0){
        return res.send('[]').json();
    }
    res.send(books).json();
});

app.get('/books/:id',(req,res) =>{
    const book =books.find(c =>c.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send({"error": "Book not found"}).json();
    }
    res.send(book).json();
})

app.post('/books',(req,res) => {
    if(!req.body.title || !req.body.id){
        res.status(404).send({ "error": "Missing required fields"}).json();
    }
    const book = {id: books.length+1,
                 title: req.body.title,
                 details: req.body.details
    };
    books.push(book);
    res.status(201).send(book).json();
})

app.put('/books/:id',(req,res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send({"error": "Book not found"}).json();
    }
    book.title = req.body.title || book.title;
    book.details = req.body.details || book.details;
    res.send(book).json();
})


// cehck this
app.delete('/books/:id',(req,res) => {
    const book =books.find(c =>c.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send({"error": "Book not found"}).json();
    }
    const idx = books.indexOf(book);
    books.splice(idx,1);
    res.status(204).send().json();
});


app.post('/books/:id/details',(req,res) => {
    const book =books.find(c =>c.id === parseInt(req.params.id));
        if(!book){
            res.status(404).send({"error": "Book not found"}).json();
        }
    book.details = [
        {
            id: req.body.id,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear
        }
    ];
    res.status(201).send(book).json();
});

app.delete('/books/:id/details/:detailId', (req, res) => {

    const book = books.find(b => String(b.id) === String(req.params.id));

    if (!book) {
        res.status(404).send({"error": "Book or detail not found"}).json();
    }

    const detailIndex = book.details.findIndex(d => String(d.id) === String(req.params.detailId));

    if (detailIndex === -1) {
        res.status(404).send({"error": "Book or detail not found"}).json();
    }

    book.details.splice(detailIndex, 1);

    res.status(200).send().json();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});