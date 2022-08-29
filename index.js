import express, { json } from "express";
import fetch from 'node-fetch';
import { nanoid } from "nanoid";


const app = express()
const port = 3001

app.use("/", express.static("Public"))
app.use(express.json())


let listOfObjects = []

app.get("/api/jokes", async (req, res) => {
  try {
    const responseInsult = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
    console.log('Insult')
    console.log(responseInsult)
    const dataInsult = await responseInsult.json()
    res.json(dataInsult)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

app.get("/me/api/", async (req, res) => {
  try {
    const responsePerson = await fetch('https://randomuser.me/api/')
    console.log('Person')
    console.log(responsePerson)
    const dataPerson = await responsePerson.json()
    res.json(dataPerson)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})

app.get("/universities/api/", async (req, res) => {
  try {
    const responseUniversity = await fetch('http://universities.hipolabs.com/search?country=United+States')
    console.log('University')
    console.log(responseUniversity)
    const dataUniversity = await responseUniversity.json()
    res.json(dataUniversity)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
}
)

console.log(typeof (listOfObjects))

app.post("/api", (req, res) => {
  try {
    console.log(req.body)
    let objectAddedToList = req.body
    objectAddedToList.id = nanoid()
    listOfObjects.push(objectAddedToList)
    console.log(listOfObjects)
    res.json('Det gick att spara')
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})


app.get("/api", async (req, res) => {
  try {
    console.log(listOfObjects)
    res.json(listOfObjects)
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})


app.get("/api/:id", async (req, res) => {
  try {
    const foundId = listOfObjects.find(foundObject => foundObject.id == req.params.id)
    console.log('objectFound')
    if (foundObject.id == req.params.id) {
      console.log('NOOOOO')
      if (foundObject) {
        res.json(foundId)
      } else {
      }
    }
  } catch (err) {
    console.error(err)
    res.json(err)
  }
})


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})





  //Bygga mini-applikationer
  //const userRouter = express.Router()
  //userRouter.get(function (req, res) {/*....*/})
  //userRouter.post(function (req, res) {/*....*/})
  //userRouter.put(function (req, res) {/*....*/})
  //userRouter.delete(function (req, res) {/*....*/})

  //bas-URL + funktioner för CRUD
  //app.use('/users', useRouter)

  //