---
sidebarDepth: 2
sidebar: auto
---

# 梯度下降及优化

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>


## 梯度下降介绍

<font size=5>$\theta^{t+1} = \theta^{t} - \alpha * gradient$</font>

<font size=5>$\theta^{t+1} = \theta^{t} - \alpha * \frac {\partial J(\theta)}{\partial \theta}$</font>

<font size=5>$J(\theta)=\frac{1}{2} \sum \limits_{i=0}^m (h_{\theta}(x^{(i)}) - y^{(i)}) ^ 2$</font>

<font size=5>$J(\theta)=\frac{1}{2} (X\theta - y)^T(X\theta - y)$</font>

<font size=6>$\theta_k^{t+1} = \theta_k^{t} - \alpha * \frac {\partial J(\theta)}{\partial \theta_k}$</font>

<font size=6>$\frac{\partial J(\theta)}{\partial \theta_k} = \frac{\partial}{\partial \theta_k} \frac{1}{2} \sum \limits_{i=0}^m (h_{\theta}(x^{(i)}) - y^{(i)})^2$</font>

<font size=6>$\frac{\partial J(\theta)}{\partial \theta_k} = \sum \limits_{i=0}^m \left((h_{\theta}(x^{(i)}) - y^{(i)}) \frac{\partial}{\partial \theta_k} (h_{\theta}(x^{(i)}) - y^{(i)}) \right)$</font>

<font size=6>$h_{\theta}(x^{(i)}) = \sum \limits_{j=0}^n \theta_jx_j^{(i)}$</font>

<font size=6>$\frac{\partial J(\theta)}{\partial \theta_k} = \sum \limits_{i=0}^m \left((h_{\theta}(x^{(i)}) - y^{(i)}) \frac{\partial}{\partial \theta_k} (\sum \limits_{j=0}^n \theta_jx_j^{(i)} - y^{(i)}) \right)$</font>

<font size=6>$\frac{\partial J(\theta)}{\partial \theta_k} = \sum \limits_{i=0}^m ((\sum \limits_{j=0}^n \theta_jx_j^{(i)} - y^{(i)}) x_k^{(i)})$</font>

<font size=6>$\theta_k^{t+1} = \theta_k^{t} - \alpha * \sum \limits_{i=0}^m ((\sum \limits_{j=0}^n \theta_jx_j^{(i)} - y^{(i)}) x_k^{(i)})$</font>