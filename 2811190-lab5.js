const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];
// Your routes here

{// example route
// app.get('/status',(req,res) => {
//     res.json({
//         status: 'Running',
//         timestamp: new Date().toISOString()
//     });
// });
}

app.get('/whoami',(req,res) => {
    const me = {studentNumber: '2811190'};
    res.send(me);
})

app.get('/books',(req,res) => {
    if(books.length === 0){
        return res.send('[]');
    }
    res.send(books);
});

app.get('/books/:id',(req,res) =>{
    const book =books.find(c =>c.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send({"error": "Book not found"});
    }
    res.send(book);
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});