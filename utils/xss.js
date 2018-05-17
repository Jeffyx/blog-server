const xss = require('xss');

module.exports = function(html){
    return xss(html)
}