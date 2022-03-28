import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/detail', component: '@/pages/detail' },
  ],
  fastRefresh: {},
  outputPath: '/docs',
  copy: [
    {
      from: 'src/pages/index.appcache',
      to: 'index.appcache',
    },
    {
      from: 'src/img/',
      to: 'img/',
    }
  ],
});
