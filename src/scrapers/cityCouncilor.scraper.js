const rp = require('request-promise')
const request = require('request')
const cheerio = require('cheerio')

const token = require('../utils/token.js')

const URL_COUNCIL_LIST_CMF = 'http://www.cmf.sc.gov.br/vereadores'
const URL_CMF = 'http://www.cmf.sc.gov.br'
const councilorList = []

const getPropositionType = (protocol) => {
  let shortType = protocol.substring(0, 3)
  let fullType = ''

  switch (shortType) {
    case 'PL.':
      fullType = 'Projeto de Lei'
      break
    case 'PLC':
      fullType = 'Projeto de Lei Complementar'
      break
    case 'MOC':
      fullType = 'Moção'
      break
    case 'PEL':
      fullType = 'Proposta de Emenda a Lei Orgânica'
      break
    case 'PR.':
      fullType = 'Projeto de Resolução'
      break
    case 'REQ':
      fullType = 'Requerimento'
      break
    case 'RCU':
      fullType = 'Recurso Regimental'
      break
    case 'PDL':
      fullType = 'Projeto de Decreto Legislativo'
      break
    default:
      fullType = 'Não encontrado'
  }

  return fullType
}

const getPropositions = (html) => {
  let propositions = []
  let $ = cheerio.load(html)
  $('div[class=panel-body]').find('div[class=proposicoes]').each((i, el) => {
    let protocol = $(el).find('h2').text()
    let proposition = {
      protocol: protocol,
      detailsLink: URL_CMF + $(el).find('h2 > a').attr('href'),
      type: getPropositionType(protocol),
      entryDate: $(el).find('div[class=data]').text().replace('Data de entrada: ', ''),
      author: $(el).find('div[class=autor]').text().replace('Autor: ', ''),
      abstract: $(el).find('div[class=ementa]').text()
    }
    propositions.push(proposition)
  })
  return propositions
}

const getCommissions = (html) => {
  let commissions = []
  let $ = cheerio.load(html)

  $('.group-vereador-comissoes > .panel-body > .list-group').find('a').each((i, e) => {
    let commission = {
      name: $(e).text(),
      link: URL_CMF + $(e).attr('href')
    }
    commissions.push(commission)
  })

  return commissions
}

// Start flow
const getCityCouncilorProfile = () => {
  rp(URL_COUNCIL_LIST_CMF)
    .then((res) => {
      console.log('# Iniciando extração de dados')
      let $ = cheerio.load(res)
      $('tbody').find('tr').each((i, e) => {
        let councilorProfile = {
          id: token.generate(),
          name: $(e).find('td > a.titulo').text(),
          party: $(e).find('td.views-field-field-imagem-partido').text().trim(),
          email: $(e).find('td.views-field-field-email').text().trim(),
          phone: $(e).find('td.views-field-field-vereadores-contatos').text().trim(),
          linkProfile: URL_CMF + $(e).find('td > a.titulo').attr('href')
        }
        councilorList.push(councilorProfile)
        console.log(`Perfil do vereador #${i + 1} - ${councilorProfile.name} - Extraído.`)
      })
      return councilorList
    })
    .then((res) => {
      return Promise.all(res.map((e) => {
        return new Promise((resolve, reject) => {
          request(e.linkProfile, (error, response, html) => {
            if (error) reject(error)
            let $ = cheerio.load(html)
            let description = $('div.field-item > p').text()
            let propositions = getPropositions(html)
            let commissions = getCommissions(html)

            let result = {
              description, propositions, commissions
            }
            resolve(result)
          })
        })
      })).then((res) => {
        res.map((e, i) => {
          councilorList[i].description = e.description
          councilorList[i].propositions = e.propositions
          councilorList[i].commissions = e.commissions
        })
        console.log(councilorList)
      })
    })
    .catch((error) => {
      console.error('Error!', error)
    })
  rp(URL_COUNCIL_LIST_CMF)
    .then((res) => {
      console.log('# Iniciando extração de dados')
      let $ = cheerio.load(res)
      $('tbody').find('tr').each((i, e) => {
        let councilorProfile = {
          id: token.generate(),
          name: $(e).find('td > a.titulo').text(),
          party: $(e).find('td.views-field-field-imagem-partido').text().trim(),
          email: $(e).find('td.views-field-field-email').text().trim(),
          phone: $(e).find('td.views-field-field-vereadores-contatos').text().trim(),
          linkProfile: URL_CMF + $(e).find('td > a.titulo').attr('href')
        }
        councilorList.push(councilorProfile)
        console.log(`Perfil do vereador #${i + 1} - ${councilorProfile.name} - Extraído.`)
      })
      return councilorList
    })
    .then((res) => {
      return Promise.all(res.map((e) => {
        return new Promise((resolve, reject) => {
          request(e.linkProfile, (error, response, html) => {
            if (error) reject(error)
            let $ = cheerio.load(html)
            let description = $('div.field-item > p').text()
            let propositions = getPropositions(html)
            let commissions = getCommissions(html)

            let result = {
              description, propositions, commissions
            }
            resolve(result)
          })
        })
      })).then((res) => {
        res.map((e, i) => {
          councilorList[i].description = e.description
          councilorList[i].propositions = e.propositions
          councilorList[i].commissions = e.commissions
        })
        console.log(councilorList)
      })
    })
    .catch((error) => {
      console.error('Error!', error)
    })
}

getCityCouncilorProfile()