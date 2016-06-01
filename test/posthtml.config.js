module.exports = {
  sync: false,
  skipParse: false,
  plugins: {
    'posthtml-import': null,
    'posthtml-bem': {
      elemPrefix: '__',
      modPrefix: '--',
      modDlmtr: '-'
    }
  }
}
