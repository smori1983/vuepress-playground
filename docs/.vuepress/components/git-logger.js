/**
 * @typedef {import('@gitgraph/core/lib/user-api/gitgraph-user-api').GitgraphUserApi} GitgraphUserApi
 */

class GitLogger {
  constructor() {
    /**
     * @type {Map<string, Object>}
     * @private
     */
    this._branches = new Map();
  }

  /**
   * @param {GitgraphUserApi} api
   * @param {Object} data
   */
  create(api, data) {
    const b = api.branch(data.defaultBranch);
    this._branches.set(data.defaultBranch, b);

    data.actions.forEach((action) => {
      if (action.type === 'branch:create') {
        this._createBranch(action);
      }
      if (action.type === 'commit') {
        this._createCommit(action);
      }
      if (action.type === 'merge') {
        this._createMerge(action);
      }
    });
  }

  /**
   * @param {Object} action
   * @private
   */
  _createBranch(action) {
    const from = this._branches.get(action.from);
    const branch = from.branch(action.branch);

    this._branches.set(action.branch, branch);
  }

  /**
   * @param {Object} action
   * @private
   */
  _createCommit(action) {
    const branch = this._branches.get(action.branch);

    branch.commit(action.message);
  }

  /**
   * @param {Object} action
   * @private
   */
  _createMerge(action) {
    const target = this._branches.get(action.target);
    const into = this._branches.get(action.into);

    into.merge(target);
  }
}

module.exports = GitLogger;
