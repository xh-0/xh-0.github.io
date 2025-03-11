---
title: 批量修改 Git 已有 commit 中的 username
tags:
  - Git
createTime: 2024/07/10 15:51:04
permalink: /article/b07w665w/
---
之前很长一段时间 GitHub 上的提交都在使用工作账户，导致私人仓库中的提交者比较混乱。在 StackOverflow 里面找到了一个 bash 脚本可以批量修改 username，在这里记录一下。

修改的步骤一共两步：
1. 执行修改脚本。
2. 将本地修改同步到Git服务器。

## 运行脚本
::: code-tabs
@tab rewrite.sh
```bash
#!/bin/sh

git filter-branch -f --env-filter '
OLD_EMAIL="your-old@email.com"
CORRECT_NAME="correct-git-username"
CORRECT_EMAIL="your-new@email.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```
:::

新建一个 `rewrite.sh` 文件，将脚本中的 `OLD_EMAIL`，`CORRECT_NAME` 和 `CORRECT_EMAIL` 按照需要修改，并将改脚本放到需要修改的项目的根目录下执行。
```bash
bash ./rewrite.sh
```

## 同步 Git log 到服务器
查看打印信息如果显示修改成功，可以执行命令：
```bash
git log
```
该命令可以查看已有 commit 信息的修改情况，如果是正确的，则执行 `git push -f` 即可将修改内容同步到 Git 服务器上。

<br /><br /><br />

::: info 本文参考资料
1. [Make a README](https://www.makeareadme.com/)
2. [Create an Excellent GitHub Profile with Markdown](https://learn.adafruit.com/excellent-github-profile/overview)
:::
