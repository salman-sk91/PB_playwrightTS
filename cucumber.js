  const common = `--require '.src-js/stepDefination/**/*.js' --format 'json:Report/output.json' --format 'html:Report/output.html'`
  const tags = '"@payback and not @ignore"'
  
  module.exports = {
    default: '--publish-quiet',
    local: `${common} --tags ${tags}`
  }