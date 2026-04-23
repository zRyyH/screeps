# Screeps Bot - zRyyH

Bot para o jogo [Screeps](https://screeps.com/) — MMO de programação onde você controla uma colônia usando JavaScript.

## O que é Screeps

O jogo roda em um mundo persistente 24/7. Você escreve código JavaScript que é executado a cada **tick** do servidor, controlando suas unidades (creeps) automaticamente, mesmo offline.

## Como funciona este projeto

### Estrutura

```
src/
  main.js   — código enviado ao servidor Screeps
Gruntfile.js — configuração do deploy via grunt-screeps
```

### Deploy

O projeto usa [grunt-screeps](https://github.com/screeps/grunt-screeps) para enviar o código da pasta `src/` diretamente para o servidor.

```bash
npm install        # instala dependências
grunt screeps      # envia src/*.js para o servidor (branch: default)
```

Ao rodar `grunt screeps`, todos os arquivos em `src/` são publicados na conta configurada no `Gruntfile.js`.

### Código atual

`src/main.js` exporta utilitários para interagir com o jogo. Atualmente expõe:

- **`novoNpc(nomeNpc)`** — spawna um creep com body `[WORK, CARRY, MOVE]` no spawn `zRyyH BASE`

## Conceitos do jogo relevantes

| Conceito | Descrição |
|----------|-----------|
| **Creep** | Unidade móvel com partes do corpo (WORK, CARRY, MOVE, ATTACK, etc.) |
| **Spawn** | Estrutura que cria creeps. Requer energia suficiente |
| **Room** | Célula 50x50 do mundo. Cada room tem um controller |
| **RCL** | Room Control Level — sobe fazendo `upgradeController`, desbloqueia estruturas |
| **GCL** | Global Control Level — define quantas rooms você pode controlar |
| **Energy** | Recurso principal. Sources regeneram 300 ticks |
| **Tick** | Unidade de tempo. Scripts rodam uma vez por tick |
| **Memory** | Objeto persistente para salvar estado entre ticks |

## Próximos passos sugeridos

- Loop principal (`module.exports.loop`) para controlar creeps a cada tick
- Lógica de harvest → transfer → upgrade para crescimento básico
- Gerenciamento de papéis (harvester, upgrader, builder)
- Spawn automático de creeps quando a população cair
