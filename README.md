
# Cubos Player
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Tocador de música simples para aplicar useState, useRef, eventos, manipulção de propriedades e teste.


## Autores

- [@Silva-Filho](https://github.com/Silva-Filho)


## Setup

 - Yarn: ^1.22.4;
 - Node: ^14.16.1;
 - Vite: ^3.2.3;
 - React: ^18.2.0;
 - Testing-library/react: ^11.1.0;


## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Primeiro, deve-se instalar as dependências usando o comando abaixo:
```bash
    yarn install
```

Depois, deve rodá-lo usado o seguinte comando:
```bash
    yarn dev
```

É possível rodar teste usando o seguitne comando:
```bash
    yarn test
```

## Arquitetura

A pasta `src` está divida em:

- `assets`: onde ficam as imagens usadas no projeto;
- `components`: onde se encontra Header, Main, Footer entre outros componentes;
- `data`: arquivo JS com as informações das músicas a serem carregada;
- `hooks`: onde se encontra hooks personalizados;
- `pages`: onde fica as páginas do site, no caso há apenas a Home;
- `store`: onde fica os gerenciadores de estados;
- `test`: onde fica ocorre os importes e exportes necessários para usar na criação dos testes;
- `utils`: onde fica ferramenta útil, como formatador de tempo;


## Stack utilizada

Foi usado o [Vite](https://vitejs.dev/) para gerar o projeto em [React](https://react.dev/).

Usou-se [SASS](https://sass-lang.com/) para pré-processar o CSS.

Para gerenciamento de estados, usou-se o [Zustand](https://www.npmjs.com/package/zustand).

Para os teste unitários, usou-se o [Vitest](https://vitest.dev/) e o [Testing Library](https://testing-library.com/).


## Demonstração

 ![Cubos Player](https://github.com/user-attachments/assets/dda5be12-5293-4d80-aff7-4831c718d4ca)


## Funcionalidades

- Lista de música contínua;
- Barra de progresso da música em tempo real;


## Uso/Exemplos

```javascript
import React from "react";

import { useMusic } from "../../hooks/useMusic";

import "./styles.scss";

export function Card( { music } ) {
    const { handlePlayMusic } = useMusic();

    return (
        <div
            aria-label={ `music card 0${ music.id }` }
            data-testid={ `music card 0${ music.id }` }
            className="music-card"
            onClick={ () => handlePlayMusic( music ) }
        >
            <img src={ music.cover } alt={ music.title } />

            <h2>{ music.title }</h2>

            <p>{ music.description }</p>
        </div>
    );
}
```


## Melhorias

- Refatorar o CSS de modo a não haver redundância;
- Talvez usar keyframe na animação da barra de progresso;
- Implementar tela multiplataforma;
- Melhorar testes e sua cobertura;
- Rever estrutura do JSX devido a atualização do React;

