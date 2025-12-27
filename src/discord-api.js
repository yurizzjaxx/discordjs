function _disMedia() {
  return "https://media.discordapp.net/"
}

function _disCdn() {
  return "https://cdn.discordapp.com/"
}

class disTool {
  static avatar(id, format, avatarType, sizes) {
    if (format) {
      if (format.includes("a_")) {
        this.a = _disMedia() + `avatars/${id}/${format}.gif?size=${sizes}`
      } else {
        this.a = _disMedia() + `avatars/${id}/${format}.png?size=${sizes}`
      }
    } else {
      this.a = _disCdn() + `embed/avatars/${avatarType}.png`
    }
    return this.a
  }
  static emoji(id, anim, boolAnim, sizes) {
    if (boolAnim) {
      return _disMedia() + `emojis/${id}.${anim ? "gif" : "png"}?size=${sizes}`
    } else {
      return _disMedia() + `emojis/${id}.png?v=1`
    }
  }
}

class BotMessage {it 
  constructor() {
    this.botMeg = {}
    this.botEmbed = {}
  }
  content(text) {
    this.botMeg.content = text;
    return this
  }
  messageEmbedAuthor(name) {
    this.botEmbed.author = {name};
    return this
  }
  messageEmbedAuthorIcon(url) {
    this.botEmbed.author = {...this.botEmbed.author, iconUrl: url};
    return this
  }
  messageEmbedsTitle(text) {
    this.botEmbed.title = text;
    return this
  }
  messageEmbedUrl(url) {
    this.botEmbed.url = url;
    return this
  }
  messageEmbedDescription(text) {
    this.botEmbed.description = text;
    return this
  }
  messageEmbedImage(url) {
    this.botEmbed.image = {url};
    return this
  }
  messageEmbedThumbnail(url) {
    this.botEmbed.image = {...this.botEmbed.image, thumbnail: {url}};
    return this
  }
  messageEmbedFooter(text) {
    this.botEmbed.footer = {text};
    return this
  }
  messageEmbedFooterIcon(url) {
    this.botEmbed.footer = {...this.botEmbed.footer, iconUrl: url};
    return this
  }
  toJson() {
    this.paydata = this.botMeg;
    if (this.botEmbed) {
      this.paydata.embeds = [this.botEmbed];
    }
    return this.paydata;
  }
}

