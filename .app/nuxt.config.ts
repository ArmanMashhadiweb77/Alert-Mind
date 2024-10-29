export default defineNuxtConfig({
  extends: [
    /**
     * This extends the base Tairo layer.
     *
     * Alternatively you can use the following:
     * ["gh:cssninjaStudio/tairo/layers/tairo#v1.4.0", {
     *    install: true,
     *    giget: { auth: import.meta.env.GITHUB_TOKEN },
     * }]
     *
     * @see https://github.com/unjs/c12#extending-config-layer-from-remote-sources
     *
     * This would allows you to create an empty git repository
     * with only your source code and no demo.
     */

    /**
     * Uncomment the following line to add the Tairo Layout Sidebar layer
     */
    '../layers/tairo-layout-sidebar',

    '../layers/tairo',
  ],
  app: {
    head: {
      title: 'ذهن هوشیار',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      bodyAttrs: {},
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [ ],
    },
  },
  ssr: false,
  /**
   * Load local font with @fontsource packages
   * @see https://fontsource.org/
   */
  css: [
    '@fontsource-variable/inter/index.css',
    '@fontsource-variable/karla/index.css',
    '@/public/css/font.css',
    '@/public/css/main.css',
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt3-leaflet',
    'cap-module',

  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },

})
