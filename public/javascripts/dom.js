
module.exports = {
  validate: function (title, excerpt, body) {
    var errors = [];
    var empty = 'Title must be present';
    var words = 'There must be an excerpt for the article';
    var main = 'There must be a body for the article';
    if(title === ''){
      errors.push(empty);
    }
    if(excerpt === ''){
      errors.push(words)
    }
    if(body === ''){
      errors.push(main)
    }
    console.log(errors);
    return errors;
  },

  checked: function (check) {
  if(check === 'on'){
      return 'white';
    } else {
      return 'black';
    }
  }
}
