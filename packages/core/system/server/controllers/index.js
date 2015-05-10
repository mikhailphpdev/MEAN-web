'use strict';

var mean = require('meanio');

exports.render = function(req, res) {

  var modules = [];
  // Preparing angular modules list with dependencies
  for (var name in mean.modules) {
    modules.push({
      name: name,
      module: 'mean.' + name,
      angularDependencies: mean.modules[name].angularDependencies
    });
  }

  function isAdmin() {
    return req.user && req.user.roles.indexOf('admin') !== -1;
  }

	var user = req.user ? {
		name: req.user.name,
		_id: req.user._id,
		username: req.user.username,
		profile: req.user.profile,
		roles: req.user.roles
	} : {};

  // Send some basic starting info to the view
  res.render('index', {
    user: user,
    modules: modules,
    menus: req.menus,
    isAdmin: isAdmin,
    adminEnabled: isAdmin() && mean.moduleEnabled('admin')
  });
};