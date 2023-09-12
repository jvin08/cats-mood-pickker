import { catsData } from "./data.js";

const emotionRadiosEl = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifOptionBoxEl = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
// const memeModal = document.getElementById("meme-modal")
const closeModatBtn = document.getElementById("meme-modal-close-btn")
const outerModal = document.getElementById("outer")

emotionRadiosEl.addEventListener("change", highLightCheckedOption)

closeModatBtn.addEventListener("click", closeModal)

window.addEventListener("click", closeModalOutside)

getImageBtn.addEventListener("click", renderCat)

function highLightCheckedOption(e){
    const radioItemsArray = document.getElementsByClassName('radio')
    for(let item of radioItemsArray){
        item.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// close modal with "X"
function closeModal(){
    // memeModal.style.display = 'none'
    outerModal.style.display = 'none'
}
// close modal with outside click
function closeModalOutside(e){
    if(e.target === outerModal){
        outerModal.style.display = 'none'
    } 
}


// render Cat Object
function renderCat(){
    try {
        memeModalInner.innerHTML = ""
        const catObject = getSingleCatObject()
            memeModalInner.innerHTML += `
                                <img 
                                class="cat-img" 
                                src="./images/${catObject.image}"
                                alt="${catObject.alt}"
                                >`                  
            outerModal.style.display = 'block'
    } catch (error) {
        console.log('no matches')
    }
}
// singleCatObject
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray();
    if(catsArray.length === 1){
        return catsArray[0]
    } else {
        let catsNum = catsArray.length
        return catsArray[(Math.floor(Math.random()*catsNum))]
    }
}



function getMatchingCatsArray(){
    if(document.querySelector("input[type='radio']:checked")){
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifOptionBoxEl.checked

        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    } 
}


function getEmotionsArray(cats){
    const catsEmotions = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!catsEmotions.includes(emotion)){
                catsEmotions.push(emotion)
            }
        }
    }
    return catsEmotions;
}

function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    let stringHTML = ``
    for (let emotion of emotions){
        stringHTML += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio" 
                id="${emotion}" 
                name="emotions" 
                value="${emotion}"
            >
        </div>`
    }
    emotionRadiosEl.innerHTML = stringHTML
}
renderEmotionsRadios(catsData)
