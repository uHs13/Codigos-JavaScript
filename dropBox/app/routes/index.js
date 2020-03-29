var express = require("express");
var router = express.Router();
let formidable = require("formidable");
let fs = require("fs");//módulo do node que manipula arquivos

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST upload */
router.post("/upload", (req, res) => {

  //recuperando os dados enviados na rota 
  let form = new formidable.IncomingForm({

    uploadDir: "./upload", // dentro da pasta raiz do projeto ele vai procurar uma pasta chamada upload
    keepExtensions: true //colocamos essa configuração para o formidable manter a extensão do arquivo recebido. Se não colocarmos isso ele remove a extensão e o arquivo não abre

  });

  //interpreta os dados que estão sendo recebidos
  form.parse(req, (err, fields, files) => {

    res.json({

      files

    });

  });

});
//.post("/upload")

/* DELETE */
router.delete("/file", (req, res) => {

  //Toda vez que fazemos alterações nos arquivos do node temos que reiniciar o serviço

  //recuperando os dados enviados na rota 
  let form = new formidable.IncomingForm({

    uploadDir: "./upload", // dentro da pasta raiz do projeto ele vai procurar uma pasta chamada upload
    keepExtensions: true //colocamos essa configuração para o formidable manter a extensão do arquivo recebido. Se não colocarmos isso ele remove a extensão e o arquivo não abre

  });

  //interpreta os dados que estão sendo recebidos
  form.parse(req, (err, fields, files) => {

    let path = "./" + fields.path;

    if (fs.existsSync(path)) {

      fs.unlink(path, e => {

        if (e) {

          res.status(400).json({
            error: e
          });

        } else {

          res.json({

            fields
      
          });

        }

      });

    } else {

      res.status(404).json({
  
        error:"The required file do not exists"
  
      });
  
    }

  });

});
//.delete("/file")

// Open File
router.get("/file", (req, res) => {

  let path = "./" + req.query.path;
  
  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data) => {

      if (err) {
      
        console.error(err);

        res.status(400).json({eror:err});

      } else {

        res.status(200).end(data);

      }

    });

  } else {

    res.status(404).json({

      error:"The required file do not exists"

    });

  }

});
//.get("/file")

module.exports = router;
