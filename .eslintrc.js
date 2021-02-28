module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        "browser": true,
        "node": true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-console": 1,
        "object-curly-spacing": ["error", "always"],
        "indent": ["error", 2],
        "no-multi-spaces": ["error"],
        "array-bracket-spacing": ["error"],
    },
};