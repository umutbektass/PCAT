const express = require("express");
const app = express();
const path = require("path")
app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'temp/index.html'))
})




const port = 3002;
app.listen(port, () => {
  console.log(`NodeJs ${port} da çalışıyor.`);
});
