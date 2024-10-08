import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const username = "KrzysztofSw";
const password = "Krzysztof2003";
const yourBearerToken = "b656226e-b8d0-4f2f-9e2f-08327650d192";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  let data = req.body.secret;
  let score = req.body.score;
  let head = {
    "secret": data,
    "score": score
  };
  //console.log(data);
  //console.log(score);
  try{
    let result = await axios.post(API_URL + "/secrets", head, config);
    console.log(result);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.render("index.ejs", {content: JSON.stringify(error.response.data)});
  }

});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  let data = req.body.secret;
  let score = req.body.score;
  let head = {
    "secret": data,
    "score": score
  };

  try{
    let result = await axios.put(API_URL + "/secrets/" + searchId, head, config);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.render("index.ejs", {content: JSON.stringify(error.response.data)});
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  let patchData = { ...req.body };
  delete patchData.id;
  
  try{
    let result = await axios.patch(API_URL + "/secrets/" + searchId, patchData, config);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.render("index.ejs", {content: JSON.stringify(error.response.data)});
  }

});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try{
    let result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.render("index.ejs", {content: JSON.stringify(error.response.data)});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
