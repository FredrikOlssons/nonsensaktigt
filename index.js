import express from "express";
import fetch from 'node-fetch';


const app = express()
const port = 3001


  
  app.use("/", express.static("Public"))
  let answer = ""
  
  app.get("/api/jokes", async (req, res) => {
    const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
    const data = await response.json()
    res.json(data)
  })
  
  app.listen(port, answer, () => {
    console.log(`App is running on port ${port}`);
    console.log(answer)
  })


  
/* const fetch = require('node-fetch');

const url = 'https://webknox-jokes.p.rapidapi.com/jokes/search?keywords=kick%2C%20hard&numJokes=5&category=Chuck%20Norris&minRating=5';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '673f83b3bemsh6ccbe3ea0e79ec0p1ee79djsnad735424c4db',
    'X-RapidAPI-Host': 'webknox-jokes.p.rapidapi.com'
  }
};

fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err)); */