// const input = document.getElementById('input-value')
const button = document.getElementById('search-button')

button.addEventListener("click", searchBooks)

function searchBooks() {

    const API_KEY = "AIzaSyAZuWkNYrGWFvy7EF0bble9NXR3bEHXZRk"
    const searchInput = document.getElementById('search-input').value

    // make request from Google Book API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${API_KEY}`).then(response => response.json())
        .then(data => displayResult(data))
        .catch(error => console.error('Error:', error))

}

function displayResult(data) {
    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML = ""

    if (data.items) {
        for (let i = 0; i < data.items.length; i++) {
            const book = data.items[i];
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : 'Unknown Authors';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ' ';
            const publishedDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : ' ';
            const previewLink = book.volumeInfo.previewLink || "#"
            const bookDiv = document.createElement('div');
            bookDiv.innerHTML = `
                        <h3><b>Title:</b> ${title}</h3>
                        <p><b>Authors:</b> ${authors}</p>
                        <p><b>Date Published:</b> ${publishedDate}</p>
                        <img src="${thumbnail}" alt="Book Cover">
                        <p><a href="${previewLink}" target="_blank">More info</p>
                        <hr>
                    `;
            resultContainer.appendChild(bookDiv);
        }
    } else {
        resultContainer.innerHTML = '<p>No results found</p>';
    }
}



function showLoader() {
    document.getElementById("loader").style.display = "block"
}
function hideLoader() {
    document.getElementById("loader").style.display = "none"
}
