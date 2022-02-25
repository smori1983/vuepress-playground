export default `
[option]
defaultBranch: master
[log]
git commit -m 'initial commit'
git checkout -b feature/1
git commit -m '1'
git checkout master
git checkout -b feature/2
git commit -m '2'
git checkout feature/1
git commit -m '3'
git checkout feature/2
git commit -m '4'
git checkout master
git merge feature/1
git tag v1.0.0
git checkout -b hotfix/1
git commit -m '5'
git checkout master
git merge hotfix/1
git tag v1.0.1
`;
