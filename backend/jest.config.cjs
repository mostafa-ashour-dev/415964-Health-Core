module.exports = {
    testEnvironment: "node",

    transform: {
        "^.+\\.js$": "babel-jest",
    },

    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setup.js",
    ],

    testTimeout: 30000,

    collectCoverage: true,
};