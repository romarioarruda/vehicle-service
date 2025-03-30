# Gestão de veículos

Este projeto é um sistema de gestão de veículos. Nele é possível cadastrar, listar, atualizar e deletar um registro de veículo.

Foi construído em **Nodejs** com **Typescript** e **Express**.

## Dependências

Este projeto depende das seguintes bibliotecas e ferramentas:

- **Node.js** (Versão 20.18 ou superior)
- **TypeScript** (Para melhorar a tipagem dos componentes e experiência do dev)
- **Docker** (Opcional para criar e rodar contêineres)



## Configuração do Projeto

Siga as etapas abaixo para rodar este projeto localmente ou dentro de um container Docker.

### 1. Clonar o repositório

Primeiro, clone o repositório:

```bash
git clone https://github.com/romarioarruda/vehicle-service.git
cd vehicle-service
```



### 2. Rodar a Aplicação

**Para rodar sem o Docker:**

Instale as dependências:

```bash
pnpm install
```


Isso irá instalar todas as dependências necessárias, incluindo as dependências de desenvolvimento.

Execute o seguinte comando:

```bash
pnpm start
```

Ou se preferir, execute em um container **Docker**.


Para rodar o projeto dentro de um container Docker, siga as etapas abaixo.


### 3. Construir a Imagem Docker

Com o Docker instalado na sua máquina execute o seguinte comando:


```bash
docker build -t vehicle-service .
```

### 3.1. Rodar o Container

Após a construção da imagem, execute o comando:

```bash
docker run --rm -p 3000:3000 vehicle-service
```

Após isso a aplicação estará disponível no endereço:

[http://localhost:3000](http://localhost:3000)



## 4. Documentação da API

**GET: /api/vehicles**

**Descrição:**
Recuperar a lista de veículos cadastrados.

**URL:** `http://localhost:3000/api/vehicles`

**Exemplo de Resposta:**


```json
200 OK
[
  {
    "id": "6b481357-2f2d-4df4-99ad-2f3a9045f284",
    "placa": "ABC1234",
    "chassi": "9BWZZZ377VT004251",
    "renavam": "12345678901",
    "modelo": "Renegade",
    "marca": "JEEP",
    "ano": 2018
  },
  {
    "id": "e6b4a48f-b09d-4753-884d-3e6fc197e5a4",
    "placa": "ABC1234",
    "chassi": "9BWZZZ377VT004251",
    "renavam": "12345678901",
    "modelo": "Renegade",
    "marca": "JEEP",
    "ano": 2019
  }
]
```

##

**POST: /api/vehicles**

**Descrição:** Cria um novo veículo.

**URL:** `http://localhost:3000/api/vehicles`

**Body:**

```
{
  "placa": "ABC1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Renegade",
  "marca": "JEEP",
  "ano": 2019
}

```

**Exemplo de Resposta:**

```json
201 CREATED
{
  "id": "e6b4a48f-b09d-4753-884d-3e6fc197e5a4",
  "placa": "ABC1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Renegade",
  "marca": "JEEP",
  "ano": 2019
}
```

##

**PUT: /api/vehicles/:id**

**Descrição:** Atualiza um veículo existente

**URL:** `http://localhost:3000/api/vehicles/:id`

**Body:**

```
{
  "modelo": "Fiat Uno",
  "marca": "FIAT",
  "ano": 2016
}

```

**Exemplo de Resposta:**

```json
200 OK
{
  "id": "e6b4a48f-b09d-4753-884d-3e6fc197e5a4",
  "placa": "ABC1234",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678901",
  "modelo": "Fiat Uno",
  "marca": "FIAT",
  "ano": 2016
}
```

