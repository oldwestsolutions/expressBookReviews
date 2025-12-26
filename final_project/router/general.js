const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  
  if (isValid(username)) {
    return res.status(400).json({message: "Username already exists"});
  }
  
  users.push({username: username, password: password});
  return res.status(200).json({message: "User successfully registered. Now you can login"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  try {
    let listOfBooks = await new Promise((resolve, reject) => {
      resolve(books);
    });
    return res.status(200).json(listOfBooks);
  } catch (error) {
    return res.status(500).json({message: "Error fetching books"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  try {
    let book = await new Promise((resolve, reject) => {
      if (books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject(new Error("Book not found"));
      }
    });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  const author = req.params.author;
  try {
    let booksByAuthor = await new Promise((resolve, reject) => {
      const matchingBooks = [];
      const bookKeys = Object.keys(books);
      
      for (let i = 0; i < bookKeys.length; i++) {
        const key = bookKeys[i];
        if (books[key].author === author) {
          matchingBooks.push({isbn: key, ...books[key]});
        }
      }
      
      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject(new Error("No books found by this author"));
      }
    });
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    return res.status(404).json({message: "No books found by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const title = req.params.title;
  try {
    let booksByTitle = await new Promise((resolve, reject) => {
      const matchingBooks = [];
      const bookKeys = Object.keys(books);
      
      for (let i = 0; i < bookKeys.length; i++) {
        const key = bookKeys[i];
        if (books[key].title === title) {
          matchingBooks.push({isbn: key, ...books[key]});
        }
      }
      
      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject(new Error("No books found with this title"));
      }
    });
    return res.status(200).json(booksByTitle);
  } catch (error) {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
