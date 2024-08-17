module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'eslint-plugin-node'],
  rules: {
    'react/prop-types': 0,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
  },
};
