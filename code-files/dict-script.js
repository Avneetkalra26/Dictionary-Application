const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
function searchResult() {
    let inpWord = document.getElementById("type-word").value;
    if (inpWord == "") {
        Swal.fire({
            title: "Please Enter a Word",
            icon: "info"
        });
    }
    else {
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                result.innerHTML =
            `<div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
            </div>
            <div class="meaning">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
            </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "No example available"}
                </p>`;
                sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
            })

            .catch(() => {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            });

    }
}

function playSound() {
    sound.play();
}

