export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  axios: {
    baseURL: 'https://leerlevels.azurewebsites.net/api',
    proxyHeaders: false,
    credentials: 'same-origin',
    crossorigin: "https://leerlevels.azurewebsites.net/api",
    headers: { 'Access-Control-Allow-Origin': 'true',
               'Content-Type': 'application/json',
               'credentials': 'same-origin' }
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: 'https://leerlevels.azurewebsites.net/api'
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: "https://leerlevels.azurewebsites.net/api"
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'leerlevels-cms',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css',
        integrity: 'sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls',
        crossorigin: 'anonymous'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'static/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
