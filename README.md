# DataCar - Gerenciador de Veículos

**DataCar** é uma aplicação mobile desenvolvida em **React Native (Expo)** para o gerenciamento simples e eficiente de uma frota de veículos. O app permite cadastrar, visualizar, buscar, editar e excluir veículos (CRUD completo), com uma interface moderna e intuitiva.

---

## Funcionalidades

* **Listagem de Veículos:** Visualização em lista com scroll e design em cards.
* **Busca em Tempo Real:** Filtre veículos por modelo, marca ou placa instantaneamente.
* **Cadastro:** Adicione novos carros informando Placa, Marca, Modelo, Ano e Cor.
* **Edição Inteligente:** Ao clicar em um carro, o formulário já vem preenchido para edição.
* **Exclusão Segura:** Botão de deletar com confirmação (alerta) para evitar acidentes.
* **Feedback Visual:** Indicadores de carregamento (loading) e mensagens de sucesso/erro.
* **Interface Responsiva:** Ajustes de *Safe Area* para evitar cortes em dispositivos com "notch" (recorte da câmera).

---

## Tecnologias Utilizadas

* **React Native** (Expo Framework)
* **React Navigation** (Navegação por Abas/Tabs)
* **Axios** (Integração com API REST)
* **JSON Server** (Simulação de Backend)
* **Hooks** (useState, useEffect, useIsFocused)

---

## Como rodar o projeto

Para rodar este projeto localmente, você precisará de dois terminais abertos: um para o **Backend** (API falsa) e outro para o **Frontend** (App).

### Pré-requisitos
* Node.js instalado.
* Aplicativo **Expo Go** instalado no seu celular (Android ou iOS).
* Android Studio no seu PC caso deseje rodas as aplicações em um único lugar. (Mais simples)

### Passo 1: Instalação
Clone o repositório e instale as dependências:

```bash
# Clone este repositório
git clone [https://github.com/thiagofilipak/datacar.git](https://github.com/thiagofilipak/datacar.git)

# Entre na pasta
cd datacar

# Instale as dependências
npm install

# abra um terminal para simular o backend
npx json-server db.json --host 0.0.0.0 --port 3000

# No Android Studio, inicie um dispositivo virtual

# Em outro terminal, dentro da pasta datacar, rode o frontend
npx expo start
após o processo finalizar, pressione a tecla "A" para executar o app no dispositivo virtual


Estrutura de Pastas
datacar/
├── src/
│   ├── screens/      # Telas (Cadastro, Listagem)
│   ├── services/     # Configuração da API (Axios)
│   └── assets/       # Imagens e Ícones
├── app/              # Configuração de Rotas (Expo Router)
├── db.json           # Banco de dados simulado
├── package.json      # Dependências do projeto
└── README.md         # Documentação
