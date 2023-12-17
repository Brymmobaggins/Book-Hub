
const button = document.getElementById('search-button')


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

        showLoader()

        setTimeout(() => {
            hideLoader()

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
                setTimeout(() => { showLoader() }, 3000);
            }
        }, 1000);
    } else {
        hideLoader()

        // if there are no results, display a message
        const noResultDiv = document.createElement('div')
        noResultDiv.setAttribute('class', 'no-result')
        noResultDiv.innerHTML = `<p>Enter Author, books or Subject ...</p>`
        resultContainer.appendChild(noResultDiv)

        // message vanish in 3 seconds
        setTimeout(() => { noResultDiv.remove() }, 3000)

    }

}

//  function to show loader
function showLoader() {
    document.getElementById("loader").style.display = 'block'
}

// function to hide loader
function hideLoader() {
    document.getElementById("loader").style.display = 'none'
}

// 
// event listener to call the searchBooks function when user submits form
button.addEventListener('click', searchBooks)
