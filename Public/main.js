let insult = document.getElementsByClassName('answerBox')[0]
let button = document.getElementsByTagName('button')[0]


const getAnswer = () => {
    console.log("test")
    fetch("http://localhost:3001/api/jokes").then((res) => {
        console.log(res)
        return res.json()
    }).then((data) => {
        console.log(data);
        insultObject = data
        addAnswerToBox(insultObject)
    })
}



function addAnswerToBox(insultObject) {
    
    let answerFromApi = document.createElement("h2");
    answerFromApi.classList.add('answer');
    console.log(answerFromApi)
    console.log('det går')
    answerFromApi.innerHTML = insultObject.insult
    
    console.log(insult)
    
    insult.append(answerFromApi)

}


button.addEventListener('click', getAnswer)