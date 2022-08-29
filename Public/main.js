//import { nanoid } from "nanoid"

let insultContainer = document.getElementsByClassName('answerBoxA')[0]
insultContainer.innerText = 'Click below for your daily insult'
let personContainer = document.getElementsByClassName('answerBoxB')[0] //container
let universityContainer = document.getElementsByClassName('answerBoxC')[0]
let personBox = document.getElementsByClassName('personInfoBox')[0]
let imgPerson = document.getElementsByClassName('imgBox')[0]
let empty = document.getElementsByClassName('empty')[0]
let imgRight = document.getElementsByClassName('picRight')[0]
let imgLeft = document.getElementsByClassName('picLeft')[0]
let buttonForInsult = document.getElementById('btn1')
let buttonForPerson = document.getElementById('btn2')
let buttonForUniversity = document.getElementById('btn3')
//let clearButton = document.getElementById('btn4')
let favoritesContainer = document.getElementById('favorites')
let favoritesBtn = document.createElement('button')
favoritesBtn.classList.add('favoritesBtn')
favoritesBtn.innerText = 'Favorites'
let example = document.getElementsByClassName('example')[0]
example.classList.add('favoriteBtnContainer')
example.append(favoritesBtn)
let main = document.getElementsByTagName('main')





const getMyApi = () => {
    fetch("http://localhost:3001/api/").then((res) => {
        console.log(res)
        return res.json()
    }).then((apiData) => {
        console.log(typeof (apiData))
        console.log(apiData)
        renderCollectedList(apiData)
        console.log('getten funkade')
    }).catch((err) => {
        console.error('Fel i getten', err)
    })
}

/* const apiDataKeys = Object.keys(apiData);
renderCollectedList(apiDataKeys)
*/
function renderCollectedList(collectedList) {
    for (let i = 0; i < collectedList.length; i++) {
        let collectedItemFromList = collectedList[i];
        console.log(collectedItemFromList)

        let printCollectedItem = document.createElement('div')
        printCollectedItem.innerHTML = ("Name: " + collectedItemFromList.person.name.first + " " + collectedItemFromList.person.name.last + "<br>" + "University: " + collectedItemFromList.university.name + "<br>" + "Insult: " + collectedItemFromList.insult.insult)
        console.log(printCollectedItem)
        favoritesContainer.append(printCollectedItem)
    }
    main.append(printCollectedItem)

}


const getAnswerJokes = () => {
    console.log("test")
    fetch("http://localhost:3001/api/jokes").then((res) => {
        console.log(res)
        return res.json()
    }).then((data) => {
        console.log(data);
        insultAnswerFromApi = data
        console.log(insultAnswerFromApi)
        addInsultAnswerToBox()
        createSaveButton()
        showPics()
    }).catch((err) => {
        console.error('Fel förolämpning', err)
    })
}

const getAnswerPerson = () => {
    console.log("testPerson")
    fetch("http://localhost:3001/me/api/").then((res) => {
        console.log(res)
        return res.json()
    }).then((dataPerson) => {
        console.log(dataPerson);
        personAnswerFromApi = dataPerson.results[0]
        addPersonAnswerToBox()
        createSaveButton()
        showPics()
    }).catch((err) => {
        console.error('Fel person', err)
    })
}


const getAnswerUniversity = () => {
    console.log("testUniversity")
    fetch("http://localhost:3001/universities/api/").then((res) => {
        console.log(res)
        return res.json()
    }).then((dataUniversity) => {
        console.log(dataUniversity[8]);
        console.log(typeof(dataUniversity))
        universityAnswerFromApi = dataUniversity[Math.floor(Math.random() * dataUniversity.length)]
        addUniversityAnswerToBox()
        createSaveButton()
        showPics()
    }).catch((err) => {
        console.error('Fel universitet', err)
    })
}


//spara till globala och kontrollera att de är satta
let personAnswerFromApi = undefined
let insultAnswerFromApi = undefined
let universityAnswerFromApi = undefined

let objectPushed = false
let myFavorite = ''

let clearButton = document.createElement('button')
clearButton.innerText = 'Clear'
clearButton.classList.add('saveBtn')



function showPics() {
    console.log('kommer in')
    if (insultAnswerFromApi && universityAnswerFromApi && personAnswerFromApi) {

        let img1 = document.createElement('img')
        img1.classList.add('pic')
        img1.src = "./assets/abe (1).png"
        let img2 = document.createElement('img')
        img2.classList.add('pic')
        img2.src = "./assets/abe (1).png"
        console.log('kommer in två')
        imgLeft.append(img1)
        imgRight.append(img2)
    }
}
/* const getAnswerAll = () => {
    console.log("getAll")
    //fetch("http://localhost:3001/api/jokes").then((res) => {
        fetch("http://localhost:3001/api/").then((res) => {
            console.log(res)
            return res.json()
        }).then((data) => {
            console.log(data);
            allAnswers = data
            addAnswerToBox(allAnswers)
        })    
    } */

