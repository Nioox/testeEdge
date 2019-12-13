'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresaSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments()
      table.string('empresa', 80).notNullable().unique()
      table.string('bi')
      table.string('painel')
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresaSchema
