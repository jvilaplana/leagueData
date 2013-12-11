/**
 * Summoner
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    summonerId: 'string',
    name: 'string',
    profileIconId: 'integer',
    revisionDate: 'string',
    revisionDateStr: 'string',
    summonerLevel: 'string',
    pages: 'array'
  	/* e.g.
  	nickname: 'string'
  	*/

  }

};
