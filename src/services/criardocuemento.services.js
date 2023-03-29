
//  Importação
const https = require('http');
const htmlDocx= require('html-docx-js');
const fs = require('fs');
    class geratordocumentos {
      criarmodelo1(req,res){
        // pegando os dados do corpo 
        var  pretitulo = req.body.titulo
        var  namearquivo = req.body.nomearquivo
        var  pretextarea = req.body.desc
        var  itemlista = req.body.itemlista

        // função para gerar a lista 
        var semilista = '<ul>'
        var contador = 1
        while(contador<=itemlista){
         semilista= semilista + `<li>item</li>`
         contador = contador + 1
        }
        var lista = semilista + '</ul>'

        // montando as partes do arquivo html
        var titulo = `<h1>${pretitulo}</h1>`
        var desc = `<p>${pretextarea}</p>`
        var Abertura = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Gerator Word</title></head><body>"
        var fechamento = "</body></html>"
        var documento = Abertura +titulo+lista+desc+fechamento;

        // Convetendo o arquivo html in docxs
        const docx = htmlDocx.asBlob(documento);

        // Fazendo donwload do documento
        var url = 'https://application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(docx);
        namearquivo = namearquivo?namearquivo +'.doc': 'document.doc';

        https.get(url,(res)=>{
          const arquivo = fs.createWriteStream(docx)
          res.pipe(arquivo);
        })
        arquivo.on('error', (err)=>{
          console.error(err);

        })


        arquivo.on("criado",()=>{
          arquivo.close();
          console.log("Feito")
        })

    


        
        

      }
    
 }

module.exports = geratordocumentos;