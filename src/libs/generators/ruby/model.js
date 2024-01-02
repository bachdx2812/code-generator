import { lowerCase, snakeCase, upperFirst } from 'lodash'
import pluralize from 'pluralize'

import SchemaGenerator from './schemaGenerator'
import ModelGenerator from './modelGenerator'

import ModelAttribute from './modelAttribute'

class Model {
  constructor(name, attributes) {
    this.attributes = attributes
    this.setName(name)
    // TODO: add table charset, default: "utf8mb4"
    // TODO: add table collation, default: "utf8mp4_unicode_ci"
    // TODO: add indexes

    this.schemaScript = null
    this.modelScript = null
  }

  setName(name) {
    this.name = name
    this.tableName = snakeCase(pluralize(this.name))
    this.className = upperFirst(pluralize(this.name, 1))
    this.modelFileName = lowerCase(pluralize(this.name, 1))
  }

  addNewAttribute() {
    this.attributes.push(new ModelAttribute())
  }

  removeAttribute(attribute) {
    let removeIndex = this.attributes.findIndex((a) => a.id == attribute.id)
    this.attributes.splice(removeIndex, 1)
  }

  async generateSchemaScript() {
    const schemaGenerator = new SchemaGenerator(this)
    this.schemaScript = await schemaGenerator.build()
  }

  async generateModelScript() {
    const modelGenerator = new ModelGenerator(this)
    this.modelScript = await modelGenerator.build()
  }
}

export default Model
