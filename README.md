# testeDevnology

### Iniciando Projeto


    $ npm install

    $ npm start

### Rotas

    /api/laptops-lenovo
    Esta rota irá retornar todas as informações dos notbooks lenovo ordenados de forma crescente através do preço.
    
    /api/laptops 
    Retornará as informações de todos os laptops do site

### Funções
    
    ?id=
    Retorna o notbook referente ao respectivo id

    ?search=
    Retornara os notbooks que contém a string inputada

    ?sort=
    Ordena a lista de forma crescente (asc) ou decrescente (desc)

    ? all_data=true
    Retorna a requisição sem paginação
    
Exemplos:
    
    http://localhost:3000/api/laptops?all_data=true&search=acer&sort=desc
    http://localhost:3000/api/laptops?id=64
    
