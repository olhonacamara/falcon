const rp = require('request-promise')
const cheerio = require('cheerio')

const URL_TSE_PARTY_AFFILIATION = 'http://filiaweb.tse.jus.br/filiaweb/portal/relacoesFiliados.xhtml'

const getUrls = function () {
  return rp(URL_TSE_PARTY_AFFILIATION)
    .then((res) => {
      let $ = cheerio.load(res)
      let parties = []
      let ufs = []
      let urls = []

      $('#partido option').each((i, e) => {
        parties.push($(e).text())
      })

      $('#uf option').each((i, e) => {
        ufs.push($(e).text())
      })

      ufs.map(uf => {
        parties.map(p => {
          let party = p.toLowerCase().replace(/ /g, '_')
          let url = `http://agencia.tse.jus.br/estatistica/sead/eleitorado/filiados/uf/filiados_${party}_${uf.toLowerCase()}.zip`
          urls.push(url)
        })
      })
      return urls
    })
}

getUrls().then(res => {
  console.log(res)
})
