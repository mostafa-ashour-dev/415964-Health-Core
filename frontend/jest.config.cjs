module.exports = {
    testEnvironment: "jsdom",
    reporters: [
        "default",
        [
            "jest-html-reporters",
            {
                publicPath: "./html-report",
                filename: "report.html",
                expand: true,
            },
        ],
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },

    collectCoverage: true,

    coverageDirectory: "coverage",

    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/main.tsx",
        "!src/vite-env.d.ts",
    ],

    coverageReporters: [
        "text",
        "lcov",
        "html",
    ],
};