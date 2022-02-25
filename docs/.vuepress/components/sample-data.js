export default {
  defaultBranch: 'master',
  actions: [
    {
      type: 'commit',
      branch: 'master',
      message: 'initial commit',
    },
    {
      type: 'branch:create',
      branch: 'feature/1',
      from: 'master',
    },
    {
      type: 'branch:create',
      branch: 'feature/2',
      from: 'master',
    },
    {
      type: 'commit',
      branch: 'feature/1',
      message: '1',
    },
    {
      type: 'commit',
      branch: 'feature/2',
      message: '2',
    },
    {
      type: 'commit',
      branch: 'feature/1',
      message: '3',
    },
    {
      type: 'commit',
      branch: 'feature/2',
      message: '4',
    },
    {
      type: 'merge',
      branch: 'feature/1',
      into: 'master',
    },
    {
      type: 'tag',
      branch: 'master',
      tag: 'v1.0.0',
    },
    {
      type: 'branch:create',
      branch: 'hotfix/1',
      from: 'master',
    },
    {
      type: 'commit',
      branch: 'hotfix/1',
      message: '5',
    },
    {
      type: 'merge',
      branch: 'hotfix/1',
      into: 'master',
    },
    {
      type: 'tag',
      branch: 'master',
      tag: 'v1.0.1',
    },
  ],
};
