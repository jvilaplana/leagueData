/**
 * SummonerController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var http = require('http');

module.exports = {

  index: function(req, res) {
    return res.view({});
  },

  show: function(req, res) {
    Summoner.find(req.param('summonerid')).exec(function (err, summoner) {
      if (err) return res.send(err,500);
      if (!summoner) return res.send("No other summoner with that id exists!", 404);
    });
  },

  search: function(req, res) {
    var region = req.param('region');
    var name = req.param('name');
    var apiKey = sails.config.riotapi.key;
    var data = "";

    var options = {
      host: sails.config.riotapi.host,
      port: 80,
      path: '/api/lol/' + region + '/v1.1/summoner/by-name/' + name + '?api_key=' + apiKey
    };

    http.get(options, function(httpres) {
      console.log('STATUS: ' + httpres.statusCode);
      console.log('HEADERS: ' + JSON.stringify(httpres.headers));

      httpres.on('error', function(e){ console.log(e.message); });
      httpres.on('data', function (chunk) {
        data += chunk;
      });
      httpres.on('end', function() {
        res.view({summoner: JSON.parse(data)});
      });
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SummonerController)
   */
  _config: {}


};
