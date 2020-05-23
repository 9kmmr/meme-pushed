const express = require('express');
const fs = require ('fs');
const app = express();

port = 3000;
var allMemes=[];

function readData() {
    const path = "./data/example.json";
    return  fs.readFileSync(path, {encoding: "utf8"}) ;  
}


allMemes =  readData();
if (allMemes.length)
    allMemes = JSON.parse(allMemes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port} !`);
});
app.use(express.static('data'))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/alls', (req, res) => {
    res.send(allMemes);
});
app.get('/:memeId', (req, res) => {

    res.send(getMeme(req.params.memeId));
});


app.post('/add-meme', (req, res) => {
    res.send("il make it later");
});





const getMeme = function(memeId) {
    if (allMemes.length >0) {
        if (allMemes[memeId]) 
            return allMemes[memeId];        
    }
    return null;
}


