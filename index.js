const express = require("express");
var bodyParser = require("body-parser");
// Database
const database = require("./database");
// Initializing express
const nimshi = express();
nimshi.use(bodyParser.urlencoded({extended: true}));
nimshi.use(bodyParser.json());   //Ye sirf added security ( to be on safe side ) ke liye h {ye sort of json format hi allow karega, uss cheez ki guarantee deta h}
/*
Route -> /
Description -> Get all books 
Parameter -> None
Access -> Public
Method -> GET
*/

nimshi.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route -> /is
Description -> Get specific book using ISBN 
Parameter -> ISBN
Access -> Public
Method -> GET
*/

nimshi.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN == req.params.isbn
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for given isbn ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route -> /ge
Description -> Get book using genre 
Parameter -> genre
Access -> Public
Method -> GET
*/

nimshi.get("/ge/:genre", (req, res) => {
  const getBookByGenre = database.books.filter((book) =>
    book.genre.includes(req.params.genre)
  );
  if (getBookByGenre.length === 0) {
    return res.json({
      error: `Book not found of given genre ${req.params.genre}`,
    });
  }
  return res.json({ book: getBookByGenre });
});

/*
Route -> /lang
Description -> Get book using language 
Parameter -> language
Access -> Public
Method -> GET
*/

nimshi.get("/lang/:language", (req, res) => {
  const getBookByLanguage = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );
  if (getBookByLanguage.length === 0) {
    return res.json({
      error: `Book not found of given language ${req.params.language}`,
    });
  }
  return res.json({ book: getBookByLanguage });
});

// Now working on "get" API regarding Author

/*
Route -> /allauthor
Description -> Get all authors
Parameter -> None
Access -> Public
Method -> GET
*/

nimshi.get("/allauthor", (req, res) => {
  return res.json({ author: database.author });
});

/*
Route -> /auid
Description -> Get specific author using ID
Parameter -> ID
Access -> Public
Method -> GET
*/

nimshi.get("/auid/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.ID == req.params.id
  );
  if (getSpecificAuthor.length === 0) {
    return res.json({ error: `No author found with id ${req.params.id}` });
  }
  return res.json({ author: getSpecificAuthor });
});

/*
Route -> /aubook
Description -> Get author of any book
Parameter -> books
Access -> Public
Method -> GET
*/

nimshi.get("/aubook/:books", (req, res) => {
  const getAuthorByBooks = database.author.filter((author) =>
    author.books.includes(req.params.books)
  );
  if (getAuthorByBooks.length === 0) {
    return res.json({
      error: `No author was found for given book ${req.params.books}`,
    });
  }
  return res.json({ author: getAuthorByBooks });
});

// Ye wala tareeka mam ka h lekin iss code mein yeh kaam nahi karra h (U can try for urself)

/*
Route -> /author/book
Description -> Get author of any book
Parameter -> isbn
Access -> Public
Method -> GET
*/

nimshi.get("/author/books/:isbn", (req, res) => {
  const getAuthorByBooks = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (getAuthorByBooks.length === 0) {
    return res.json({
      error: `No author was found for given book ${req.params.isbn}`,
    });
  }
  return res.json({ author: getAuthorByBooks });
});

// Now working on "get" API regarding Publication

/*
Route -> /allpublication
Description -> Get all authors
Parameter -> None
Access -> Public
Method -> GET
*/

nimshi.get("/allpublication", (req, res) => {
  return res.json({ publication: database.publication });
});

/*
Route -> /pbid
Description -> Get specific Publication using ID
Parameter -> ID
Access -> Public
Method -> GET
*/

nimshi.get("/pbid/:id", (req, res) => {
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.ID == req.params.id
  );
  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No publication found with given id ${req.params.id}`,
    });
  }
  return res.json({ publication: getSpecificPublication });
});

/*
Route -> /pbbook
Description -> Get publication of any book
Parameter -> books
Access -> Public
Method -> GET
*/

nimshi.get("/pbbook/:books", (req, res) => {
  const getPublicationByBooks = database.publication.filter((publication) =>
    publication.books.includes(req.params.books)
  );
  if (getPublicationByBooks.length === 0) {
    return res.json({
      error: `No publication found by this book ${req.params.books}`,
    });
  }
  return res.json({ publication: getPublicationByBooks });
});





// POST
/*
Route -> /book/new
Description -> Add a new book
Parameter -> None
Access -> Public
Method -> POST
*/

nimshi.post("/book/new", (req,res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});

/*
Route -> /publication/new
Description -> Add a new publication
Parameter -> None
Access -> Public
Method -> POST
*/

nimshi.post("/allpublication/new", (req,res) => {     //jis id se all publication access kri thi wohi id se new publication add karni hogi 
  const newPubs = req.body;
  database.publication.push(newPubs);
  return res.json(database.publication);
});

/*
Route -> /author/new
Description -> Add a new author
Parameter -> None
Access -> Public
Method -> POST
*/

nimshi.post("/allauthor/new", (req,res) => {          //jis id se all authors access kra tha wohi id se new new author add karna hoga
  const newAuth = req.body;
  database.author.push(newAuth);
  return res.json(database.author);
});


// PUT 


/*
Route -> /publication/update/book
Description -> Update/add a new publication
Parameter -> ISBN
Access -> Public
Method -> PUT 
*/

nimshi.put("/publication/update/book/:isbn", (req,res) => {
  // Update the publication database
  database.publication.forEach((pub) => {
    if(pub.ID === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  // Update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });
  return res.json(
    {
    book: database.books,
    publications: database.publication,
    message: "successfully updated publication"
  }
  );
});



// DELETE Command
/*
Route -> /book/delete
Description -> Delete a book
Parameter -> ISBN
Access -> Public
Method -> DELETE
*/
nimshi.delete("/book/delete/:isbn", (req,res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;
  return res.json({books: database.books});
})

/*
Route -> /book/deleted/author
Description -> Delete a author from a book 
Parameter -> ISBN, authorId
Access -> Public
Method -> DELETE
*/
nimshi.delete("/book/deleted/author/:isbn/:authorId", (req,res) => {        //dhyaan se isme "deleted" keyword ka use kra h aur neeche wale mein "delete" ka
  database.books.forEach((book)=> {
    if(book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  });
  return res.json({
    book: database.books,
    message: "author was deleted from the book"
  });
  });


/*
Route -> /book/delete/author
Description -> Delete a author from a book and related book from author
Parameter -> ISBN, authorId
Access -> Public
Method -> DELETE
*/
nimshi.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
  // Update the book database
  database.books.forEach((book)=> {
    if(book.ISBN === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  });

  // Update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.ID === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book != req.params.isbn
      )
      eachAuthor.books = newBookList;
      return;
    };
  });
  return res.json({
    book: database.books,
    author: database.author,
    message: "author was deleted from the book as well as vice versa"
  });
});















nimshi.listen(3000, () => {
  console.log("Server up");
});
