const books = [
    { title: "The Hobbit", author: "J.R.R. Tolkien", rating: 4.8, checkedOut: false, genre: "Fantasy" },

    { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", rating: 4.9, checkedOut: false, genre: "Fantasy" },

    { title: "1984", author: "George Orwell", rating: 4.2, checkedOut: true, genre: "Dystopian" },

    { title: "Twilight", author: "Stephenie Meyer", rating: 3.7, checkedOut: true, genre: "Young Adult" },

    { title: "Dune", author: "Frank Herbert", rating: 4.6, checkedOut: false, genre: "Science Fiction" },

    { title: "Moby Dick", author: "Herman Melville", rating: 3.6, checkedOut: true, genre: "Classic" },

    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 3.9, checkedOut: false, genre: "Classic" },

    { title: "Fifty Shades of Grey", author: "E.L. James", rating: 2.8, checkedOut: true, genre: "Romance" },

    { title: "The Alchemist", author: "Paulo Coelho", rating: 4.1, checkedOut: false, genre: "Fiction" },

    { title: "Eragon", author: "Christopher Paolini", rating: 2.5, checkedOut: false, genre: "Fantasy" },

    { title: "The Da Vinci Code", author: "Dan Brown", rating: 3.8, checkedOut: true, genre: "Mystery" }
];

const resultContainer = document.getElementById("resultContainer");


function filterBooks(){
    //get elements
    let resultContainer = document.getElementById("resultContainer");
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let noResults = document.getElementById("noResults");
    //saerchInput
    if (searchInput === "") {
        alert("Please enter a search");
        //use toggle instead of changing display
        return;
    }

    //filter books
    const filteredBooks = books.filter(book => {
       //matched author/tittle
        let titleMatch = book.title.toLowerCase().includes(searchInput);
        let authorMatch = book.author.toLowerCase().includes(searchInput);
        let genreMatch = book.genre.toLowerCase().includes(searchInput);
        return titleMatch || authorMatch || genreMatch;
    })

    if(filteredBooks.length === 0){
       // alert("No books found.");
        setTimeout( () =>
        {alert("Please enter a search item")},
            0);
        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";

    //if true, display books
    displayBooks(filteredBooks, resultContainer);

}

function createBookCard(book){
    //create div
    const card = document.createElement("div");
    let availability = book.checkedOut ? "Available" : "Checked Out";
    //structure cards
    card.classList.add("p-2","text-light", "mt-4", "rounded");

    // add classes depending on rating
    if(book.rating >= 4.0){
        card.classList.add("bg-success");
    } else if(book.rating >= 3.5 && book.rating < 4.0){
        card.classList.add("bg-warning");
    } else {
        card.classList.add("bg-danger");
    }
    card.innerHTML = `
    <h5 class="card-title mb-3"><b>Card Title: ${book.title}</b></h5>
    <h5 class="card-title mb-3"><b>Author: ${book.author}</b></h5>
    <h5 class="card-title mb-3"><b>Rating: ${book.rating}</b></h5>
    <h5 class="card-title mb-3"><b>Status: ${availability}</b></h5>    
    <h5 class="card-title mb-3"><b>Genre: ${book.genre}</b></h5>
    `;

    return card;
}

function displayBooks(booksToDisplay, container){
    container.innerHTML = "";

    booksToDisplay.forEach(book => {
        let card = createBookCard(book);
        container.appendChild(card);
    })

}

function clearSearch(){
    window.location.reload();
}

function showForm(){
    let form = document.getElementById("addBookForm");

    if(form.style.display === "block"){
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
    //ternary looks weird ?
    //form.style.display = form.style.display === "block" ? "none" : "block";
}

function submitNewBook(){
    let resultContainer = document.getElementById("resultContainer");
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let genre = document.getElementById("genre").value;
    let rating = document.getElementById("rating").value;
    let isChecked = document.getElementById("checkedOut").checked;
    //console.log(title, author, genre, rating, isChecked);
    //create new book object
    const newBook = {
        title: title,
        author: author,
        genre: genre,
        rating: rating,
        checkedOut: isChecked
    };

    //add new book
    if(title !== "" && author !== "" && genre !== "" && rating !== ""){
        books.push(newBook);
        displayBooks(books, resultContainer);
        console.log(books);
    } else {
        alert("please fill all inputs");
    }

}

//show card books at load
 displayBooks(books, resultContainer);