function addPersonAnswerToBox() {
    let personAnswerBox = document.createElement("h2");
    personAnswerBox.classList.add('answer');
    let personImgBox = document.createElement('img')
    personImgBox.classList.add('answerImg')

    console.log(personAnswerFromApi)
    personContainer.innerHTML = ''
    personImgBox.src = ""
    personAnswerBox.innerHTML = (`This is ${personAnswerFromApi.name.title}. ${personAnswerFromApi.name.first} ${personAnswerFromApi.name.last}`)
    personImgBox.src = personAnswerFromApi.picture.large

    if (personAnswerFromApi) {
        clearDivs()
    }

    imgPerson.append(personImgBox)
    personContainer.append(personAnswerBox)
    //createEmptyBox()
    //showPics()

}

function addUniversityAnswerToBox() {
    let universityAnswerBox = document.createElement("h2");
    universityAnswerBox.classList.add('answer');
    universityContainer.innerHTML = ''
    universityAnswerBox.innerHTML = (`From ${universityAnswerFromApi.name}`)
    console.log(universityAnswerFromApi)

    if (universityAnswerFromApi) {
        clearDivs()
    }

    universityContainer.append(universityAnswerBox)
    //createEmptyBoxUniversity()
    //showPics()
}

function addInsultAnswerToBox() {

    let insultAnswerBox = document.createElement("h2");
    insultAnswerBox.classList.add('answer');
    console.log('det går insult')
    insultContainer.innerHTML = ''
    insultAnswerBox.innerHTML = insultAnswerFromApi.insult
    console.log(insultAnswerFromApi)
    insultContainer.classList.remove()


    if (insultAnswerFromApi) {
        clearDivs()
    }

    insultContainer.append(insultAnswerBox)
    //showPics()
    //createEmptyBoxInsult()
}


function createSaveButton() {
    console.log(personAnswerFromApi)
    if (personAnswerFromApi && insultAnswerFromApi && universityAnswerFromApi) {
        let saveButton = document.createElement('button')
        saveButton.classList.add('saveBtn')
        saveButton.innerText = 'Spara favorit'
        example.append(saveButton)
        saveButton.addEventListener('click', saveToServer)
    }
}

const saveToServer = async (event) => {
    try {
        let objectToPush = {
            person: personAnswerFromApi,
            insult: insultAnswerFromApi,
            university: universityAnswerFromApi
        }
        console.log(objectToPush)
        const response = await fetch("http://localhost:3001/api", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objectToPush)
        })
        const body = await response.json()
        console.log(body)
        alert('Sparat till dina favoriter')
        window.location.reload()


    } catch (err) {
        console.log(err, 'inte rätt i POST')
    }
}


/*  let allNames = insultObject
for (let i = 0; i < allNames.length; i++) {
    const allUniversitys = allNames[i];
    console.log(allUniversitys)
    
    //answerFromApi.innerHTML = (`This is ${name}`)
    //answerFromApi.innerHTML = (`${allNames}`)
    
    
    insult.classList.add('answerBox')
    
    button.style.visibility = 'hidden'
    console.log(insult)
    
    insult.append(personAnswerFromApi, universityAnswerFromApi, insultAnswerFromApi)
    
    createEmptyBox()
}
} */

function createEmptyBoxPerson(person) {
    let personBtns = document.getElementById('insultBtn')
    let emptyBox = document.createElement('button')
    emptyBox.innerText = 'Ta bort'
    emptyBox.classList.add('emptyBox')
    emptyBox.addEventListener('click', () => {
        person.innerHTML = ''
    })

    personBtns.append(emptyBox)
}

function createEmptyBoxInsult(insult) {
    let insultBtns = document.getElementById('insultBtn')
    let emptyBox = document.createElement('button')
    emptyBox.innerText = 'Ta bort'
    emptyBox.classList.add('emptyBox')
    emptyBox.addEventListener('click', () => {
        insult.innerHTML = ''
    })

    insultBtns.append(emptyBox)
}

function createEmptyBoxUniversity(university) {
    let universeBtns = document.getElementById('universeBtn')
    let emptyBox = document.createElement('button')
    emptyBox.innerText = 'Ta bort'
    emptyBox.classList.add('emptyBox')
    emptyBox.addEventListener('click', () => {
        university.innerHTML = ''
    })

    universeBtns.append(emptyBox)
}

function createEmptyBox() {

    let emptyBox = document.createElement('button')
    emptyBox.innerText = 'Ta bort'
    emptyBox.classList.add('emptyBox')
    emptyBox.addEventListener('click', () => {
        window.location.reload()
    })
    empty.append(emptyBox)
}

function clearDivs() {
    if (insultAnswerFromApi && personAnswerFromApi && universityAnswerFromApi) {
        let clearButton = document.createElement('button')
        clearButton.innerText = 'Clear'
        clearButton.classList.add('saveBtn')
        clearButton.addEventListener('click', () => {
            window.location.reload()
        })
        empty.append(clearButton)
    }
}



buttonForInsult.addEventListener('click', getAnswerJokes)
buttonForPerson.addEventListener('click', getAnswerPerson)
buttonForUniversity.addEventListener('click', getAnswerUniversity)

favoritesBtn.addEventListener('click', getMyApi)
    //buttonForAll.addEventListener('click', )

