import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados', { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((err) => {
    throw new Error(`Erro ao conectar com o banco de dados: ${err}`)
  });