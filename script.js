const wordForm = document.getElementById("word-form");
const englishInput = document.getElementById("english-word");
const germanInput = document.getElementById("german-word");
const wordList = document.getElementById("word-list");

// Loads saved word pairs from the browser.
function loadWordPairs() {
  const savedPairs = localStorage.getItem("wordPairs");

  if (savedPairs === null) {
    return [];
  }

  return JSON.parse(savedPairs);
}

// Adds a submitted word pair and clears the form.
function addWordPair(englishWord, germanWord) {
  const wordPairs = loadWordPairs();
  wordPairs.push({
    english: englishWord,
    german: germanWord
  });
  localStorage.setItem("wordPairs", JSON.stringify(wordPairs));
  wordForm.reset();
  englishInput.focus();
  showWordPairs();
}

// Shows all saved word pairs in the list.
function showWordPairs() {
  const wordPairs = loadWordPairs();
  wordList.innerHTML = "";

  for (const wordPair of wordPairs) {
    const listItem = document.createElement("li");
    listItem.textContent = wordPair.english + " - " + wordPair.german;
    wordList.appendChild(listItem);
  }
}

// Handles the form submit button.
function handleSubmit(event) {
  event.preventDefault();
  const englishWord = englishInput.value.trim();
  const germanWord = germanInput.value.trim();

  if (englishWord === "" || germanWord === "") {
    return;
  }

  addWordPair(englishWord, germanWord);
}

wordForm.addEventListener("submit", handleSubmit);
showWordPairs();