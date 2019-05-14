const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Olho na Câmara!')
})

/**
 * Endpoints - /florianopolis
 * Vereadores: /vereadores - Mostra a lista de vereadores
 * Vereador ID: /vereador/:id - Busca o vereador por ID
 * Vereador Gasto Total Período: /vereador/:id/gastos/total/:periodo
 * Vereador Gastos <Categoria> Período: /vereador/:id/gastos/:categoria/:periodo
 * Ranking Geral: /ranking/geral
 * Ranking <Categoria>: /ranking/:categoria
 *
 */

app.listen(8080, () => console.log('Falcon running on port 8080'))
