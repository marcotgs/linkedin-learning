const httpClient = require('./httpClient');

module.exports = (config) => {
  /**
   * Create a game.
   *
   * @param {string} requestId X-Request-Id
   * @param {integer} player1id - first player ID.
   * @returns {Promise<Game>} New game.
   */
  function create(player1id, requestId) {
    return httpClient({
      uri: `${config.protocol}://${config.host}:${config.port}/api/v1/games`,
      method: 'POST',
      body: {
        player1id,
      },
    }, requestId);
  }

  /**
   * Get a game by ID.
   *
   * @param {string} requestId X-Request-Id
   * @param {integer} id - target identifier.
   * @returns {Promise<Game>} Game matched by id.
   */
  function get(id, requestId) {
    return httpClient({
      uri: `${config.protocol}://${config.host}:${config.port}/api/v1/games/${id}`,
      method: 'GET',
    }, requestId);
  }

  /**
   * Fetch config.
   *
   * @param {string} requestId X-Request-Id
   * @param {Object} criteria - criteria for filtering results.
   * @returns {Promise<Array.<Game>>} Games matching criteria.
   */
  function fetch(criteria, requestId) {
    return httpClient({
      uri: `${config.protocol}://${config.host}:${config.port}/api/v1/games`,
      method: 'GET',
      qs: criteria,
    }, requestId);
  }

  /**
   * Update a game.
   *
   * @param {string} requestId X-Request-Id
   * @param {integer} id - target identifier.
   * @param {object} body - fields to update.
   * @returns {Promise<Game>} Updated game.
   */
  function update(id, body, requestId) {
    return httpClient({
      uri: `${config.protocol}://${config.host}:${config.port}/api/v1/games/${id}`,
      method: 'PATCH',
      body,
    }, requestId);
  }

  /**
   * Judge the outcome of a game.
   * @param {string} requestId X-Request-Id
   * @param {integer} id - target identifier.
   * @returns {Promise<Game>} Game with updated state and playerWinnerId.
   */
  function judge(id, requestId) {
    return httpClient({
      uri: `${config.protocol}://${config.host}:${config.port}/api/v1/games/${id}/judge`,
      method: 'POST',
    }, requestId);
  }

  /**
   * Get the game rules.
   *
   * @returns {Promise<Array>} Collection of rules.
   */
  function rules(requestId) {
    return httpClient({
      uri: `${config.protocol}://${config.host}:${config.port}/api/v1/rules`,
      method: 'GET',
    }, requestId);
  }

  return {
    create,
    get,
    fetch,
    update,
    judge,
    rules,
  };
};
