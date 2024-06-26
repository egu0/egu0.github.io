---
sidebarDepth: 2
sidebar: auto
---

# Numpy 科学计算库

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

## 目录

- [1. Numpy 科学计算库](/ai/ml-intro/)
- [2. Pandas 数据分析库](/ai/ml-intro/02-pandas/)
- [3. Mathplotlib 可视化库](/ai/ml-intro/03-matplotlib/)
- [4. 线性回归](/ai/ml-intro/04-linear-regression/)
- [5. 梯度下降](/ai/ml-intro/05-gradient-descent/)

链接：

- [仓库](https://gitee.com/egu0/ai-course-lfk)
- [课程](https://www.bilibili.com/video/BV1Vu411b7U4/)

## 引出 numpy 数组

使用 `list`

```py
lst = [0, 1, 2, 3, 4]
print(lst[0], lst[3], lst[-1])
print(lst[1:3]) # 切片，左开右闭
```

```
0 3 4
[1, 2]
```

`numpy` 数组提供了更多功能

```py
arr = np.array(lst)
print(arr[0], arr[3], arr[-1])
print(arr[1:3])
print(arr[[2,4]]) # 支持一次取出多个
```

```
0 3 4
[1 2]
[2 4]
```

也支持筛选

```py
cond = arr < 3
print(cond)
print(arr[cond])
```

```
[ True  True  True False False]
[0 1 2]
```

## 创建 numpy 数组

- `np.ones()` 创建元素为 0 的数组
- `np.zeros()` 创建元素为 1 的数组
- `np.full()` 创建元素为特定值的数组
- `np.random.randint()` 创建元素为随机整数的数组
- `np.random.randn()` 创建元素服从正态分布的数组
- `np.linspace()` 创建等差数列
- `np.logspace()` 创建等比数列

示例

```py
np.ones(shape = 10)
#array([1., 1., 1., 1., 1., 1., 1., 1., 1., 1.])

np.zeros(shape = 5)
#array([0., 0., 0., 0., 0.])

np.full(shape = 6, fill_value= 3.14)
#array([3.14, 3.14, 3.14, 3.14, 3.14, 3.14])

np.random.randint(0, 10, size = 10) # (low, high, size), 左开右闭
#array([7, 6, 6, 1, 8, 8, 0, 5, 8, 9])

# 正态分布
np.random.randn(3)
#array([ 0.60001453, -1.65459356, -0.14038033])

# 等差数列，基本参数为 (start, stop, num)，间隔为 (stop-start)/(num-1)
np.linspace(0, 10, 5)
#array([ 0. ,  2.5,  5. ,  7.5, 10. ])

# 关闭科学计数法
np.set_printoptions(suppress=True)
# 等比数列, (start, stop, num)
np.logspace(0, 10, base = 2, num = 11) # [ base^start, ..., base^end ], 一共 num 个元素
#array([   1.,    2.,    4.,    8.,   16.,   32.,   64.,  128.,  256.,  512., 1024.])
```

上边示例都是创建一位数组，也可以指定 `shape/size` 为 tuple，表示创建二维数组，比如

```py
np.zeros(shape = (3, 4))
#array([[0., 0., 0., 0.],
#       [0., 0., 0., 0.],
#       [0., 0., 0., 0.]])
```

## 查看 numpy 数组

- `arr.shape` 查看数组形状
- `arr.ndim` 查看数组维度数
- `arr.dtype` 查看数据类型
- `arr.itemsize` 查看元素占用内存的大小

示例

```py
arr = np.random.randint(0, 3, size = (2, 3)) + 1
#array([[2, 1, 3],
#       [2, 2, 3]])

arr.shape
#(2, 3)

arr.ndim
#2

arr.size
#6

# 数据类型
arr.dtype
#dtype('int64')

# 每个元素占用的大小，单位为字节
arr.itemsize
#8
```

## 保存或加载数组

使用 save 保存一个 numpy 数组，然后加载它

```py
arr1 = np.ones(shape = (3, 4))

np.save('./data1', arr1) # 将 arr1 数组保存到 data1.npy 文件

# 加载 .npy 文件
np.load('./data1.npy')
#array([[1., 1., 1., 1.],
#       [1., 1., 1., 1.],
#       [1., 1., 1., 1.]])
```

使用 savez 保存多个 numpy 数组，然后分别加载它们

```py
np.savez('./data2', arr1=arr1, arr2=arr2) 
# 使用 savez 方法，第一个参数为文件名，无需指定扩展
#      之后的参数是 数组key = 数组，数组key 可以自定义

# 加载 .npz 文件，取出指定 key 的数组
np.load('./data2.npz')['arr1']
#array([[1., 1., 1., 1.],
#       [1., 1., 1., 1.],
#       [1., 1., 1., 1.]])
```

使用 csv 格式持久化 numpy 数组（若要指定为 txt 格式，需指定持久化文件为 `xxx.txt`）

```py
arr1 = np.random.randint(0, 10, size=10)

#指定后缀为 csv
np.savetxt('./arr.csv', arr1, delimiter=',')

#加载
np.loadtxt('./arr.csv', delimiter=',')
```

## 数据类型与转换

数据类型：

- 整型：`uint8`/`int8` /`int16`/`int32`/`int64`
- 浮点：`float16`/`float32`/`float64`

示例

```py
# 创建数组时指定类型
#np.array([1,2,3], dtype=np.uint8)
arr1 = np.array([1,2,3], dtype='uint8')
arr1
```

数据范围

| 类型    | 元素占用多少字节 |   范围   |
| ------- | ---------- | ---- |
| `uint8` | 1 |  `0~255`  |
| `int8` | 1 | `-128~127` |
| `int16` | 2 | `-32768-32767` |

```py
#验证
np.arange(-128, 130, dtype = np.int8)
np.arange(-32768, 32769, dtype = np.int16)
```

**类型转换**

```py
arr1 = np.array([1,2,3], dtype='uint8')

#方法一：转换为另一个数组时指定类型
arr2 = np.asarray(arr1, dtype = 'int8')
arr2

#方法二：拷贝数组并转换类型
arr3 = arr1.astype('int16')
arr3
```

## 数组运算

四则运算、幂运算

```py
nd + 5
nd - 3
nd * 2
nd / 2
nd // 2 # 整除
nd % 3  # 取模
nd ** 2 # 幂
np.power(nd, 2) # 幂
1/nd
```

逻辑运算

```py
nd < 4
nd == 4
```

赋值运算

```py
nd = nd + 1
nd -= 1
#nd /= 3 #不支持
nd //= 3 #支持
```

## 复制数组

在操作数组时，有时会将其数据复制到新数组中，有时不会复制。对于初学者来说这可能会引起混乱，有以下三种情况：

- 完全没有复制
- 通过 `view` 方法进行浅拷贝
- 通过 `copy` 方法进行深拷贝



比较不同

```PY
def compare(a, b):#a为源数组，b为结果数组
    print('b 和 a 对应同一个内存地址？', b is a)
    print('b 的根数据和 a 一样？', b.base is a)
    print('b 的数据是自己的？', b.flags.owndata)
    print('a 的数据是自己的？', a.flags.owndata)
    b[0,0] = 1024
    display(a, b)
```

完全不复制

```PY
a = np.random.randint(0, 10, size = (4,5))
compare(a, a)
```

```
b 和 a 对应同一个内存地址？ True
b 的根数据和 a 一样？ False
b 的数据是自己的？ True
a 的数据是自己的？ True
array([[1024,    3,    1,    5,    9],
       [   5,    6,    4,    6,    4],
       [   9,    4,    5,    6,    1],
       [   3,    4,    3,    3,    8]])
array([[1024,    3,    1,    5,    9],
       [   5,    6,    4,    6,    4],
       [   9,    4,    5,    6,    1],
       [   3,    4,    3,    3,    8]])
```



浅拷贝

```py
a = np.random.randint(0, 10, size = (4,5))
compare(a, a.view())
```

```
b 和 a 对应同一个内存地址？ False
b 的根数据和 a 一样？ True
b 的数据是自己的？ False
a 的数据是自己的？ True
array([[1024,    8,    9,    0,    0],
       [   9,    7,    4,    9,    3],
       [   7,    0,    2,    7,    1],
       [   3,    8,    0,    5,    1]])
array([[1024,    8,    9,    0,    0],
       [   9,    7,    4,    9,    3],
       [   7,    0,    2,    7,    1],
       [   3,    8,    0,    5,    1]])
```



深拷贝🌟

```py
a = np.random.randint(0, 10, size = (4,5))
compare(a, a.copy())
```

```
b 和 a 对应同一个内存地址？ False
b 的根数据和 a 一样？ False
b 的数据是自己的？ True
a 的数据是自己的？ True
array([[2, 1, 5, 5, 5],
       [7, 7, 0, 8, 2],
       [1, 4, 8, 1, 4],
       [5, 3, 2, 6, 5]])
array([[1024,    1,    5,    5,    5],
       [   7,    7,    0,    8,    2],
       [   1,    4,    8,    1,    4],
       [   5,    3,    2,    6,    5]])
```

## 索引和切片

### 花式索引

**花式索引**：用来索引 nparray 数组的数组，和切片方式不同，它总是将数据复制到新数组中。

**一、元素为整数类型的花式索引数组**

一维

```py
arr = np.random.randint(0, 10, 20)
#array([3, 3, 6, 6, 0, 3, 8, 9, 6, 5, 3, 2, 6, 3, 5, 7, 2, 7, 2, 4])

# 通过花式索引获取元素，将元素复制到新数组
arr2 = arr[[1,3,5]]
#array([3, 6, 3])

# 修改新数组，不会改变源数组
arr2[0] = -1
#array([-1, 6, 3])

print(arr)
#array([3, 3, 6, 6, 0, 3, 8, 9, 6, 5, 3, 2, 6, 3, 5, 7, 2, 7, 2, 4])
```

拓展：`argsort` 方法，获取用于排序的花式索引

```py
arr5 = np.random.randint(0, 50, size=5)
#array([ 3, 39, 19, 35, 32])

sort_idx = arr5.argsort()
#array([0, 2, 4, 3, 1])

arr5[sort_idx]
#array([ 3, 19, 32, 35, 39])
```

二维

```py
arr3 = np.random.randint(0, 10, size = (4, 5))
#array([[6, 9, 0, 2, 0],
#       [6, 3, 3, 5, 5],
#       [4, 7, 5, 5, 8],
#       [2, 6, 0, 5, 7]])

#-----------------

#通过花式索引取出第 2、4 行
arr3[[1,3]]
#array([[6, 3, 3, 5, 5],
#       [2, 6, 0, 5, 7]])

#取出第1、2列
arr3[:, [0,1]]

#-----------------

#通过花式索引取出某个点
arr3[[1],[1]]
#array([3])

#扩展1：取出 1,2 和 3,4 两个坐标的元素。【注意：不是两行两列的四个交点元素】
arr3[[1,3], [2, 4]]
#array([3, 7])

#扩展2:取出多个坐标的元素，坐标分别为 1,1  3,2  3,3  3,4
arr3[[1, 3, 3, 3], [1, 2, 3, 4]]
#array([3, 0, 5, 7])

#扩展3:取出多个坐标的元素，坐标分别为 1,1  3,1  3,1  3,1
arr3[[1, 3, 3, 3], [1]]
#array([3, 6, 6, 6])

#-----------------

#取出两行和两列交点处的四个元素【相较上边的方法，这里保留了相对位置】
arr3[[1,3]][:, [[3,4]]]
#array([[[5, 5]],
#       [[5, 7]]])

#也可以利用 np.ix_ 指定行列数组，传递两个花式索引，第一个表示行、第二个表示列
i = np.ix_([1,3], [3, 4])
#(array([[1],
#        [3]]),
# array([[3, 4]]))
arr3(i)
#array([[[5, 5]],
#       [[5, 7]]])
```

**二、元素为布尔类型的花式索引，索引数组长度需要和源数组相同**

```py
arr4 = np.random.randint(0, 100, 20)
#array([82, 29, 76,  9, 70, 27, 41, 17, 94, 65, 11, 82, 97,  6, 87, 21,  6,
#       36, 78, 33])

cond = arr4 > 50 # 得到布尔类型的花式索引
#array([ True, False,  True, False,  True, False, False, False,  True,
#        True, False,  True,  True, False,  True, False, False, False,
#        True, False])
arr4[cond]
#array([82, 76, 70, 94, 65, 82, 97, 87, 78])

cond1 = arr4 < 20
cond2 = arr4 > 80
cond3 = cond1 | cond2
arr4[cond3]
#array([82,  9, 17, 94, 11, 82, 97,  6, 87,  6])
```

### 一维数组

```py
arr1 = np.random.randint(0, 100, size = 10)
#array([41,  8,  1, 73, 39, 38, 53, 71, 96, 37])
```

```py
arr1[0]
#41
```

```py
arr1[-1]
#37
```

```py
#一次取多个
arr1[[0,2,8]]
#array([41,  1, 96])
```

**切片**

```py
arr1[3:6]
#array([73, 39, 38])
```

```py
#指定步长，arr1[3:6:2] 相当于 arr1[[3,5]]
arr1[3:6:2] == arr1[[3,5]]
#array([ True,  True])
```

```py
#从后向前取，步长为-1
arr1[::-1]
#array([37, 96, 71, 53, 38, 39, 73,  1,  8, 41])
```

### 二维数组

```py
arr2 = np.random.randint(0, 100, size = (3, 5))
#array([[ 0, 87, 17, 73,  9],
#       [ 4, 78, 46, 84, 68],
#       [49, 67, 38, 49, 16]])
```

根据索引取值

```py
arr2[1,1]
#78
```

```py
arr2[-1,-1]
#16
```

取出指定行或列

```py
#取出第2行
arr2[1]
#array([4, 78, 46, 84, 68])

#通过花式索引取
arr2[[1]]
#array([[4, 78, 46, 84, 68]])
```

```py
#取出第2列
arr2[:, 1]
#array([87, 78, 67])

#取出第2列
arr2[:, [1]]
#array([[87, 78, 67]])
```

取指定多行或多列（见花式索引）

**通过切片取多行或多列**

```py
#通过切片取某几行
arr2[1:]
#array([[ 4, 78, 46, 84, 68],
#       [49, 67, 38, 49, 16]])
```

```py
#通过切片取某几列
arr2[:, 3:]
#array([[73,  9],
#       [84, 68],
#       [49, 16]])
```

通过切片取某行上某一范围

```py
# 取第二行后三个数
arr2[1, -3:]
# 等价于
# arr2[1, 2:]
# arr2[1, [2, 3, 4]]
# arr2[1, [-3, -2, -1]]

#array([46, 84, 68])
```

通过切片取指定区域

```py
# 使用切片取出右下角 2x2 区域
arr2[-2:, -2:]
# 等价于
# arr2[1:, 3:]
# arr2[[1,2], 3:]
# arr2[1:, [3,4]]
# arr2[[1,2], [3,4]]

#array([[84, 68],
#       [49, 16]])
```

```py
#指定切片的范围和步长
arr2[:, 1::2]

#array([[87, 73],
#       [78, 84],
#       [67, 49]])
```

```py
#赋值
arr2[2, [-3, -1]] = 1024

#array([[   0,   87,   17,   73,    9],
#       [   4,   78,   46,   84,   68],
#       [  49,   67, 1024,   49, 1024]])
```



**总结**：对于二维数组`arr[x, y]`，以 x 为例（y 同理）

- 当 x 为整数时，表示指定某一行
- 当 x 是切片时，可以指定具有相同的规律的多行
- 当 x 是花式索引时，可以指定任意多行，比较灵活

## 练习-1

```
1. 创建一个长度为 10 的一维全为 0 的 ndarray 数组，然后让第 5 个元素等于 1
2. 创建一个元素为从 10 到 49（包含 49）的 ndarray 数组，间隔是 1
3. 将第 2 题中数组的所有元素位置反转
4. 使用 np.random.random 创建一个 10*10 的 nparray 数组，并打印出最大和最小元素
5. 创建一个 10*10 的 ndarray 数组，矩阵边界为 1，里边全为 0
6. 创建一个每一行都是从 0 到 4 的 5*5 矩阵
7. 创建一个范围在 (0,1) 之间的长度为 12 的等差数列；创建 [1,2,4,8,16,32,64,128,256,512,1024] 的等比数列
8. 创建一个长度为 10 的正态分布数组并排序
9. 创建一个长度为 10 的随机数组并将最大值替换为 -100
10. 如何根据第 3 列大小顺序来对一个 5*5 矩阵排序？（提示：查阅 argsort 方法；根据某一列重新组织行顺序）
```

练习代码见 `Practice 1.ipynb`

```py
#no.10

ar = np.random.randint(0, 50, size=(5,5))
#array([[43, 29, 31,  0, 17],
#       [49, 22,  9, 17, 46],
#       [41, 17, 18,  8, 37],
#       [13, 14, 41, 47, 32],
#       [13,  7, 12, 27, 11]])

col3 = ar[:, 2]
print(col3)
#[31  9 18 41 12]

sort_idx = col3.argsort()
print(col3[sort_idx])
#[ 9 12 18 31 41]
sort_idx
#array([1, 4, 2, 0, 3])

ar[sort_idx]
#array([[49, 22,  9, 17, 46],
#       [13,  7, 12, 27, 11],
#       [41, 17, 18,  8, 37],
#       [43, 29, 31,  0, 17],
#       [13, 14, 41, 47, 32]])
```

## 形状改变

### reshape

```py
arr = np.random.randint(0, 100, size = (3, 4))
arr
#array([[44, 70, 32, 11],
#       [ 6, 51, 43, 64],
#       [12, 13, 53, 64]])

arr.shape
#(3, 4)

arr.reshape(4,3)
#array([[44, 70, 32],
#       [11,  6, 51],
#       [43, 64, 12],
#       [13, 53, 64]])

arr.reshape(2, 6)
#array([[44, 70, 32, 11,  6, 51],
#       [43, 64, 12, 13, 53, 64]])

# -1 表示最后自动计算
arr.reshape(2, -1)
#array([[44, 70, 32, 11,  6, 51],
#       [43, 64, 12, 13, 53, 64]])

arr.reshape(-1, 2)
#array([[44, 70],
#       [32, 11],
#       [ 6, 51],
#       [43, 64],
#       [12, 13],
#       [53, 64]])

# 只指定 -1 会转为一维平铺数组
arr.reshape(-1)
#array([44, 70, 32, 11,  6, 51, 43, 64, 12, 13, 53, 64])
```

### 叠加

```py
arr1 = np.random.randint(0, 10, size=(2, 4))
arr2 = np.random.randint(-5, 5, size=(3, 4))

display(arr1, arr2)
#array([[4, 4, 6, 1],
#       [8, 5, 7, 7]])
#array([[ 0, -2, -2, -4],
#       [ 1, -4,  1, -4],
#       [ 3,  4, -2, -2]])

# 数组合并，默认进行行合并(axis=0)，需要列数相同，否则报错
np.concatenate([arr1, arr2, arr1])
#array([[ 4,  4,  6,  1],
#       [ 8,  5,  7,  7],
#       [ 0, -2, -2, -4],
#       [ 1, -4,  1, -4],
#       [ 3,  4, -2, -2],
#       [ 4,  4,  6,  1],
#       [ 8,  5,  7,  7]])
```

```py
arr1 = np.random.randint(0, 10, size=(3, 5))
arr2 = np.random.randint(-5, 5, size=(3, 4))

display(arr1, arr2)
#array([[4, 7, 8, 1, 0],
#       [5, 6, 2, 4, 9],
#       [3, 0, 7, 9, 7]])
#array([[-3,  3,  0, -5],
#       [-4,  3, -5, -3],
#       [ 2, -1, -2, -3]])

# 指定 axis=1/axis=-1 表示列合并，需要行数相同，否则报错
np.concatenate([arr1, arr2], axis=1)
#array([[ 4,  7,  8,  1,  0, -3,  3,  0, -5],
#       [ 5,  6,  2,  4,  9, -4,  3, -5, -3],
#       [ 3,  0,  7,  9,  7,  2, -1, -2, -3]])
```

### 拆分

```py
arr1 = np.random.randint(0, 100, size = (6,9))
arr1
#array([[83, 75, 41, 24, 65, 13, 28, 87, 83],
#       [83, 85, 47, 72, 93,  7, 61, 90, 60],
#       [92, 77, 50, 83, 66, 18, 77, 47, 15],
#       [97, 92, 57,  9, 76, 46, 58, 30, 35],
#       [57, 25, 76,  3, 96, 42,  6, 60, 22],
#       [74, 76,  8,  9, 92, 38, 80, 95, 10]])
```

```py
#按行拆分

#平均拆成两部分
display(np.split(arr1, 2))
#[array([[83, 75, 41, 24, 65, 13, 28, 87, 83],
#        [83, 85, 47, 72, 93,  7, 61, 90, 60],
#        [92, 77, 50, 83, 66, 18, 77, 47, 15]]),
# array([[97, 92, 57,  9, 76, 46, 58, 30, 35],
#        [57, 25, 76,  3, 96, 42,  6, 60, 22],
#        [74, 76,  8,  9, 92, 38, 80, 95, 10]])]

#平均拆成三部分
display(np.split(arr1, 3))
#[array([[83, 75, 41, 24, 65, 13, 28, 87, 83],
#        [83, 85, 47, 72, 93,  7, 61, 90, 60]]),
# array([[92, 77, 50, 83, 66, 18, 77, 47, 15],
#        [97, 92, 57,  9, 76, 46, 58, 30, 35]]),
# array([[57, 25, 76,  3, 96, 42,  6, 60, 22],
#        [74, 76,  8,  9, 92, 38, 80, 95, 10]])]

#指定拆分点。[1,3,5] -> [:1],[1:3],[3:5],[5:]
display(np.split(arr1, [1,3,5]))
#[array([[83, 75, 41, 24, 65, 13, 28, 87, 83]]),
# array([[83, 85, 47, 72, 93,  7, 61, 90, 60],
#        [92, 77, 50, 83, 66, 18, 77, 47, 15]]),
# array([[97, 92, 57,  9, 76, 46, 58, 30, 35],
#        [57, 25, 76,  3, 96, 42,  6, 60, 22]]),
# array([[74, 76,  8,  9, 92, 38, 80, 95, 10]])]
```

```py
# 同理，按列拆分，需指定轴为 1

display(np.split(arr1, 3, axis=1))
#[array([[83, 75, 41],
#        [83, 85, 47],
#        [92, 77, 50],
#        [97, 92, 57],
#        [57, 25, 76],
#        [74, 76,  8]]),
# array([[24, 65, 13],
#        [72, 93,  7],
#        [83, 66, 18],
#        [ 9, 76, 46],
#        [ 3, 96, 42],
#        [ 9, 92, 38]]),
# array([[28, 87, 83],
#        [61, 90, 60],
#        [77, 47, 15],
#        [58, 30, 35],
#        [ 6, 60, 22],
#        [80, 95, 10]])]
```

### 转置

```py
arr = np.random.randint(0, 10, size=(3,5))
arr
#array([[3, 8, 4, 3, 1],
#       [4, 1, 8, 1, 7],
#       [0, 8, 2, 2, 8]])

arr.reshape(5,3)
#array([[3, 8, 4],
#       [3, 1, 4],
#       [1, 8, 1],
#       [7, 0, 8],
#       [2, 2, 8]])

# 转置（行变列、列变行）
arr.T
#array([[3, 4, 0],
#       [8, 1, 8],
#       [4, 8, 2],
#       [3, 1, 2],
#       [1, 7, 8]])

np.transpose(arr)
#array([[3, 4, 0],
#       [8, 1, 8],
#       [4, 8, 2],
#       [3, 1, 2],
#       [1, 7, 8]])
```

## 广播机制

当两个数组的形状不相同的时候，我们可以通过扩展数组的方法来实现相加、相减、相乘等操作，这种机制叫做广播（boardcasting）。

示例1

```py
arr1 = np.random.randint(0, 10, size = (5,3))
arr2 = np.arange(1, 4) # 创建数组 [1,2,3]

display(arr1, arr2)
#array([[9, 6, 4],
#       [5, 0, 3],
#       [6, 8, 9],
#       [0, 5, 4],
#       [7, 7, 0]])
#array([1, 2, 3])

# arr2 广播：arr2(1, 4) ===> arr2(5, 4)
arr1 + arr2
#array([[10,  8,  7],
#       [ 6,  2,  6],
#       [ 7, 10, 12],
#       [ 1,  7,  7],
#       [ 8,  9,  3]])
```

示例2

```py
arr1 = np.random.randint(0, 10, size = (4, 5))
display(arr1)

# 计算每一列的和
arr2 = arr1.sum(axis = 0)
display(arr2)

# 计算每一项占当前列的和的百分比，arr2(1, 5) ===> arr2(4,5)
display(arr1 / arr2)
```

```
array([[8, 6, 0, 5, 7],
       [7, 8, 2, 0, 7],
       [9, 3, 4, 4, 0],
       [2, 3, 7, 3, 3]])
array([26, 20, 13, 12, 17])
array([[0.30769231, 0.3       , 0.        , 0.41666667, 0.41176471],
       [0.26923077, 0.4       , 0.15384615, 0.        , 0.41176471],
       [0.34615385, 0.15      , 0.30769231, 0.33333333, 0.        ],
       [0.07692308, 0.15      , 0.53846154, 0.25      , 0.17647059]])
```

## 通用函数

### 元素及数字函数

```py
np.pi

np.sin(np.pi / 2)

np.cos(0)

np.sqrt(1024)

np.square(32)

np.power(3, 3)

2 ** 3

8 ** (1/3)

np.log10(100)
```

```py
np.ceil(3.99)

np.floor(3.99)

np.round(3.10)

np.round(3.45, decimals=1)
```

```py
x = np.array([1,2,3,4,5])
y = np.array([5,4,3,2,1])

# 每一列的最大值
np.maximum(x, y)

np.minimum(x, y)
```

```py
z = np.array([[3,4], [5,6]])
i = np.array([1,2])

# 计算一维数组向量内积
#  11 = 3*1 + 4*2
#  17 = 5*1 + 6*2
np.inner(i, z)
```

```py
arr = np.random.randint(0, 50, size = 20)
#array([21, 34,  0, 10,  8, 42, 43, 39, 49,  9, 46, 41,  0, 46,  9, 21, 25,
#       33, 28, 45])

#指定数组元素范围
np.clip(arr, 10, 40)
#array([21, 34, 10, 10, 10, 40, 40, 39, 40, 10, 40, 40, 10, 40, 10, 21, 25,
#       33, 28, 40])
```

### where 函数

```py
a1 = np.random.randint(0, 10, size=10)
a2 = np.random.randint(0, 10, size=10)

display(a1, a2)

cond = np.array([True, False, True, False, True, False, True, False, True, False])

# 根据 cond 进行选择，如果 cond[i] 为真则选择 a1[i]，反之选择 a2[i]
np.where(cond, a1, a2)
```

```
array([0, 4, 1, 3, 9, 9, 1, 5, 5, 8])
array([3, 6, 1, 8, 7, 8, 2, 7, 6, 9])
array([0, 6, 1, 8, 9, 8, 1, 7, 5, 9])
```

示例：处理成绩

```py
a3 = np.random.randint(-5, 105, size=10)
display(a3)

# 如果 a3[i] < 5 则选择 a3[i] 反之 >=5 选择 5
a4 = np.where(0 <= a3, a3, 0)
a5 = np.where(a4 <= 100, a4, 100)
a5
```

### 集合运算

```py
A = np.array([2, 4, 6, 8])
B = np.array([3, 4, 7, 8])

# 交集
np.intersect1d(A, B)
#array([4, 8])

# 并集
np.union1d(A, B)
#array([2, 3, 4, 6, 7, 8])

# 差集 A-B：A中有的、B中没有的
np.setdiff1d(A, B)
#array([2, 6])
```

### 数学和统计函数

- min 最小值
- max 最大值
- mean 平均值
- median 中位数
- sum 求和
- std 标准差
- var 方差
- cumsum 累加和
- cumprod
- argmin 最小值索引
- argmax 最大值索引
- argwhere 符合条件元素的索引
- cov 协方差矩阵
- corrcoef 相关性系数

```py
a1 = np.array([1, 7, 2, 19, 23, 0, 88, 11, 6, 11])

a1.min()

a1.argmax()
#6

np.argwhere(a1 > 10)
#array([[3],
#       [4],
#       [6],
#       [7],
#       [9]])

# c(i) =  a1[i] + c(i-1)
np.cumsum(a1)
#array([  1,   8,  10,  29,  52,  52, 140, 151, 157, 168])
```

```py
a2 = np.random.randint(0, 10, size=(4,5))
a2
#array([[6, 1, 6, 4, 4],
#       [7, 5, 6, 8, 2],
#       [5, 1, 7, 2, 7],
#       [0, 7, 5, 7, 4]])

a2.mean(axis = 0)
#array([4.5 , 3.5 , 6.  , 5.25, 4.25])

a2.mean(axis = 1)
#array([4.2, 5.6, 4.4, 4.6])

# 协方差矩阵
np.cov(a2, rowvar=True)
#array([[ 4.2 ,  1.35,  4.15, -3.9 ],
#       [ 1.35,  5.3 , -2.8 ,  0.05],
#       [ 4.15, -2.8 ,  7.8 , -4.3 ],
#       [-3.9 ,  0.05, -4.3 ,  8.3 ]])

# 相关性系数
np.corrcoef(a2, rowvar=True)
#array([[ 1.        ,  0.28613513,  0.72506368, -0.66054273],
#       [ 0.28613513,  1.        , -0.43548459,  0.00753864],
#       [ 0.72506368, -0.43548459,  1.        , -0.53441927],
#       [-0.66054273,  0.00753864, -0.53441927,  1.        ]])
```

## 矩阵运算

### 矩阵乘积

也叫点乘

```py
A = np.array([[4,2,3],
              [1,3,1]]) # 2x3
B = np.array([[2,7],
              [-5,-7],
              [9,3]])   # 3x2

# A 的最后一维要和 B 的第一维相同
# 三种写法
np.dot(A, B)
A @ B
A.dot(B)
```

```
array([[ 25,  23],
       [ -4, -11]])
```

### 其他运算

矩阵的逆、行列式、特征值、特征向量、qr分解值、svd分解值

```py
from numpy.linalg import inv, det
A = np.random.randint(1, 10, size=(3,3))
A
#array([[3, 1, 1],
#       [5, 2, 6],
#       [8, 3, 1]])

np.set_printoptions(suppress=True)

# 计算 A 的逆矩阵
B = inv(A)
B
#array([[ 2.66666667, -0.33333333, -0.66666667],
#       [-7.16666667,  0.83333333,  2.16666667],
#       [ 0.16666667,  0.16666667, -0.16666667]])

A @ B
#array([[ 1., -0.,  0.],
#       [-0.,  1.,  0.],
#       [ 0.,  0.,  1.]])
```

```py
# 计算行列式，https://en.wikipedia.org/wiki/Determinant
det(A)
# 3(2-18)+(48-5)+(15-16)=-48+43-1=-6
#-6.0
```

## 练习-2

代码见 `Practice 2.ipynb`

1、给定一个 4 维数组，如何得到最后两维所有数据的和？（hint：指定 axis 进行计算）

```py 
arr = np.random.randint(0, 20, size = (3, 4, 5, 6))
res = arr.sum(axis = (-2, -1))
display(res.shape)
display(res)
```

2、给定数组 `[1,2,3,4,5]`，请在这个数组每个元素之间插入 3 个 0，并打印出新数组

```py
arr = np.arange(1,6)

#17 = 5 + 4*3
arr2 = np.zeros(shape=17, dtype=np.int16)

arr2[::4] = arr
arr2
#array([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5], dtype=int16)
```

3、给定一个 2 维矩阵（5x4），如何交换其中两行的元素？（hint：花式索引）

```py
arr = np.random.randint(0, 20, size = (4,5))
arr2 = arr[[3, 1, 2, 0]]
```

4、创建一个长度为 `100000` 的随机数组，使用两种方法对其求三次方（for循环；numpy方法），并统计所用方法

```py
arr = np.random.randint(0, 10, size = 100000)
#--- %%time 用来统计单个cell运行时间
%%time
res1 = np.power(arr, 3)
res1
#---
%%time
res2 = []
for i in arr:
    res2.append(i ** 3)
res2[:4]
```

5、创建一个 5x3 的矩阵和一个 3x2 的矩阵，计算二者乘积

```py
np.random.randint(0, 10, size=(5,3)) @ np.random.randint(0, 10, size=(3,2))
```

6、矩阵的每一行的元素都减去改行的平均值（hint：考虑指定 axis）

```py
arr = np.random.randint(0, 10, size = (3,4))
line_avg = arr.mean(axis = 1)
arr - line_avg.reshape(3, 1)
```

7、创建下边给出矩阵（开始时需要使用 `np.zeros` 创建 8x8 的矩阵）

```
[[0 1 0 1 0 1 0 1]
 [1 0 1 0 1 0 1 0]
 [0 1 0 1 0 1 0 1]
 [1 0 1 0 1 0 1 0]
 [0 1 0 1 0 1 0 1]
 [1 0 1 0 1 0 1 0]
 [0 1 0 1 0 1 0 1]
 [1 0 1 0 1 0 1 0]]
```

```py
arr = np.zeros(shape = (8,8), dtype = np.int16)
# 2n 行
arr[::2] = 1
arr[:, ::2] = 0
# 2n+1 行
arr[1::2] = 1
arr[1::2, 1::2] = 0
```

8、正则化一个 5x5 的随机矩阵（数据从一变成 0~1 之间的数字，相当大进行缩小）

正则化：矩阵 A 中的每一列减去这一列最小值，除以每一列的最大值减去每一列的最小值（hint：指定 axis）

<font size=6>$A = \frac{A - A.min}{A.max - A.min}$</font>

```py
arr = np.random.randint(0, 10, size = (5,5))
col_min = arr.min(axis = 0)
col_max = arr.max(axis = 0)

frac_up = arr - col_min
frac_down = col_max - col_min

res = frac_up / frac_down
```

9、根据两个或多个调价按过滤 numpy 数组：加载 iris 数据集，筛选出第一列小于 5.0 并且第三列大于 1.5 的数据（使用布尔类型的花式索引进行筛选）

```py
data = np.loadtxt('iris_dataset.csv', delimiter=',')

cond1 = data[:, 0] < 5
cond2 = data[:, 2] > 1.5
cond = cond1 & cond2

res = data[cond]
```

10、计算出 iris 数据集中每个数据在每一行的 sofrmax 得分（hint：exp 表示自然底数 e 的幂运算）

<font size=6>$Softmax(z_i)=\frac{exp(z_i)}{\sum_j{exp(z_j)}}$</font>

```py
data = np.loadtxt('iris_dataset.csv', delimiter=',')
data.shape
#(150, 4)

exp_data = np.exp(data)

row_exp_sum = exp_data.sum(axis = 1)
row_exp_sum.shape
#(150,)

res = exp_data / row_exp_sum.reshape(150, 1)
res[:5]
#array([[0.81032902, 0.16360261, 0.02003419, 0.00603418],
#       [0.84114103, 0.1258083 , 0.02540026, 0.00765041],
#       [0.78888466, 0.17602396, 0.02632766, 0.00876372],
#       [0.78097135, 0.17425826, 0.03518214, 0.00958825],
#       [0.77993968, 0.19233076, 0.02131086, 0.00641871]])
```

## 综合案例

读取 [iris 数据集](https://gist.github.com/Thanatoz-1/9e7fdfb8189f0cdf5d73a494e4a6392a)中的花萼长度数据，对其进行排序、去重、求和、累积和、均值、方差、标准差、最大值、最小值。

```py
import numpy as np

data = np.loadtxt('iris_dataset.csv', delimiter=',')
col1 = data[:, 0]

#排序
col1[col1.argsort()]

#去重
np.unique(col1)

#求和
np.sum(col1)

#累积和
col1.cumsum()

#均值
np.mean(col1)

#最大值
col1.max()

#最小值
col1.min()

#方差
col1.var()

#标准差
col1.std()
```









































