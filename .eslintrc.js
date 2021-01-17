module.exports = {
    plugins: ['jest'],
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 6,
    },
    env: {
        node: true,
        "es6": true,
    },
};