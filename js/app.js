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
        data.items.forEach(book => {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Authors';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';

            const bookDiv = document.createElement('div');
            bookDiv.innerHTML = `<div style="float:left; width:33.3%"
                        <h3>${title}</h3>
                        <p>Authors: ${authors}</p>
                        <img src="${thumbnail}" alt="Book Cover">
                        <hr>
                    </div>`;
            resultContainer.appendChild(bookDiv);
        });
    } else {
        resultContainer.innerHTML = '<p>No results found</p>';
    }
}
