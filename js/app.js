// const input = document.getElementById('input-value')
const button = document.getElementById('search-button')

// event listener to call the searchBooks function when user submits form
button.addEventListener('click', searchBooks)

// function to search books from Google Books API
function searchBooks() {
    const API_KEY = "AIzaSyAZuWkNYrGWFvy7EF0bble9NXR3bEHXZRk"
    const searchInput = document.getElementById('search-input').value

    // make request from Google Book API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${API_KEY}`).then(response => response.json())
        .then(data => displayResult(data))
        .catch(error => console.error('Error:', error))

}

// function to display the result of the search
function displayResult(data) {
    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML = ''

    if (data.items) {
        for (let i = 0; i < data.items.length; i++) {
            const book = data.items[i];
            const title = book.volumeInfo.title;

            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : 'Unknown Authors';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ' ';
            const publishedDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : ' ';
            const previewLink = book.volumeInfo.previewLink || '#'
            const bookDiv = document.createElement('div');
            bookDiv.setAttribute('class', 'card')
            bookDiv.innerHTML = `
                    <p><b>Title:</b> ${title}</p>
                    <p><b>Authors:</b> ${authors}</p>
                    <p><b>Date Published:</b> ${publishedDate}</p>
                    <img src="${thumbnail}" alt="Book Cover">
                    <a href="${previewLink}" target="_blank">More info</a>
                    `;
            resultContainer.appendChild(bookDiv);
        }
    } else {
        // if there are no results, display a message
        resultContainer.innerText = "No result found"
        // const noResultDiv = document.createElement('div')
        // noResultDiv.setAttribute('class', 'no-result')
        // noResultDiv.innerHTML = `<p>Enter Author, books or Subject ...</p>`
        // resultContainer.appendChild(noResultDiv)
        // resultContainer.insertBefore(noResultDiv, result)


        // message vanish in 3 seconds
        // setTimeout(() => { noResultDiv.remove() }, 3000)

    }

}
// create event listener to call the searchBooks function when user submits form
// function to create a new card for each book in the array of books and append it to the page
// function createBookCard(book) {
// // create a new div element
// const bookDiv = document.createElement('div');
// // set the class of the div to card
// bookDiv.setAttribute('class', 'card');
// // create a new h3 element
// const title = document.createElement('h3');
// // set the text of the h3 to the book's title
// title.textContent = book.title;
// // append the h3 to the div
// bookDiv.appendChild(title);
// // create a new p element
// const author = document.createElement('p');
// // set the text of the p to the book's author
// author.textContent = book.author;
// // append the p to the div
// bookDiv.appendChild(author);
// // create a new p element
// const date = document.createElement('p');
// // set the text of the p to the book's published date
// date.textContent = book.publishedDate;
// // append the p to the div
// bookDiv.appendChild(date);
// // create a new p element
// const description = document.createElement('p');
// // set the text




function showLoader() {
    document.getElementById("loader").style.display = 'block'
}
function hideLoader() {
    document.getElementById("loader").style.display = 'none'
}
