let fs = require('fs')
let PDFParser = require('pdf2json')

let pdfParser = new PDFParser(this, 1)

const convertPdfToTxt = (file) => {
  if (!file) {
    return console.log(`Error converting file (${file})!`)
  }
  pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError))
  pdfParser.on('pdfParser_dataReady', pdfData => {
    fs.writeFile(`${file.substr(1, file.indexOf('.'))}.txt`, pdfParser.getRawTextContent())
  })
  return pdfParser.loadPDF(file)
}

convertPdfToTxt('./sggp_janeiro_2016_2.pdf')
