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
    this._createBranch(api, {
      branch: data.defaultBranch,
    });

    data.actions.forEach((action) => {
      if (action.type === 'branch:create') {
        this._createBranch(api, action);
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
   * @param {GitgraphUserApi} api
   * @param {Object} action
   * @private
   */
  _createBranch(api, action) {
    const branch = api.branch(action.branch);

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
