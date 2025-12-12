### Discord API Easy Service

Uma biblioteca JavaScript simplificada para interação com a API do Discord, desenvolvida por yurizzjaxx.

## 📋 Visão Geral

O **Discord API Easy** é uma solução JavaScript que facilita a integração com a API do Discord, corrigindo problemas comuns de fetch network e fornecendo uma interface amigável tanto para bots quanto para usuários.

🔗 **GitHub**: https://github.com/yurizzjaxx/discordjs

**✨ Características**

- ✅ Suporte para tokens de usuário, Bearer e Bot
- ✅ Fetch network corrigido para navegadores
- ✅ WebSocket para eventos em tempo real
- ✅ Geração de URLs de avatares e emojis
- ✅ Métodos assíncronos para API REST
- ✅ Sistema de callbacks para eventos

**🚀 Instalação**

```html
<script src="discord-api.js"></script>
```

Ou em projetos Node.js:

```javascript
const { DiscordAPI, disTool, disList } = require('./discord-api.js');
```

**📖 Classes e Métodos**

🔧 `disTool` - **Utilitários**

**Geração de URLs de Avatar**

```javascript
// Avatar personalizado (GIF ou PNG)
const avatarUrl = disTool.avatar('USER_ID', 'AVATAR_HASH', null, 256);

// Avatar padrão (0-5)
const defaultAvatar = disTool.avatar(null, null, 0, 128);
```

**Geração de URLs de Emoji**

```javascript
// Emoji estático
const emojiUrl = disTool.emoji('EMOJI_ID', false, false);

// Emoji animado
const animatedEmoji = disTool.emoji('EMOJI_ID', true, true);
```

🤖 `DiscordAPI` - **Classe Principal**

**Inicialização**

```javascript
const discord = new DiscordAPI();
```

**Autenticação**

```javascript
// Tipo 0: Sem prefixo (para alguns endpoints)
// Tipo 1: Bearer token (usuários OAuth2)
// Tipo 2: Bot token
discord.AuthToken(2, 'SEU_TOKEN_AQUI');
```

**Endpoints da API REST**

**👤 Informações do Usuário/Bot**

```javascript
// Usuário atual
discord.UsersMe(
  (data) => console.log('Perfil:', data),
  (err) => console.error('Erro:', err)
);

// Canais do usuário
discord.UsersMeChannel(callback, errorHandler);

// Usuário por ID
discord.UsersId('USER_ID', callback, errorHandler);
```

**💬 Mensagens**

```javascript
// Buscar mensagens de um canal
discord.MessagesChannels('CHANNEL_ID', 50, 
  (messages) => console.log(messages),
  (err) => console.error(err)
);
```

**📤 Enviar Mensagens**

```javascript
// Enviar mensagem para um canal
const messageData = {
  content: 'Olá, mundo!',
  tts: false
};

discord.ContentId('CHANNEL_ID', messageData,
  (response) => console.log('Mensagem enviada:', response),
  (err) => console.error('Erro:', err)
);
```

**🏰 Servidores (Guilds)**

```javascript
// Canais de um servidor
discord.asyncGuildsIdChannel('GUILD_ID', callback, errorHandler);

// Emojis de um servidor
discord.GuildsEmojisIdChannel('GUILD_ID', callback, errorHandler);
```

**🌐 WebSocket (Eventos em Tempo Real)**

**Conexão**

```javascript
// Conectar com status específico
discord.Connect('online'); // online, idle, dnd, invisible
```

**Event Handlers**

```javascript
// Configurar handlers (chainable)
discord
  .onReady((user) => {
    console.log(`✅ Conectado como: ${user.username}#${user.discriminator}`);
  })
  .onChannel((message) => {
    console.log(`📨 Nova mensagem de ${message.author.username}: ${message.content}`);
  })
  .onTime(() => {
    console.log('💓 Heartbeat recebido');
  })
  .onDisconnect((reason) => {
    console.log(`❌ Desconectado: ${reason}`);
  })
  .onLog((payload) => {
    console.log('📊 Log do WebSocket:', payload);
  });
```

**Desconectar**

```javascript
discord.Stop();
```

📋 `disList` - **Utilitários de Lista**

```javascript
const items = [1, 2, 3, 4, 5];
disList.fun(items, (item) => {
  console.log(`Item: ${item}`);
});
```

**🎯 Exemplos Práticos**

**Exemplo 1: Bot Simples**

```javascript
const bot = new DiscordAPI();

// Autenticar bot
bot.AuthToken(2, 'BOT_TOKEN');

// Obter informações do bot
bot.UsersMe(
  (profile) => {
    console.log(`🤖 Bot: ${profile.username}`);
    
    // Conectar ao WebSocket
    bot
      .onReady(() => console.log('Bot pronto!'))
      .onChannel((msg) => {
        if (msg.content === '!ping') {
          // Responder no mesmo canal
          bot.ContentId(msg.channel_id, { content: 'Pong!' },
            () => console.log('Resposta enviada'),
            console.error
          );
        }
      })
      .Connect('online');
  },
  console.error
);
```

**Exemplo 2: Cliente de Usuário**

```javascript
const client = new DiscordAPI();

// Usar token de usuário (Bearer)
client.AuthToken(1, 'USER_TOKEN');

// Verificar canais diretos
client.UsersMeChannel(
  (channels) => {
    channels.forEach(channel => {
      console.log(`Canal DM com: ${channel.recipients[0].username}`);
    });
  },
  console.error
);
```

**⚠️ Notas Importantes**

**Restrições de Token**

- **Tipo 0**: Alguns endpoints específicos
- **Tipo 1 (Bearer)**: Aplicações OAuth2 (usuários)
- **Tipo 2 (Bot)**: Tokens de bots

**Compatibilidade com Navegadores**

- `MessagesChannels`: Suporta tipos 0 e 1 (usuário/Bearer)
- `ContentId`: Suporta apenas tipo 0 (alguns casos específicos)
- `GuildsEmojisIdChannel`: Suportam apenas tipo 0

**WebSocket**

- Gateway não requer TypeToken definido
- Mantém conexão ativa com heartbeats automáticos

**🔧 Solução de Problemas**

Erro "Failed to fetch"

Certifique-se de:

1. O token está correto e válido
2. O tipo de token corresponde ao endpoint
3. Não há bloqueios de CORS (em navegadores)

WebSocket não conecta

1. Verifique se o token é válido
2. Confirme a versão da API (atualmente v9)
3. Verifique a conexão de internet

📄 Licença

Desenvolvido por yurizzjaxx. Verifique o repositório GitHub para mais informações sobre licenciamento.

🤝 Contribuindo

Contribuições são bem-vindas! Envie suas sugestões e issues no GitHub.

---

Desenvolvido com ❤️ por yurizzjaxx
Discord API Easy Service - Simplificando a integração com Discord
