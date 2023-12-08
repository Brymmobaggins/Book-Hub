const input = document.getElementById('input-value')
const searchButton = document.getElementById('search-button')






function checkInput() {
    if (input.value == null) {
        searchButton.disabled = false
    } else {
        searchButton.disabled = true
    }

}
searchButton.addEventListener("click", checkInput)

function searchBooks(){
    const API_KEY = 
}