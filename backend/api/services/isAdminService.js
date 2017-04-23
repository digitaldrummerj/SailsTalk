module.exports = {
  isAdmin: function isAdminFn(userId) {
    return User.findone({ id: userId, admin: true })
      .then(result => !!result)
      .catch(error => error);
  }
}; 
