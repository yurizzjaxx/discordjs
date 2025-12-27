class DiscordWebhookAPI {
  constructor() {
    this.objTab = {}
  }
  URL(url) {
    this.url = url
    this.dataCallblock = null;
    this.option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    }
  }
  avatarUrl() {
    this.objTab.avatar_url;
    return this
  }
  username(name) {
    this.objTab.username = name;
    return this
  }
  content(text) {
    this.objTab.content = text;
    return this
  }
  async send(embed) {
    this.payload = {...this.objTab}
    if (embed) {
      this.payload.embeds = [embed.toJson ? embed.toJson() : embed]
    }
    this.boolUrl = this.url.includes("discord.com/api/webhooks")
    if (!this.boolUrl) {
      console.error("Failed with webhook API")
       return 
    }
    this.option.body = JSON.stringify(this.payload)
    try {
      this.r = await fetch(this.url, this.option)
      this.d = await this.r.text()
      if (this.dataCallblock) {
        this.dataCallblock(this.d)
      }
    } catch (er) {
      return console.error(er)
    }
  }
  onData(callblock) {
    this.dataCallblock = callblock
    return this
  }
}

class Embeds {
  constructor() {
    this.embeds = {}
  }
  author(name) {
    this.embeds.author = {name};
    return this
  }
  authorIcon(url) {
    this.embeds.author = {...this.embeds.author, iconUrl: url};
    return this
  }
  title(text) {
    this.embeds.title = text;
    return this
  }
  url(url) {
    this.embeds.url = url;
    return this
  }
  description(text) {
    this.embeds = text;
    return this
  }
  image(url) {
    this.embeds.image = {url};
    return this
  }
  thumbnail(url) {
    this.embeds.image = {...this.embeds.image, thumbnail: {url}};
    return this
  }
  footer(text) {
    this.embeds.footer = {text};
    return this
  }
  footerIcon(url) {
    this.embeds.footer = {...this.embeds.footer, iconUrl: url};
  }
  toJson() {
    return this.embeds;
  }
}