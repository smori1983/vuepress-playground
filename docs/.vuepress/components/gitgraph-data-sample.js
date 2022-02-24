export default {
  "defaultBranch": "master",
  "actions": [
    {
      "type": "commit",
      "branch": "master",
      "message": "initial commit"
    },
    {
      "type": "branch:create",
      "from": "master",
      "branch": "feature/1"
    },
    {
      "type": "branch:create",
      "from": "master",
      "branch": "feature/2"
    },
    {
      "type": "commit",
      "branch": "feature/1",
      "message": "1"
    },
    {
      "type": "commit",
      "branch": "feature/2",
      "message": "2"
    },
    {
      "type": "commit",
      "branch": "feature/1",
      "message": "3"
    },
    {
      "type": "commit",
      "branch": "feature/2",
      "message": "4"
    },
    {
      "type": "merge",
      "target": "feature/1",
      "into": "master"
    }
  ]
};
