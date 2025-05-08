// Source and credits to: https://github.com/pew/cloudflare-pages-social-preview
class ElementHandler {
  constructor(ogtag) {
    this.ogtag = ogtag
  }
  element(element) {
    element.append(this.ogtag, { html: true })
  }
}

export async function onRequest(context) {
  const { request, next } = context
  const res = await next()
  const { searchParams, pathname } = new URL(request.url)

  if (!(pathname === '/index.html' || pathname === '/')) {
    return res
  }

  // Metatags Variables (edit these!)
  const metatitle = "Eras Hukuk ve Danışmanlık"
  const metadescription = "Ankara merkezli Eras Hukuk Bürosu, ceza hukuku, ticaret hukuku ve aile hukuku alanlarında uzman avukatlık ve danışmanlık hizmetleri sunar."

  let name = searchParams.get('myQuery')
  let ogtag

  // Meta tag HTML
  ogtag = `
    <meta property="og:title" content="${metatitle}" />
    <meta property="og:description" content="${metadescription}" />
    <meta property="og:locale" content="tr_TR" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${request.url}" />
    <meta property="og:image" content="${request.url}img/eraslaww.png?${name ? 'myQuery=' + name : 'default'}" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:width" content="1200" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metatitle}" />
    <meta name="twitter:description" content="${metadescription}" />
    <meta name="twitter:image" content="${request.url}img/eraslaww.png?${name ? 'myQuery=' + name : 'default'}" />

    <meta name="description" content="${metadescription}" />
  `

  return new HTMLRewriter().on('head', new ElementHandler(ogtag)).transform(res)
}
