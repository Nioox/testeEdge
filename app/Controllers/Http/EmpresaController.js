'use strict'

const Empresa = use('App/Models/Empresa')

class EmpresaController {

  async index ({ request, response, view }) {
    const data = await Empresa.all()

    return {data}
  }

  async store ({ request }) {

    const data = request.all()

    const empresas = await Empresa.create(data)

    return empresas  
     
  }
  
  async show ({ params}) {
    const empresa = await Empresa.findByOrFail(params)
     
    return empresa
  }

  async update ({ request }) {
    const {id} = request.all()

    const empresas = await Empresa.findByOrFail('id', id)
    try{
    const data = request.all();
  
    empresas.merge(data);
    await empresas.save();

    return empresas
    }
    catch(err){
      return response.status(200).send(err)
    }
  }

  async destroy ({ params, response }) {
    const empresa = await Empresa.findByOrFail(params)
    await empresa.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})
  }
}

module.exports = EmpresaController
