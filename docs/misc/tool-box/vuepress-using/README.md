---
sidebarDepth: 2
sidebar: auto
---

# Vuepress v1 实践记录

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>


## 开始编写文章

1、在 md 文件头部使用 `YAML front matter` 语法，用于自动生成侧边栏

```
---
sidebarDepth: 2
sidebar: auto
---
```

2、根据上一步配置，组织文章标题时需要遵守的规则为：文章标题使用一级标题；章节标题使用二级标题。示例：

```markdown
# title

## chapter 1

this is chapter 1

## chapter 2

this is chapter 2
```

3、修改 config.js，指定文章所在的分类

## 出错了

### Case 1：链接中未被解析出 base 路径

错误：生成的链接少了一截儿 base 路径，即这里的 `/ops`

原因：链接路径要以 `/` 结尾，比如 `[Redux](/frameworks/react0/02_redux/)`

### Case 2：数学公式支持

添加 katex 公式支持：[link](https://github.com/vuejs/vuepress/issues/289#issuecomment-385241105)

注意：**推荐把两个 link 标签放在一级标题下**，比如

```markdown
# title 1

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

## title 2

...
```

示例：

<font color=green size=6>$\frac{\partial X^3\theta}{lg(x^t)}xy^{T}z$</font>


## 参考

- [网站所在仓库](https://gitee.com/egu0/ops)
- [vuepress-v1 中文文档](https://v1.vuepress.vuejs.org/zh/guide/)
- [vuepress v1 使用教程，来自 codemonkey](https://www.youtube.com/playlist?list=PLGR7Axzvu1uyrMhld39BK1BqP7ncPkTaV)
