---
sidebarDepth: 2
sidebar: auto
---

# Zustand 入门

## 目录

- [1. React 入门](/frameworks/react0/)
- [2. Redux](/frameworks/react0/02_redux/)
- [3. Router](/frameworks/react0/03_router/)
- [4. 极客网](/frameworks/react0/04_jikewang/)
- [5. React 进阶](/frameworks/react0/05_enhance/)
- [6. Zustand](/frameworks/react0/06_zustand/)
- [7. 使用 TS 编写 React](/frameworks/react0/07_with_ts/)

## 介绍

<https://github.com/pmndrs/zustand>

> 一种小型、快速且可扩展的 Bearbones 状态管理解决方案，使用简化的通量原理。拥有基于钩子的舒适 API，不是样板文件或固执己见。

安装：

```sh
npm i zustand
```

## 基础

使用步骤：

1. 创建 store。所用的 `create` 方法参数需是一个函数，这个参数需要返回一个对象，其中定义两项：
   1. 状态
   2. 修改状态的函数。修改状态需要使用 `set` 函数，该函数必须返回一个对象，参数可以是函数或对象
2. 解构 store，获取状态即修改方法

示例：计数器

```jsx
import { create } from 'zustand'

//创建Store
const useStore = create((set) => {
  return {
    //状态数据
    count: 0,
    //修改状态数据的方法
    incCount: () =>
      set((state) => {
        return {
          count: state.count + 1,
        }
      }),
  }
})

function App() {
  const { count, incCount } = useStore()
  return (
    <div>
      <p>count is {count}</p>
      <button onClick={incCount}>count+1</button>
    </div>
  )
}

export default App
```

上边的 `incCount` 也可见简写为：

```jsx
    incCount: () => {
      set((state) => ({ count: state.count + 1 }))
    },
```

`set` 函数的参数也可以是一个对象：

```js
incCount: () => {
    set({count: 100})
}
```

## 异步支持

```jsx
import { useEffect } from 'react'
import { create } from 'zustand'

const useStore = create((set) => {
  return {
    userList: [],
      //异步处理
    fetchUserList: async () => {
      const rsp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await rsp.json()
      set((state) => ({ userList: data }))
    },
  }
})

function App() {
  const { userList, fetchUserList } = useStore()
  useEffect(() => {
    fetchUserList()
  })
    
  return (
    <div>
      <h3>head count: {userList.length}</h3>
      {userList.map((item) => {
        return <div key={item.name}>{item.name}</div>
      })}
    </div>
  )
}

export default App
```

## 切片模式

当单个 store 比较大时候，可以采用**切片模式**进行模块拆分组合，类似于模块化

原 store：

```jsx
const useStore = create((set) => {
  return {
    count: 0,
    incCount: () => 
      set((state) => {
        return {
          count: state.count + 1,
        }
      }),
    userList: [],
    fetchUserList: async () => {
      const rsp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await rsp.json()
      set((state) => ({ userList: data }))
    },
  }
})
```

拆分后的：

```jsx
const countStore = (set) => {
  return {
    count: 0,
    incCount: () => {
      set((state) => ({ count: state.count + 1 }))
    },
  }
}

const userStore = (set) => {
  return {
    userList: [],
    fetchUserList: async () => {
      const rsp = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await rsp.json()
      set((state) => ({ userList: data }))
    },
  }
}

const useStore = create((...a) => {
  return {
    ...countStore(...a),
    ...userStore(...a),
  }
})
```
