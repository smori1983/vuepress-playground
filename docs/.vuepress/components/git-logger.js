/**
 * @typedef {import('@gitgraph/core/lib/user-api/gitgraph-user-api').GitgraphUserApi} GitgraphUserApi
 * @typedef {import('@gitgraph/core/lib/user-api/branch-user-api').BranchUserApi} BranchUserApi
 */

class GitLogger {
  constructor() {
    /**
     * @type {Map<string, BranchUserApi>}
     * @private
     */
    this._branches = new Map();
  }

  /**
   * @param {GitgraphUserApi} api
   * @param {Object} data
   */
  create(api, data) {
    this._registerBranch(api.branch(data.defaultBranch));

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

    this._registerBranch(from.branch(action.branch));
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
    const branch = this._branches.get(action.branch);
    const into = this._branches.get(action.into);

    into.merge(branch);
  }

  /**
   * @param {BranchUserApi} branch
   * @private
   */
  _registerBranch(branch) {
    this._branches.set(branch.name, branch);
  }
}

module.exports = GitLogger;
