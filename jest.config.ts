module.exports = {
  "preset": "jest-preset-angular",
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupJest.ts"
  ],
  "setupFiles": [
    "jest-canvas-mock"
  ],
  "coverageReporters": [
    "text",
    "html"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(ng2-charts-x)/)"
  ]
}