import { defineConfig } from 'umi';

export default defineConfig({
  base: '/weather/',
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
      from: 'src/img/',
      to: 'img/',
    },
    {
      from: 'src/sw.js',
      to: 'sw.js',
    },
  ],
});
