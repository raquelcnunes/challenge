const axios = require("axios");
const express = require("express");

const app = express();

let datasResult = [];

app.get("/", async (req, res) => {
  axios
    .get(
      "https://api.github.com/users/takenet/repos?per_page=100&sort=created&direction=asc"
    )
    .then(function (data) {
      datas = data.data;

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].language == "C#") {
          datasResult.push({
            id: datas[i].id,
            name: datas[i].name,
            description: datas[i].description,
            created_at: datas[i].created_at,
            language: datas[i].language,
            avatar: datas[i].owner.avatar_url,
          });
        }
      }
   
      console.log(datasResult);
      res.json(datasResult);
    })
    .catch(function (error) {
      if (error) {
        console.log(error);
      }
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor online.");
});