class DiscordAPI {
  constructor() {
    this.api = "https://discord.com/api/v9/"
    this.wsApi = "wss://gateway.discord.gg/?v=9&encoding=json"
  }
  AuthToken(type, token) {
    this.voiceServerChannelCallblock = null;
    this.voiceStateChannelCallblock = null;
    this.disconnectCallblock = null;
    this.channelCallblock = null;
    this.authorCallblock = null;
    this.timeCallblock = null;
    this.jsonLog = null;
    this.loopBot = null;
    this.ws = null;
    
    this.authObj = {}
    this.typeToken = null
    switch (type) {
      case 0:
        this.typeToken = ""
      break;
      case 1:
        this.typeToken = "Bearer "
      break;
      case 2:
        this.typeToken = "Bot "
      break;
    }
    this.wssToken = token;
    this.authObj["Authorization"] = this.typeToken + token;
  }
  // Fetch User and bot (TypeToken 0 or 2) for Profile
  async UsersMe(callblock, error) {
    try {
      this.r = await fetch(`${this.api}users/@me`, {
        method: "GET",
        headers: this.authObj
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      return callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch User and bot (TypeToken 0 or 2) for Profile channel
  async UsersMeChannel(callblock, error) {
    try {
      this.r = await fetch(`${this.api}users/@me/channels`, {
        method: "GET",
        headers: this.authObj
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      return callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch User and bot (TypeToken 0 or 2) for user id
  async UsersId(id, callblock, error) {
    try {
      this.r = await fetch(`${this.api}users/${id}`, {
        method: "GET",
        headers: this.authObj
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      return callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch Bot to User (TypeToken 0 or 1) Found error with browser bot 2 support
  async MessagesChannels(id, limit, callblock, error) {
    try {
      this.r = await fetch(`${this.api}channels/${id}/messages?limit=${limit}`, {
        method: "GET",
        headers: this.authObj
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch User and bot (TypeToken 0) Found error with browser user 1 or bot 2 content of channel support
  async ContentId(id, obj, callblock, error) {
    try {
      this.r = await fetch(`${this.api}channels/${id}/messages`, {
        method: "POST",
        headers: {
          ...this.authObj,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(obj)
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      return callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch User and bot (TypeToken 0) Found error with browser user 1 or bot 2 support
  async GuildsIdChannel(id, callblock, error) {
    try {
      this.r = await fetch(`${this.api}guilds/${id}/channels`, {
        method: "GET",
        headers: this.authObj
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      return callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch User and bot (TypeToken 0) Found error with browser user 1 or bot 2 emoji support
  async GuildsEmojisIdChannel(id, callblock, error) {
    try {
      this.r = await fetch(`${this.api}guilds/${id}/emojis`, {
        method: "GET",
        headers: {
          ...this.authObj,
          "Content-Type": "application/json "
        }
      })
      this.d = await this.r.json()
      if (this.d.message) {
        return error(this.d.message)
      }
      return callblock(this.d)
    } catch (er) {
      return error(er)
    }
  }
  // Fetch User and bot (NO TypeToken 0 found) Gateway service
  Connect(statusType) {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        op:  null,
        d: null
      }))
      this.ws.close()
      this.ws = null;
      if (this.loopBot) {
        clearInterval(this.loopBot)
        this.loopBot = null;
      }
    }
    
    this.ws = new WebSocket(this.wsApi)
    
    this.payload = {
      op: 2,
      d: {
        token: this.wssToken,
        intents: 512,
        properties: {
          $os: "linux",
          $browser: "chrome",
          $device: "chrome"
        },
        presence: {
          status: statusType
        }
      }
    }
    
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(this.payload));
    }
    this.ws.onmessage = (data) => {
      this.__Meg(data);
    }
    this.ws.onclose = (data) => {
      if (this.loopBot) {
        clearInterval(this.loopBot)
        this.loopBot = null
      }
      if (this.disconnectCallblock) {
        this.disconnectCallblock(data)
      }
    }
  }
  Stop() {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        op: null,
        d: null
      }))
      clearInterval(this.loopBot)
      this.ws.close()
    }
  }
  __Meg(event) {
    this.payData = JSON.parse(event.data);
    const {op, d, t, s} = this.payData
    if (!d && this.timeCallblock) {
      this.timeCallblock()
    }
    switch (op) {
      case 0:
        switch (t) {
          case 'READY':
            if (d.user) {
              this._d = d.user
            } else {
              this._d = d.author
            }
            if (this.authorCallblock) {
              this.authorCallblock(this._d)
            }
          break;
          case 'MESSAGE_CREATE':
            if (this.channelCallblock) {
              this.channelCallblock(d)
            }
          break;
          case 'VOICE_STATE_UPDATE':
            if (this.voiceStateChannelCallblock) {
              this.voiceStateChannelCallblock(d)
            }
          break;
          case 'VOICE_SERVER_UPDATE':
            if (this.voiceServerChannelCallblock) {
              this.voiceServerChannelCallblock(d)
            }
          break;
        }
      break;
      case 10:
        const {heartbeat_interval} = d;
        this.loopBot = setInterval(() => {
          this.ws.send(JSON.stringify({
            op: 1,
            d: null
          }))
        }, heartbeat_interval)
      break;
    }
    if (this.jsonLog) {
      this.jsonLog(this.payload);
    }
  }
  onLog(callblock) {
    this.jsonLog = callblock
    return this
  }
  VoiceChannel(gid, cid, channelDisabled, muteDisabled, deafDisabled) {
    if (!this.ws) {
      return;
    }
    this.ws.send(JSON.stringify({
      op: 4,
      d: {
        guild_id: gid,
        channel_id: channelDisabled ? cid : null,
        self_mute: muteDisabled,
        self_deaf: deafDisabled
      }
    }))
  }
  onVoiceStateChannel(callblock) {
    this.voiceStateChannelCallblock = callblock;
    return this
  }
  onVoiceServerChannel(callblock) {
    this.voiceServerChannelCallblock = callblock;
    return this
  }
  onChannel(callblock) {
    this.channelCallblock = callblock;
    return this
  }
  onTime(callblock) {
    this.timeCallblock = callblock;
    return this
  }
  onReady(callblock) {
    this.authorCallblock = callblock;
    return this
  }
  onDisconnect(callblock) {
    this.disconnectCallblock = callblock
    return this
  }
  isConnect() {
    if (this.ws) {
      return true
    }
    return false
  }
}

class disList {
  static fun(list, callblock) {
    list.forEach(event => {
      return callblock(event)
    })
  }
}