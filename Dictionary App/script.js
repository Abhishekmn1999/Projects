const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    resultDiv.innerHTML = "Fetching Data....";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0];

    resultDiv.innerHTML = `
            <h2><strong>Word:</strong>${data[0].word}</h2>
            <p class="partofSpeech"> ${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong>: ${
              definitions.definition === undefined
                ? "Not Found"
                : definitions.definition
            }</p>
            <p><strong>Example:</strong>: ${
              definitions.example === undefined
                ? "Not Found"
                : definitions.example
            }</p>
            <p><strong>Antonyms:</strong></p>
            <ul id="antonymsList"></ul>
            <p><strong>synonyms:</strong></p>
            <ul id="synonymsList"></ul>`;

    // Fetching Antonyms
    const antonymsList = document.getElementById("antonymsList");
    if (definitions.antonyms.length === 0) {
      antonymsList.innerHTML = `<li>Not Found</li>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        antonymsList.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    // Fetching synonyms
    const synonymsList = document.getElementById("synonymsList");
    if (definitions.antonyms.length === 0) {
      synonymsList.innerHTML = `<li>Not Found</li>`;
    } else {
      for (let i = 0; i < definitions.synonyms.length; i++) {
        synonymsList.innerHTML += `<li>${definitions.synonyms[i]}</li>`;
      }
    }

    // Adding Read more Button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    // Handle error
    resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
  }
  console.log(data);
};
