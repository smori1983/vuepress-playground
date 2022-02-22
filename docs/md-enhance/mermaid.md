# Mermaid

[Document](https://vuepress-theme-hope.github.io/md-enhance/guide/mermaid/)


## gitGraph LR

```mermaid
gitGraph LR:
options
{
    "nodeSpacing": 20,
    "nodeStrokeWidth": 2,
    "nodeRadius": 3,
    "lineStrokeWidth": 2
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```


## gitGraph BT

```mermaid
gitGraph BT:
options
{
    "nodeSpacing": 20,
    "nodeStrokeWidth": 2,
    "nodeRadius": 3,
    "lineStrokeWidth": 2
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```

```mermaid
gitGraph BT:
options
{
    "nodeSpacing": 20,
    "nodeStrokeWidth": 2,
    "nodeRadius": 3,
    "lineStrokeWidth": 2
}
end
commit
branch branch1
checkout master
checkout branch1
commit
branch branch2
checkout master
checkout branch2
commit
checkout master
commit
merge branch1
```
