---
title: 数据挖掘导论前言
createTime: 2024/04/30 18:30:00
permalink: /dataMining/
aside: false
readingTime: false
comment: false
editLink: false
contributors: false
changelog: false
copyright: false
---
由于我本人的工作就是关于大数据图算法挖掘的，之前连载的栏目 [DGFD](/paperNote/9hfux33n/) 论文笔记也是关于这方面的，所以打算新开一个栏目来对数据挖掘有个更加系统的记录。

本栏目主要参考书目为：[数据挖掘导论(原书第2版)](https://book.douban.com/subject/34798830/)，但是本栏目并非该书的简单翻译，而是会结合本人的理解以及工作经验进行讲解和记录。

## 分类
在此讨论分类的意义在于：当面临一个数据分析或数据挖掘任务时，我们能根据其目标快速判断它属于哪一种数据挖掘任务类型，从而能对可选择的分析方法有想法，以及对该任务最终的效果有概念。对任务类型的正确判断可以为后续的分析工作提供很好的支持，保证整个数据挖掘任务的进行在大方向上没有错误。

- 聚类分析。

	旨在发现紧密相关的观测值组群，使得属于不同簇的观测值相比，数据同一簇的观测值相互之间尽可能相似。

- 关联分析。

	用于发现描述数据中强关联特征的模式。

- 预测建模。

	指为目标变量建立模型，并将其作为解释变量的函数。其中又可以分为两类：
	- 分类：预测**离散**的目标变量。
	- 回归：预测**连续**的目标变量。

- 异常检测。

	识别其特征显著不同于其他数据的观测值。

## 快速导航
<CardGrid>
  <LinkCard title="数据" href="/dataMining/2lllinx7/" />
  <LinkCard title="关联分析" href="/dataMining/j32xc8g7/" />
</CardGrid>
