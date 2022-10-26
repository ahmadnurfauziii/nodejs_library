const {json} = require("body-parser");
const { response } = require("express");
const { rmSync } = require("fs");
const {stringify} = require("querystring");
const books = require('../buku_data');

let bookDirectory = books;


const bookRoutes = (app, fs) => {

    // variables
    const dataPath = './buku.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        })
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        })
    }
    // read
    app.get('/books', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(books)
        })
    })
    // by Id
    // app.get('/books/:id', function (req, res) {
    //     // First retrieve existing book list
    //     fs.readFile( dataPath, 'utf8', function (err, data) {
            
    //        const books = JSON.parse(data);
    //        const buku = books["buku" + req.params.id] 
    //        console.log( buku );
    //        res.end(JSON.stringify(buku));
    //     });
    //  })
    app.get('/books/:id', function (req,res) {
        const {id} = req.params;

        const books = bookDirectory.find(book => book.id == id);
        if (!books) return res.status(404).send('Book does not exist');

        res.send(books);
    });
    //  by Key
     app.get('/books/:key',(req,res)=>{
        fs.readFile(dataPath, 'utf8',(err,data) => {
            if (err) {
                throw err;
            }
            const books = JSON.parse( (data) );
            const buku = books["book", ["judul"] + req.param.key]
            console.log(buku)
            res.end(JSON.stringify(buku));
        })
     })
     app.get('/books/search', (req,res) => {
        const books = bookDirectory.find();


     })
    // create
    app.post('/books', (req, res) => {
        readFile(data => {

                const newBookId = Date.now().toString();

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('buku baru telah ditambahkan')
                })
            },
            true);
    })
    // Update
    app.put('/books/:id', (req, res) => {
        readFile(data => {
                const bookId = req.params["id"];
                data[bookId] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('books id:${bookId} updated')
                })
            },
            true);
    })
    app.get('/books', (req, res, next) => {
        const filters = req.query;
        const books = bookDirectory.filter(books => {
          let isValid = true;
          for (key in filters) {
            console.log(key, books[key], filters[key]);
            isValid = isValid && books[key] == filters[key];
          }
          return isValid;
        });
        res.send(books);
      });

    // Delete
    app.delete('/books/:id', (req, res) => {

        readFile(data => {
                const bookId = req.params["id"];
                delete data[bookId];


                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('books id:${bookId} removed')
                })
            },
            true);
    })
}

module.exports = bookRoutes;