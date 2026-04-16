import { useEffect, useState, createContext, useContext } from 'react';

// 创建主题上下文
export const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({ isDarkMode: false, toggleDarkMode: () => { } });

// 主题上下文提供者组件
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义钩子，方便使用主题上下文
export const useTheme = () => useContext(ThemeContext);
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// 导航组件
const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className={isDarkMode ? "bg-black/80 backdrop-blur-sm shadow-sm sticky top-0 z-10" : "bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10"}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className={isDarkMode ? "text-primary-400 font-semibold" : "text-xl font-semibold text-primary-700"}>Lin.blog</Link>
        {isHomePage && (
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex space-x-8">
              <Link to="/" className={isDarkMode ? "text-primary-400 font-medium hover:text-primary-300 transition-colors" : "text-primary-700 font-medium hover:text-primary-500 transition-colors"} onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>关于</Link>
              <Link to="/" className={isDarkMode ? "text-gray-300 hover:text-primary-400 transition-colors" : "text-gray-600 hover:text-primary-500 transition-colors"} onClick={(e) => {
                e.preventDefault();
                const techStackSection = document.getElementById('tech-stack-section');
                if (techStackSection) {
                  const navHeight = 60; // 导航栏高度
                  const elementPosition = techStackSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}>技术栈</Link>
              <Link to="/" className={isDarkMode ? "text-gray-300 hover:text-primary-400 transition-colors" : "text-gray-600 hover:text-primary-500 transition-colors"} onClick={(e) => {
                e.preventDefault();
                const projectsSection = document.getElementById('projects-section');
                if (projectsSection) {
                  const navHeight = 60; // 导航栏高度
                  const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}>项目</Link>
              <Link to="/" className={isDarkMode ? "text-gray-300 hover:text-primary-400 transition-colors" : "text-gray-600 hover:text-primary-500 transition-colors"} onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  const navHeight = 60; // 导航栏高度
                  const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}>联系</Link>
            </div>
          </div>
        )}
        <div className="flex space-x-4">
          <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <div className="md:hidden">
            <button className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// 技术页面组件
const ReactPage = () => {
  const { isDarkMode } = useTheme();

  // 页面挂载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen bg-contain bg-top bg-no-repeat font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-[#DEE2E1] text-gray-800'}`} style={{ backgroundImage: isDarkMode ? "url('/src/assets/images/bg2.jpg')" : "url('/src/assets/images/bg1.jpg')" }}>
      {/* 导航栏 */}
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className={`rounded-2xl shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>React 开发实践</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">React</span>
            <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>前端</span>
            <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>最佳实践</span>
            <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>2026-04-14</span>
          </div>
          <div className="prose max-w-none">
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并维护。它允许开发者创建大型应用程序，这些应用程序可以随着数据的变化而高效地更新。
            </p>

            <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>类组件状态管理</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              类组件可以定义状态 [状态数据]，通过特殊的 state 属性来管理组件的内部数据。
            </p>

            <h3 className={`text-xl font-bold mt-6 mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>类组件定义状态数据的方式</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              1、类组件定义状态数据的方式，就是添加一个特殊名的属性 state
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`import React, { Component } from 'react'

/*
状态数据研究三个方向：
1、如何定义状态
2、如何读取状态
3、如何修改状态
*/

export default class App extends Component {
  // 定义状态的方式一：
  constructor() {
    super() //调用父类的构造函数
    // 定义自己的属性 state，就是类组件的状态数据
    this.state = {
      count: 100,
      msg: 'this is a message'
    }
  }
  
  render() {
    console.log('this', this) // 永远指向当前实例对象
    // 解构使用
    let { count, msg } = this.state
    return (
      <div>
        <p>count: {count}</p>
        <p>msg: {msg}</p>
      </div>
    )
  }
}`}
              </pre>
            </div>

            <p className="text-gray-600 mb-4">
              2、方式二：直接赋值定义
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`// 定义状态的方式二：
state = {
  count: 1,
  msg: 'this is a message'
}

render() {
  console.log('this', this) // 永远指向当前实例对象
  // 解构使用
  let { count, msg } = this.state
  return (
    <div>
      <p>count: {count}</p>
      <p>msg: {msg}</p>
    </div>
  )
}`}
              </pre>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">setState 修改状态数据</h3>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`export default class App extends Component {
  state = {
    count: 1,
    msg: 'this is a message'
  }
  
  addCount(num) {
    //直接赋值改变状态数据 可以改变状态数据，但是不会触发组件重新渲染
    // this.state.count += num
    // console.log('count:', this.state.count)
    
    /*
    this.setState()
    1、将状态数据的值改变
    2、触发render重新调用
    */
    this.setState({
      count: this.state.count + num
    })
  }
  
  changeMsg() {
    this.setState({
      msg: this.state.msg + '!' // 基于原状态创建新值，不直接修改原 state
    })
  }
  
  render() {
    console.log('render run')
    // 解构使用
    let { count, msg } = this.state
    return (
      <div>
        <p>count: {count}</p>
        <p>msg: {msg}</p>
        <p><button onClick={() => this.addCount(3)}>有问题count++</button></p>
        <p><button onClick={() => this.changeMsg()}>msg + !</button></p>
      </div>
    )
  }
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">组件间通信</h2>
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">类的子组件如何接收父组件传递的外部数据</h3>
            <p className="text-gray-600 mb-4">
              外部数据 props，组件间通信借助 props 传递
            </p>

            <h4 className="text-lg font-bold text-gray-800 mt-4 mb-2">1、父组件向子组件传递数据</h4>
            <p className="text-gray-600 mb-4">
              父组件通过子组件调用标签属性的方式传递，子组件通过固定属性接收：
              <br />1) 类的子组件通过固定属性 this.props 接收
              <br />2) 函数子组件通过函数的形参接收（一般会直接在参数位置解构）
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`// 父组件：
/* 父组件通过子组件标签属性传递数据给子组件 */
<ClassCom count={count} msg={msg} school="DPU" />

// 子组件：由于父组件中存在setState属性，父组件变化每次都会重新render
// 子组件也会跟着变化

import React, { Component } from 'react'

export default class ClassCom extends Component {
  render() {
    // 子组件通过特殊属性 this.props 进行接收
    console.log('classCom render');
    console.log('this.props:', this.props);
    // 解构使用
    let { count, msg, school } = this.props
    return (
      <div>
        <h3>ClassCom</h3>
        <p>props count:{this.props.count} | {count}</p>
        <p>props msg:{this.props.msg} | {msg}</p>
        <p>props school: {this.props.school} | {school}</p>
      </div>
    )
  }
}`}
              </pre>
            </div>

            <p className="text-gray-600 mb-4">
              <strong>注意:</strong>
              <br />1、props 外部数据是只读的
            </p>

            <h4 className="text-lg font-bold text-gray-800 mt-4 mb-2">2、子组件向父组件传递数据，也是借助 props</h4>
            <p className="text-gray-600 mb-4">
              1) 在父组件定义一个方法，方法设置一个或多个形参
              <br />2) 将该方法改变 this 指向，让 this 指向当前组件的实例对象
              <br />3) 将该方法通过标签属性的方式传递给子组件
              <br />4) 在子组件中通过 props 接收
              <br />• 类组件: this.props.方法名
              <br />• 函数组件: props.方法名
              <br />5) 在子组件中调用该方法，并将要传递的数据以实参的方式传递
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`// 父组件:
/* 将decCount指向改为当前实例对象后传递给子组件 */
<ClassCom count={count} msg={msg} school="DPU" decCount={this.decCount.bind(this)} />

// 函数组件：解构

import React from 'react'
// 接收 React

export default function FunCom({ count, msg, school, decCount }) {
  console.log('FunCom run');
  
  return (
    <div>
      <h3>FunCom</h3>
      <p>props count :{count}</p>
      <p>props msg :{msg}</p>
      <p>props school :{school}</p>
      <p><button onClick={() => {
        // 调用方法并传参
        decCount(2)
      }}>子传父</button></p>
    </div>
  )
}`}
              </pre>
            </div>



            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Props.children 属性</h2>
            <p className="text-gray-600 mb-4">
              Props.children 是 React 中的一个特殊属性，它允许你在组件标签之间传递子元素。
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`// 父组件
import React, { Component } from 'react'
import Button from './components/Button'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 当需要使用子元素的时候只能使用对标签 */}
        <Button>保存</Button>
        <Button>取消</Button>
        <Button>提交</Button>
      </div>
    )
  }
}`}
              </pre>
            </div>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`// 子组件 (Button.jsx)
import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    console.log(this.props);
    let { children } = this.props
    return (
      <button>{children}</button>
    )
  }
}`}
              </pre>
            </div>
            <p className="text-gray-600 mb-4">
              通过 Props.children，父组件可以向子组件传递任意的 JSX 内容，子组件可以通过 this.props.children 来访问这些内容。
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">React 生命周期</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">componentDidMount</h3>
            <p className="text-gray-600 mb-4">
              componentDidMount 组件完成挂载之后执行，jsx 已经渲染成真实 dom 出现在页面中
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`/*
* componentDidMount 组件完成挂载之后执行，jsx已经渲染成真实dom出现在页面中
* 作用：
* 1、开启定时器
* 2、发送ajax请求 axios
* 3、订阅消息
* 4、添加自定义事件
* 
* 注意：constructor和componentDidMount只执行一次
*/

// 执行顺序与位置顺序之间没有影响`}
              </pre>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">componentDidUpdate</h3>
            <p className="text-gray-600 mb-4">
              componentDidUpdate 在组件更新后执行
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`/*
componentDidUpdate
作用:
1、发送ajax请求
2、修改本地存储: localStorage、sessionStorage
*/`}
              </pre>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">componentWillUnmount</h3>
            <p className="text-gray-600 mb-4">
              componentWillUnmount 在组件即将被卸载的时候执行
            </p>
            <div className="bg-black text-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <pre className="text-sm">
                {`/*
componentWillUnmount
在组件即将被卸载的时候执行
作用: (与挂载的时候进行相反操作)
1、关闭定时器
2、取消订阅
3、解绑自定义事件
*/`}
              </pre>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">useEffect 和 React 生命周期的相似之处</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b bg-gray-100">类组件生命周期</th>
                    <th className="py-2 px-4 border-b bg-gray-100">useEffect 写法（函数组件）</th>
                    <th className="py-2 px-4 border-b bg-gray-100">作用说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">componentDidMount</td>
                    <td className="py-2 px-4 border-b">useEffect(() =&gt; &lcub; ... &rcub;, [])</td>
                    <td className="py-2 px-4 border-b">组件挂载（首次渲染）后执行</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">componentDidUpdate</td>
                    <td className="py-2 px-4 border-b">useEffect(() =&gt; &lcub; ... &rcub;, [依赖项])</td>
                    <td className="py-2 px-4 border-b">依赖项变化（组件更新）</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">componentWillUnmount</td>
                    <td className="py-2 px-4 border-b">useEffect(() =&gt; &lcub; return () =&gt; &lcub; ... &rcub; &rcub;, [])</td>
                    <td className="py-2 px-4 border-b">组件卸载前执行清理操作</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">无对应生命周期</td>
                    <td className="py-2 px-4 border-b">useEffect(() =&gt; &lcub; ... &rcub;) （无依赖项）</td>
                    <td className="py-2 px-4 border-b">每次渲染后都执行</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-sm py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 个人技术博客分享</p>
        </div>
      </footer>
    </div>
  );
};

const VuePage = () => {
  const { isDarkMode } = useTheme();

  // 页面挂载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 代码示例
  const templateCode = `
  <template class="home">
    <div src="http://www.atguigu.com/images/index/new/logo.png" alt=""></div>
  </template>

  <script setup lang="ts" name="Home">
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router' // useRouter 路由器

    const router = useRouter()

    onMounted(() => {
      setTimeout(() => {
        router.push('/news') // 可返回式跳转
        // router.replace('/news') // 不可返回式跳转
      }, 3000)
    })
  </script>
  `;

  const functionCode = `
  function showNewsDetail(news: NewsInter){
    router.push({
      name: 'xiang',
      query: {
        id: news.id,
        title: news.title,
        content: news.content
      }
    })
  }
  `;

  const historyModeCode = `
  import { createRouter, createWebHistory } from 'vue-router'

  const router = createRouter({
    history: createWebHistory(), // history 模式
    routes: [...]
  })
  `;

  const hashModeCode = `
  import { createRouter, createWebHashHistory } from 'vue-router'

  const router = createRouter({
    history: createWebHashHistory(), // hash 模式
    routes: [...]
  })
  `;

  const queryParamCode = `
  <li v-for="news in newsList" :key="news.id">
    <RouterLink :to="'/news/detail?id=' + news.id + '&title=' + news.title">{{ news.title }}</RouterLink>
  </li>
  `;

  const receiveQueryCode = `
  <template>
    <ul class="news-list">
      <li>编号：{{ route.query.id }}</li>
      <li>标题：{{ route.query.title }}</li>
      <li>内容：{{ route.query.content }}</li>
    </ul>
  </template>

  <script setup lang="ts" name="About">
    import { useRoute } from 'vue-router'
    let route = useRoute()
    // console.log('@', route)
  </script>
  `;

  const redirectCode = `
  const router = createRouter({
    history: createWebHistory(),
    routes: [{
      path: '/',
      redirect: '/home' // 路由重定向
    }, {
      name: 'zhuye',
      path: '/home',
      component: Home
    }, {
      name: 'xinwen',
      path: '/news',
      component: News
    }]
  })
  `;

  return (
    <div className={`min-h-screen bg-contain bg-top bg-no-repeat font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-[#DEE2E1] text-gray-800'}`} style={{ backgroundImage: isDarkMode ? "url('/src/assets/images/bg2.jpg')" : "url('/src/assets/images/bg1.jpg')" }}>
      {/* 导航栏 */}
      <Navbar />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className={`rounded-2xl shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Vue 3 实战指南</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Vue</span>
            <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>前端</span>
            <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>Composition API</span>
            <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>2026-04-10</span>
          </div>
          <div className="prose max-w-none">
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Vue 3 是 Vue.js 的最新主要版本，它带来了许多新特性和改进，包括 Composition API、Teleport 和 Suspense 等。
            </p>
            <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Composition API</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Composition API 是 Vue 3 中引入的新 API，它允许你基于功能而不是选项来组织组件逻辑。
            </p>
            <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Teleport</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Teleport 允许你将组件的内容渲染到 DOM 中的任何位置，而不受组件层次结构的限制。
            </p>
            <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Suspense</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Suspense 允许你在组件加载完成之前显示一个占位符，改善用户体验。
            </p>

            <h2 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Vue 3 生命周期</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              生命周期分为四个阶段，每个阶段都有两个钩子，一前一后：
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. 创建阶段</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>创建前：<code className="bg-gray-200 px-2 py-1 rounded">beforeCreate</code></li>
              <li>创建完毕：<code className="bg-gray-200 px-2 py-1 rounded">created</code></li>
              <li>Vue 3 中：<code className="bg-gray-200 px-2 py-1 rounded">setup</code>（替代了 beforeCreate 和 created）</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. 挂载阶段</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>挂载前：<code className="bg-gray-200 px-2 py-1 rounded">onBeforeMount</code></li>
              <li>挂载完毕：<code className="bg-gray-200 px-2 py-1 rounded">onMounted</code></li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. 更新阶段</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>更新前：<code className="bg-gray-200 px-2 py-1 rounded">onBeforeUpdate</code></li>
              <li>更新完毕：<code className="bg-gray-200 px-2 py-1 rounded">onUpdated</code></li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. 卸载阶段</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Vue 2 中：<code className="bg-gray-200 px-2 py-1 rounded">beforeDestroy</code>、<code className="bg-gray-200 px-2 py-1 rounded">destroyed</code></li>
              <li>Vue 3 中（不叫销毁，叫卸载）：<code className="bg-gray-200 px-2 py-1 rounded">onBeforeUnmount</code>、<code className="bg-gray-200 px-2 py-1 rounded">onUnmounted</code></li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">父子组件的生命周期顺序</h3>
            <p className="text-gray-600 mb-4">
              当组件树包含父子组件时，生命周期钩子的执行顺序如下：
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4">
              <li>父组件：<code className="bg-gray-200 px-2 py-1 rounded">setup</code></li>
              <li>父组件：<code className="bg-gray-200 px-2 py-1 rounded">onBeforeMount</code></li>
              <li>子组件：<code className="bg-gray-200 px-2 py-1 rounded">setup</code></li>
              <li>子组件：<code className="bg-gray-200 px-2 py-1 rounded">onBeforeMount</code></li>
              <li>子组件：<code className="bg-gray-200 px-2 py-1 rounded">onMounted</code></li>
              <li>父组件：<code className="bg-gray-200 px-2 py-1 rounded">onMounted</code>（父组件永远是最后一个挂载的）</li>
            </ol>
            <p className="text-gray-600 mb-4">
              注意：在 Vue 3 中，App.vue 组件作为根组件，永远是最后一个挂载完成的组件。
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Vue Router 路由</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. 命名路由</h3>
            <p className="text-gray-600 mb-4">
              对象写法有两种跳转：名字跳转和 path 跳转
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              routes: [ // 一个一个的路由规则
              <br />&nbsp;&nbsp;{'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;name: 'zhuye',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;path: '/home',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;component: Home
              <br />&nbsp;&nbsp;{'}'},
              <br />&nbsp;&nbsp;{'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;name: 'xinwen',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;path: '/news',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;component: News
              <br />&nbsp;&nbsp;{'}'},
              <br />&nbsp;&nbsp;{'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;name: 'guanyu',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;path: '/about',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;component: About
              <br />&nbsp;&nbsp;{'}'}
              <br />]
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. params 参数</h3>
            <p className="text-gray-600 mb-4">
              必须要占位
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              {'{'}
              <br />&nbsp;&nbsp;name: 'xinwen',
              <br />&nbsp;&nbsp;path: '/news',
              <br />&nbsp;&nbsp;component: News,
              <br />&nbsp;&nbsp;children: [
              <br />&nbsp;&nbsp;&nbsp;&nbsp;{'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'xiang',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: 'detail/:id/:title/:content',
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;component: Detail
              <br />&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
              <br />&nbsp;&nbsp;]
              <br />{'}'}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. replace 属性</h3>
            <p className="text-gray-600 mb-4">
              push 类似堆栈可以查询记录，replace 是直接进行替代没有记录（不能前进后退）
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              &lt;div class="app"&gt;
              <br />&nbsp;&nbsp;&lt;Header/&gt;
              <br />&nbsp;&nbsp;&lt;!-- 导航区 --&gt;
              <br />&nbsp;&nbsp;&lt;div class="navigate"&gt;
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;RouterLink replace to="/home" active-class="active"&gt;首页&lt;/RouterLink&gt;
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;RouterLink replace :to="{'{'}name: 'xinwen'{'}'}" active-class="active"&gt;新闻&lt;/RouterLink&gt;
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;RouterLink replace :to="{'{'}path: '/about'{'}'}" active-class="active"&gt;关于&lt;/RouterLink&gt;
              <br />&nbsp;&nbsp;&lt;/div&gt;
              <br />&nbsp;&nbsp;&lt;!-- 展示区 --&gt;
              <br />&nbsp;&nbsp;&lt;div class="main-content"&gt;
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;RouterView/&gt;
              <br />&nbsp;&nbsp;&lt;/div&gt;
              <br />&lt;/div&gt;
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. 编程时导航</h3>
            <p className="text-gray-600 mb-4">
              脱离 RouterLink 实现路由跳转，应用场景：只有输入正确用户名和密码才能跳转个人中心
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {templateCode}
            </div>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {functionCode}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. 两个注意点</h3>
            <ol className="list-decimal pl-6 text-gray-600 mb-4">
              <li>路由组件通常放在 pages 或 views 文件夹，一般组件通常存放在 components 文件夹。</li>
              <li>通过点击导航，视觉效果上"消失"了的路由组件，默认是被"卸载"掉的，需要的时候再去挂载。</li>
            </ol>
            <p className="text-gray-600 mb-4">
              <strong>路由组件</strong>：靠路由的规则渲染出来的
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              routes: [
              <br />&nbsp;&nbsp;{'{'}path: '/demo', component: Demo{'}'}
              <br />]
            </div>
            <p className="text-gray-600 mb-4">
              <strong>一般组件</strong>：亲手写标签出来的
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">6. to 的两种写法</h3>
            <p className="text-gray-600 mb-4">
              RouterLink 的 to 属性有两种写法：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              {/* 第一种：to 的字符串写法 */}<br />
              &lt;RouterLink active-class="active" to="/home"&gt;首页&lt;/RouterLink&gt;<br />
              <br />
              {/* 第二种：to 的对象写法 */}<br />
              &lt;RouterLink active-class="active" :to="{'{'}path: '/home'{'}'}"&gt;首页&lt;/RouterLink&gt;
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">7. 路由器的工作模式</h3>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">history 模式</h4>
            <p className="text-gray-600 mb-4">
              <strong>优点</strong>：URL 更加美观，不带有 #，更接近传统的网站 URL。<br />
              <strong>缺点</strong>：后期项目上线，需要服务器配合处理路径问题，否则刷新会有 404 错误。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {historyModeCode}
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">hash 模式（常用于后台）</h4>
            <p className="text-gray-600 mb-4">
              <strong>优点</strong>：兼容性更好，因为不需要服务器端处理路径。<br />
              <strong>缺点</strong>：URL 带有 # 不太美观，现在 SEO 优化方面相对较差。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {hashModeCode}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">8. 路由传参 query 参数</h3>
            <p className="text-gray-600 mb-4">
              第一种写法：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {queryParamCode}
            </div>
            <p className="text-gray-600 mb-4">
              接收参数：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {receiveQueryCode}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">9. 路由重定向</h3>
            <p className="text-gray-600 mb-4">
              让指定的路径重新定位到另一个路径：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {redirectCode}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Vue 组件通信方式</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Props</h3>
            <p className="text-gray-600 mb-4">
              Props 是使用频率最高的一种通信方式，常用于：父 &rarr; 子<br />
              <strong>若父传子</strong>：属性值是非函数<br />
              <strong>若子传父</strong>：属性值是函数
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. 自定义事件</h3>
            <p className="text-gray-600 mb-4">
              用于子传父，传参的时候事件对象不丢失
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. mitt</h3>
            <p className="text-gray-600 mb-4">
              用于任意组件间通信，包括：<br />
              1. pubsub<br />
              2. $bus<br />
              3. mitt<br />
              <br />
              <strong>接收数据</strong>：提前绑定好事件（提前订阅消息）<br />
              <strong>提供数据</strong>：在合适的时候触发事件（发布消息）
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. v-model</h3>
            <p className="text-gray-600 mb-4">
              能父传子也能子传父，实现双向绑定
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. $attrs</h3>
            <p className="text-gray-600 mb-4">
              $attrs 用于实现当前组件的父组件，向当前组件的子组件通信（祖 &rarr; 孙）<br />
              具体说明：$attrs 是一个对象，包含所有父组件传入的标签属性<br />
              注意：$attrs 会自动排除 props 中声明的属性（可以认为声明过的 props 被子组件自己“消费”了）
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">6. provide-inject</h3>
            <p className="text-gray-600 mb-4">
              专用于祖孙之间通信，类比于 $attrs 而言，不涉及“中间人”
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">组件关系与传递方式</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">组件关系</th>
                    <th className="py-3 px-4 border-b text-left">传递方式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="py-3 px-4 border-b">父传子</td>
                    <td className="py-3 px-4 border-b">
                      1. props<br />
                      2. v-model<br />
                      3. $refs<br />
                      4. 默认插槽、具名插槽
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="py-3 px-4 border-b">子传父</td>
                    <td className="py-3 px-4 border-b">
                      1. props<br />
                      2. 自定义事件<br />
                      3. v-model<br />
                      4. $parent<br />
                      5. 作用域插槽
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="py-3 px-4 border-b">祖传孙、孙传祖</td>
                    <td className="py-3 px-4 border-b">
                      1. $attrs<br />
                      2. provide、inject
                    </td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="py-3 px-4 border-b">兄弟间、任意组件间</td>
                    <td className="py-3 px-4 border-b">
                      1. mitt<br />
                      2. pinia
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Vue 插槽（Slot）</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. 默认插槽</h3>
            <p className="text-gray-600 mb-4">
              默认插槽是最基本的插槽类型，当子组件中没有指定具体插槽名称时，父组件传入的内容会默认插入到默认插槽中。
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. 具名插槽</h3>
            <p className="text-gray-600 mb-4">
              具名插槽允许在子组件中定义多个插槽，并为每个插槽指定一个唯一的名称，父组件可以根据名称将内容插入到对应的插槽中。
            </p>
            <p className="text-gray-600 mb-4">
              <strong>具名插槽缺点</strong>：里面无论有多少结构，只能放在对应的插槽位置（按顺序）。可以通过添加 template 并指定 slot 属性来指定位置。
            </p>
            <p className="text-gray-600 mb-4">
              <strong>注意</strong>：默认插槽也有默认的名字 default。
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. 作用域插槽</h3>
            <p className="text-gray-600 mb-4">
              作用域插槽的特点是：数据在子组件那边，但根据数据生成的结构，却由父组件决定。
            </p>
            <p className="text-gray-600 mb-4">
              子组件可以通过插槽向父组件传递数据，父组件可以使用这些数据来渲染自定义的结构。
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Vue 3 其他 API</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. shallowRef 和 shallowReactive</h3>
            <p className="text-gray-600 mb-4">
              <strong>作用</strong>：创建一个响应式数据，但只对顶层属性进行响应式处理
            </p>
            <p className="text-gray-600 mb-4">
              <strong>特点</strong>：只跟踪引用值的变化，不关心值内部的属性变化
            </p>
            <p className="text-gray-600 mb-4">
              <strong>总结</strong>：通过使用 shallowRef() 和 shallowReactive() 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理，避免了对每一个内部属性做响应式所带来的性能成本，使得属性的访问变得更快，可提升性能。
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. readonly 和 shallowReadonly</h3>
            <p className="text-gray-600 mb-4">
              <strong>作用</strong>：用于创建一个对象的深只读副本
            </p>
            <p className="text-gray-600 mb-4">
              <strong>特点</strong>：对象的所有嵌套属性都将变为只读
            </p>
            <p className="text-gray-600 mb-4">
              在任何尝试修改这个对象的操作都会被阻止（在开发模式下，还会在控制台中发出警告）
            </p>
            <p className="text-gray-600 mb-4">
              <strong>场景</strong>：把平湖全局状态或配置不被修改，创建不可变的状态快照
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. toRaw 与 markRaw</h3>
            <p className="text-gray-600 mb-4">
              <strong>toRaw 作用</strong>：用于获取一个响应式对象的原始对象，toRaw 返回的对象不再是响应式的，不会触发视图更新
            </p>
            <p className="text-gray-600 mb-4">
              <strong>markRaw 作用</strong>：标记一个对象，使其永远不会变成响应式的
            </p>
            <p className="text-gray-600 mb-4">
              <strong>使用场景</strong>：例如使用 mockjs 时，为了防止误把 mockjs 变为响应式对象，可以使用 markRaw 去标记 mockjs
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. customRef</h3>
            <p className="text-gray-600 mb-4">
              <strong>作用</strong>：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行逻辑控制
            </p>
            <p className="text-gray-600 mb-4">
              <strong>实现防抖效果</strong>：可以通过 customRef 实现数据的防抖处理
            </p>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-sm py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 个人技术博客分享</p>
        </div>
      </footer>
    </div>
  );
};

const NodePage = () => {
  // 页面挂载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-contain bg-top bg-no-repeat bg-[#DEE2E1] font-sans" style={{ backgroundImage: "url('/src/assets/images/bg1.jpg')" }}>
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-primary-700">李梅琳个人技术博客分享</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">首页</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">技术栈</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">文章</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">关于</Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Node.js 基础与接口开发</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Node.js</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">接口开发</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Express</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">2024-12-05</span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，它允许你在服务器端运行 JavaScript 代码，为前端开发者提供了全栈开发的能力。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">fs 文件系统</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">概念:</h3>
              <p className="text-gray-600 mb-4">
                fs 模块，是 Node.js 官方提供的，用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的需求
              </p>
              <p className="text-gray-600 mb-4">
                例如:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>fs.readFile() 方法，用来读取指定文件中的内容</li>
                <li>fs.writeFile() 方法，用来向指定文件中写入内容</li>
              </ul>
              <p className="text-gray-600 mb-4">
                要在 JavaScript 中使用 fs 模块来操作文件，则需要使用如下的方式先导入
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm">
                const fs = require('fs');
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">读取指定文件中的内容</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">1. fs.readFile() 的语法格式</h4>
              <p className="text-gray-600 mb-4">
                使用 fs.readFile() 方法，可以读取指定文件中的内容，语法格式如下:
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                fs.readFile(path[, options], callback)
              </div>
              <p className="text-gray-600 mb-2">参数:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>参数 1: 必选参数，字符串，表示文件路径</li>
                <li>参数 2: 可选参数，表示以什么编码格式来读取文件，一般默认为 utf8</li>
                <li>参数 3: 必选参数，文件读取完成后，通过回调函数拿到读取的结果</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">fs 处理路径问题</h3>
            <p className="text-gray-600 mb-4">
              在使用 fs 模块时，路径处理是一个常见的问题。Node.js 提供了 path 模块来帮助处理路径，包括路径拼接、获取文件名、扩展名等操作。使用 path.resolve() 可以获取绝对路径，避免相对路径带来的问题。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">npm 与包</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">包的概念:</h3>
              <p className="text-gray-600 mb-4">
                Node.js 中的第三方模块又叫做包
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3">包的来源:</h3>
              <p className="text-gray-600 mb-4">
                不同于 Node.js 中内置模块与自定义模块，包是由第三方个人或团队开发出来的，免费供所有人使用
              </p>
              <p className="text-gray-600 mb-4">
                <strong>注:</strong> Node.js 中的包都是免费且开源的，可免费下载使用
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3">包的优势:</h3>
              <p className="text-gray-600 mb-4">
                包是基于内置模块封装出来的，提供了更高级更方便的 API，极大提高了开发效率
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3">搜索包:</h3>
              <p className="text-gray-600 mb-4">
                <a href="https://www.npmjs.com/" className="text-blue-600 hover:underline">https://www.npmjs.com/</a>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-3">下载包:</h3>
              <p className="text-gray-600 mb-4">
                <a href="https://registry.npmjs.org/" className="text-blue-600 hover:underline">https://registry.npmjs.org/</a>
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">使用包的示例 - 格式化时间</h3>
              <p className="text-gray-600 mb-4">
                1. 使用 npm 包管理工具，在项目中安装格式化时间的包 moment
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                npm i moment
              </div>
              <p className="text-gray-600 mb-4">
                2. 使用 require() 导入格式化时间包
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                const moment = require('moment');
                <br />
                const now = moment().format('YYYY-MM-DD HH:mm:ss');
                <br />
                console.log(now); // 输出格式化后的时间
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">快速创建 package.json</h3>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                npm init -y
              </div>
              <p className="text-gray-600 mb-4">
                package.json 文件会记录项目的依赖包信息：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                {'{'}
                <br />&nbsp;&nbsp;"dependencies": {'{'}
                <br />&nbsp;&nbsp;&nbsp;&nbsp;"moment": "^2.29.1"
                <br />&nbsp;&nbsp;{'}'},
                <br />&nbsp;&nbsp;"name": "node",
                <br />&nbsp;&nbsp;"version": "1.0.0",
                <br />&nbsp;&nbsp;"main": "createServer.js",
                <br />&nbsp;&nbsp;"devDependencies": {'{'}{'}'},
                <br />&nbsp;&nbsp;"scripts": {'{'}
                <br />&nbsp;&nbsp;&nbsp;&nbsp;"test": "echo \"Error: no test specified\" && exit 1"
                <br />&nbsp;&nbsp;{'}'},
                <br />&nbsp;&nbsp;"keywords": [],
                <br />&nbsp;&nbsp;"author": "",
                <br />&nbsp;&nbsp;"license": "ISC",
                <br />&nbsp;&nbsp;"description": ""
                <br />{'}'}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">devDependencies 节点</h3>
              <p className="text-gray-600 mb-4">
                如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到 devDependencies 节点中
              </p>
              <p className="text-gray-600 mb-4">
                如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到 dependencies 节点中
              </p>
              <p className="text-gray-600 mb-4">
                安装开发依赖包：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                npm i 包名 -D
                <br />
                // 完整写法
                <br />
                npm install 包名 --save-dev
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">node_modules 目录和 package-lock.json 文件</h3>
              <p className="text-gray-600 mb-4">
                <strong>node_modules 目录:</strong> 用来存放所有已安装到项目中的包，require() 导入第三方包时，就是从这个目录中查找并加载包
              </p>
              <p className="text-gray-600 mb-4">
                <strong>package-lock.json 文件:</strong> 用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本、下载地址等
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">安装指定版本的包</h3>
              <p className="text-gray-600 mb-4">
                默认情况下，npm i 会自动安装最新版本的包，如果需要下载指定版本的包，可以在包名后通过 @ 符号指定具体的版本：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                npm i moment@2.24.0
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">一次性安装所有包</h3>
              <p className="text-gray-600 mb-4">
                当拿到一个删除 node_modules 的项目之后，需要先把所有的包下载到项目中，才能将项目运行起来：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                npm i
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">卸载包</h3>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                npm uninstall 包名
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">解决下包速度慢的问题</h3>
              <p className="text-gray-600 mb-4">
                可以通过修改 npm 的下包镜像源来提高下载速度，例如使用淘宝镜像源：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 查看当前下包镜像源
                <br />
                npm config get registry
                <br />
                // 将下包镜像源改成淘宝镜像源
                <br />
                npm config set registry=https://registry.npm.taobao.org/
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">包的分类</h3>
              <p className="text-gray-600 mb-4">
                1. <strong>项目包:</strong> 被安装到 node_modules 目录中的包，都是项目包
              </p>
              <p className="text-gray-600 mb-4">
                项目包分为两类:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>开发依赖包: 被记录到 devDependencies 节点中的包，只会在开发期间用到</li>
                <li>核心依赖包: 被记录到 dependencies 节点中的包</li>
              </ul>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">模块加载机制</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">优先从缓存中加载</h3>
              <p className="text-gray-600 mb-4">
                模块在第一次加载后会被缓存，这也意味着多次调用 require() 不会导致模块的代码被执行多次
              </p>
              <p className="text-gray-600 mb-4">
                不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">目录作为模块</h3>
              <p className="text-gray-600 mb-4">
                把目录作为模块标识符，传递给 require() 进行加载的时候，有三种加载方式：
              </p>
              <ol className="list-decimal pl-6 text-gray-600 mb-4">
                <li>在被加载的目录下查找一个叫 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口</li>
                <li>如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件</li>
                <li>如果以上两步都失败，则 node 会在终端打印错误消息，报告模块的缺失</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">内置模块的加载机制</h3>
              <p className="text-gray-600 mb-4">
                内置模块是由 node.js 提供的模块，内置模块的加载优先级最高
              </p>
              <p className="text-gray-600 mb-4">
                例如，require('fs') 始终返回内置的 fs 模块，即使在 node_modules 目录下有名字相同的包也叫做 fs
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">自定义模块的加载机制</h3>
              <p className="text-gray-600 mb-4">
                使用 require() 加载模块时，必须指定以 ./ 或 ../ 开头的路径标识符。在自定义模块时，如果没有指定路径标识符，则 node 会把它当作内置模块或第三方模块进行加载
              </p>
              <p className="text-gray-600 mb-4">
                同时，在使用 require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下文件：
              </p>
              <ol className="list-decimal pl-6 text-gray-600 mb-4">
                <li>按照确切的文件名进行加载</li>
                <li>补全 .js 扩展名进行加载</li>
                <li>补全 .json 扩展名进行加载</li>
                <li>补全 .node 扩展名进行加载</li>
                <li>加载失败，终端报错</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">第三方模块的加载机制</h3>
              <p className="text-gray-600 mb-4">
                如果传递给 require() 的模块标识符不是一个内置模块，也没有 ./ 或 ../ 开头，则 node.js 会从当前模块的父目录开始，尝试从 /node_modules 文件夹中加载第三方模块
              </p>
              <p className="text-gray-600 mb-4">
                如果没有找到对应的第三方模块，则移动到上一层父目录中，进行加载，直到文件系统的根目录
              </p>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Express 框架</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-600 mb-4">
                Express 基于 Node.js 平台，快速、开放、极简的 Web 开发框架
              </p>
              <p className="text-gray-600 mb-4">
                Express 的作用与 http 模块类似，是专门用来创建 Web 服务器的
              </p>
              <p className="text-gray-600 mb-4">
                Express 的本质就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Express 的基本使用</h3>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">1. 安装</h4>
              <p className="text-gray-600 mb-4">
                在项目所处的目录中，运行 <code className="bg-gray-200 px-2 py-1 rounded">npm i express@4.17.1</code> 即可将 express 安装到项目中使用
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">2. 创建基本的 Web 服务器</h4>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 1. 导入 express
                <br />
                const express = require('express')
                <br />
                // 2. 创建 Web 服务器
                <br />
                const app = express()
                <br />
                // 3. 启动 Web 服务器
                <br />
                app.listen(80, function() {'{'}
                <br />&nbsp;&nbsp;console.log('express server running at http://127.0.0.1')
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">3. 监听 GET 请求</h4>
              <p className="text-gray-600 mb-4">
                通过 app.get() 方法，可以监听客户端的 GET 请求，具体语法如下：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 参数 1: 客户端请求的 URL 地址
                <br />
                // 参数 2: 请求对应的处理函数
                <br />
                //     req: 请求对象 (包含了与请求相关的属性与方法)
                <br />
                //     res: 响应对象 (包含了与响应相关的属性与方法)
                <br />
                app.get('请求URL', function(req, res) { /*处理函数*/})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">4. 监听 POST 请求</h4>
              <p className="text-gray-600 mb-4">
                通过 app.post() 方法，可以监听客户端的 POST 请求，具体语法格式如下：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 参数 1: 客户端请求的 URL 地址
                <br />
                // 参数 2: 请求对应的处理函数
                <br />
                //     req: 请求对象 (包含了与请求相关的属性与方法)
                <br />
                //     res: 响应对象 (包含了与响应相关的属性与方法)
                <br />
                app.post('请求URL', function(req, res) { /*处理函数*/})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">5. 把内容响应给客户端</h4>
              <p className="text-gray-600 mb-4">
                通过 res.send() 方法，可以将处理好的内容，发送给客户端：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                app.get('/user', function(req, res) {'{'}
                <br />&nbsp;&nbsp;// 向客户端发送 JSON 对象
                <br />&nbsp;&nbsp;res.send({'{'} name: 'zs', age: 20, gender: '男' {'}'})
                <br />{'}'})
                <br />
                <br />
                app.post('/user', function(req, res) {'{'}
                <br />&nbsp;&nbsp;// 向客户端发送文本内容
                <br />&nbsp;&nbsp;res.send('请求成功')
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">6. 获取 URL 中携带的查询参数</h4>
              <p className="text-gray-600 mb-4">
                通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                app.get('/', function(req, res) {'{'}
                <br />&nbsp;&nbsp;// req.query 默认是一个空对象
                <br />&nbsp;&nbsp;// 客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数，
                <br />&nbsp;&nbsp;// 可以通过 req.query 对象访问到，例如：
                <br />&nbsp;&nbsp;// req.query.name  req.query.age
                <br />&nbsp;&nbsp;console.log(req.query)
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">7. 获取 URL 中的动态参数</h4>
              <p className="text-gray-600 mb-4">
                通过 req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // URL 地址中，可以通过 :参数名 的形式，匹配动态参数值
                <br />
                app.get('/user/:id', function(req, res) {'{'}
                <br />&nbsp;&nbsp;// req.params 默认是一个空对象
                <br />&nbsp;&nbsp;// 里面存放着通过 : 动态匹配到的参数值
                <br />&nbsp;&nbsp;console.log(req.params)
                <br />{'}'})
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">编写接口</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">1. 创建基本的服务器</h4>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 导入 express
                <br />
                const express = require('express')
                <br />
                // 创建服务器实例
                <br />
                const app = express()
                <br />
                // 启动服务器
                <br />
                app.listen(80, function() {'{'}
                <br />&nbsp;&nbsp;console.log('Express running at http://127.0.0.1')
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">2. 创建 API 路由模块</h4>
              <p className="text-gray-600 mb-4">
                为了更好地组织代码，可以创建单独的路由模块：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // apiRouter.js
                <br />
                const express = require('express')
                <br />
                const router = express.Router()
                <br />
                // 这里挂载对应的路由
                <br />
                module.exports = router
              </div>
              <p className="text-gray-600 mb-4">
                在主文件中导入并注册路由：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 导入 express
                <br />
                const express = require('express')
                <br />
                // 创建服务器实例
                <br />
                const app = express()
                <br />
                // 导入路由模块
                <br />
                const router = require('./apiRouter')
                <br />
                // 把路由模块，注册到 app 上
                <br />
                app.use('/api', router)
                <br />
                // 启动服务器
                <br />
                app.listen(80, function() {'{'}
                <br />&nbsp;&nbsp;console.log('Express running at http://127.0.0.1')
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">3. 编写 POST 接口</h4>
              <p className="text-gray-600 mb-4">
                <strong>注意：</strong>如果需要获取 URL-encoded 格式的请求体数据，必须配置中间件 <code className="bg-gray-200 px-2 py-1 rounded">app.use(express.urlencoded({'{'} extended: false {'}'}))</code>
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 在主文件中添加中间件
                <br />
                app.use(express.urlencoded({'{'} extended: false {'}'}))
                <br />
                <br />
                // 在 apiRouter.js 中编写 POST 接口
                <br />
                router.post('/post', function(req, res) {'{'}
                <br />&nbsp;&nbsp;// 1. 获取客户端通过请求体，发送到服务器的 URL-encoded 数据
                <br />&nbsp;&nbsp;const body = req.body
                <br />&nbsp;&nbsp;// 2. 调用 res.send() 方法，把数据响应给客户端
                <br />&nbsp;&nbsp;res.send({'{'}
                <br />&nbsp;&nbsp;&nbsp;&nbsp;status: 0,        // 状态，0 表示成功，1 表示失败
                <br />&nbsp;&nbsp;&nbsp;&nbsp;msg: 'POST请求成功!', // 状态描述消息
                <br />&nbsp;&nbsp;&nbsp;&nbsp;data: body        // 需要响应给客户端的具体数据
                <br />&nbsp;&nbsp;{'}'})
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">4. 编写 GET 接口</h4>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 在 apiRouter.js 中编写 GET 接口
                <br />
                router.get('/get', function(req, res) {'{'}
                <br />&nbsp;&nbsp;// 1. 获取到客户端通过查询字符串，发送到服务器的数据
                <br />&nbsp;&nbsp;const query = req.query
                <br />&nbsp;&nbsp;// 2. 调用 res.send() 方法，把数据响应给客户端
                <br />&nbsp;&nbsp;res.send({'{'}
                <br />&nbsp;&nbsp;&nbsp;&nbsp;status: 0,        // 状态，0 表示成功，1 表示失败
                <br />&nbsp;&nbsp;&nbsp;&nbsp;msg: 'GET请求成功!', // 状态描述
                <br />&nbsp;&nbsp;&nbsp;&nbsp;data: query        // 需要响应给客户端的具体数据
                <br />&nbsp;&nbsp;{'}'})
                <br />{'}'})
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">5. req 和 res 对象</h4>
              <p className="text-gray-600 mb-4">
                <strong>req (请求)：</strong>这就像是一封信，客户端（比如你的浏览器）通过这封信告诉服务器它想要什么信息。信里包含了很多细节，比如：
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>用的什么方法来请求（比如查看、提交等）</li>
                <li>想要的数据在哪个网址</li>
                <li>可能还附带了一些额外的信息或数据</li>
              </ul>
              <p className="text-gray-600 mb-4">
                <strong>res (响应)：</strong>这就像是服务器给客户端的回信，告诉客户端请求处理的结果。回信中可以包含：
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>一个状态码，告诉客户端请求是否成功</li>
                <li>一些信息，比如客户端请求的数据</li>
              </ul>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">CORS 跨域资源共享</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">1. 接口的跨域问题</h4>
              <p className="text-gray-600 mb-4">
                之前写的 GET 和 POST 接口，存在一个很严重的问题：<span className="text-green-600 font-medium">不支持跨域请求</span>
              </p>
              <p className="text-gray-600 mb-4">
                例如，当 jQuery 通过 Staticfile CDN 引入时，前端页面就无法直接访问后端接口。
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">2. 解决接口跨域问题的方案</h4>
              <p className="text-gray-600 mb-4">
                解决接口跨域问题的方案主要有两种：
              </p>
              <ol className="list-decimal pl-6 text-gray-600 mb-4">
                <li><strong>CORS (主流解决方案，推荐使用)</strong></li>
                <li><strong>JSONP (有缺陷的解决方案：只支持 GET 请求)</strong></li>
              </ol>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">3. 使用 cors 中间件解决跨域问题</h4>
              <p className="text-gray-600 mb-4">
                cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，跨域问题可以很方便地解决。
              </p>
              <p className="text-gray-600 mb-4">
                使用步骤：
              </p>
              <ol className="list-decimal pl-6 text-gray-600 mb-4">
                <li>运行 <code className="bg-gray-200 px-2 py-1 rounded">npm install cors</code> 安装中间件</li>
                <li>使用 <code className="bg-gray-200 px-2 py-1 rounded">const cors = require('cors')</code> 导入中间件</li>
                <li>在路由之前调用 <code className="bg-gray-200 px-2 py-1 rounded">app.use(cors())</code> 配置中间件</li>
              </ol>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">4. CORS 请求的分类</h4>
              <p className="text-gray-600 mb-4">
                客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类：
              </p>

              <h5 className="text-md font-semibold text-gray-800 mb-2">简单请求</h5>
              <p className="text-gray-600 mb-4">
                同时满足以下条件：
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>请求方式：GET、POST、HEAD 三者之一</li>
                <li>HTTP 头部信息不超过以下几种字段：Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（只有三个值 text/plain、multipart/form-data、application/x-www-form-urlencoded）</li>
              </ul>

              <h5 className="text-md font-semibold text-gray-800 mb-2">预检请求</h5>
              <p className="text-gray-600 mb-4">
                满足以下任何一个条件：
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>请求方式为 GET、POST、HEAD 之外的请求 Method 类型</li>
                <li>请求头中包含了自定义头部字段</li>
                <li>向服务器发送了 application/json 格式的数据</li>
              </ul>
              <p className="text-gray-600 mb-4">
                在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获取服务器是否允许该实际请求，所以这一次的 OPTION 请求被称为 "预检请求"。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。
              </p>

              <h5 className="text-md font-semibold text-gray-800 mb-2">二者区别</h5>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>简单请求的特点：客户端与服务器只会发生一次请求</li>
                <li>预检请求的特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">5. CORS 概念</h4>
              <p className="text-gray-600 mb-4">
                CORS (Cross-Origin Resource Sharing，跨域资源共享) 由一系列 HTTP 响应头组成，这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源。
              </p>
              <p className="text-gray-600 mb-4">
                浏览器的同源安全策略默认会阻止网页 "跨域" 获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解决浏览器的跨域访问权限。
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">6. CORS 相关的三个响应头</h4>

              <h5 className="text-md font-semibold text-gray-800 mb-2">Access-Control-Allow-Origin</h5>
              <p className="text-gray-600 mb-4">
                响应头部中跨域携带一个 Access-Control-Allow-Origin 字段，其语法如下：
              </p>
              <div className="bg-gray-200 p-3 rounded-md font-mono text-sm mb-4">
                Access-Control-Allow-Origin: &lt;origin&gt; | *
              </div>
              <p className="text-gray-600 mb-4">
                其中，origin 参数的值指定了允许访问该资源的外域 URL。
              </p>
              <p className="text-gray-600 mb-4">
                例如，下面的字面值将只允许来自 http://itcat.cn 的请求：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                res.setHeader('Access-Control-Allow-Origin', 'http://itcat.cn')
              </div>
              <p className="text-gray-600 mb-4">
                如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *，表示允许来自任何域的请求，示例代码如下：
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                res.setHeader('Access-Control-Allow-Origin', '*')
              </div>

              <h5 className="text-md font-semibold text-gray-800 mb-2">Access-Control-Allow-Headers</h5>
              <p className="text-gray-600 mb-4">
                默认情况下，CORS 支持客户端向服务器发送如下 9 个请求头：
              </p>
              <p className="text-gray-600 mb-4">
                Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（仅局限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
              </p>
              <p className="text-gray-600 mb-4">
                如果向客户端发送额外的请求头，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败。
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
                <br />
                // 注意：多个请求头之间使用英文的逗号进行分割
                <br />
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
              </div>

              <h5 className="text-md font-semibold text-gray-800 mb-2">Access-Control-Allow-Methods</h5>
              <p className="text-gray-600 mb-4">
                默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
              </p>
              <p className="text-gray-600 mb-4">
                如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Allow-Methods 来指明实际请求所允许使用的 HTTP 方法。
              </p>
              <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
                // 只允许 POST、GET、DELETE、HEAD 请求方法
                <br />
                res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
                <br />
                // 允许所有的 HTTP 请求方法
                <br />
                res.setHeader('Access-Control-Allow-Methods', '*')
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">7. CORS 的注意事项</h4>
              <ol className="list-decimal pl-6 text-gray-600 mb-4">
                <li>CORS 主要配置在服务器端进行配置，客户端浏览器无需做任何额外的配置，即可请求开启了 CORS 的接口</li>
                <li>CORS 在浏览器中有兼容性，只支持 XMLHttpRequest Level2 的浏览器，才能成功访问开启了 CORS 的服务器接口（例如：IE10+，Chrome4+，FireFox3.5+）</li>
              </ol>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">nvm (Node Version Manager)</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">nvm 的概念</h3>
              <p className="text-gray-600 mb-4">
                nvm 是一个 node.js 的版本管理工具，为了解决 node.js 各种版本存在不兼容现象，可以通过它安装和切换不同版本的 node.js【可同时在一个环境中安装多个 node.js 版本】
              </p>
              <p className="text-gray-600 mb-4">
                由于来回切换 node 比较麻烦，所以需要使用 node 工程多版本管理。
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">安装前准备</h3>
              <p className="text-gray-600 mb-4">
                1. 在安装 nvm 前需要先卸载 node
              </p>
              <p className="text-gray-600 mb-4">
                删除前可查看当前使用的 node 版本，方便后续决定使用哪个版本的 node。
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">nvm 常用命令</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li><code className="bg-gray-200 px-2 py-1 rounded">nvm install 16.20.0</code> - 安装指定版本的 Node.js</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">nvm ls</code> - 查看当前系统中有的 node 版本（* 标代表这个版本是现在正在使用的版本）</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">nvm use [node.js版本号]</code> - 切换到指定版本的 Node.js</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">nvm current</code> - 直接查看当前使用的 Node.js 版本</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">nvm list available</code> - 查看有哪些 node 版本</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">nvm alias default XXX</code> - 设置默认启动的 node 版本</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">手动安装 Node.js 版本</h3>
              <p className="text-gray-600 mb-4">
                当用 nvm 安装某个版本的 node 时如果不能直接用命令安装，可以直接安装以后解压到对应的文件夹中，可以避免 node 之间的冲突。
              </p>
              <p className="text-gray-600 mb-4">
                1. 从 Node.js 官网下载对应版本的 zip 包
                2. 直接安装到 nvm 的文件夹中，把名字修改统一
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">当输入 npm i 报错解决</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li><code className="bg-gray-200 px-2 py-1 rounded">npm i --force</code> - 无视各种冲突和缓存</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">npm install --legacy-peer-deps</code> - 忽略 peer 依赖冲突</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-sm py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 个人技术博客分享</p>
        </div>
      </footer>
    </div>
  );
};

const TypeScriptPage = () => {
  // 页面挂载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-contain bg-top bg-no-repeat bg-[#DEE2E1] font-sans" style={{ backgroundImage: "url('/src/assets/images/bg1.jpg')" }}>
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-primary-700">李梅琳个人技术博客分享</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">首页</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">技术栈</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">文章</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">关于</Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">TypeScript 类型系统</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">TypeScript</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">类型系统</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">最佳实践</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">2026-04-01</span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              TypeScript 是 JavaScript 的超集，它添加了静态类型系统，帮助开发者在编译时发现错误，提高代码质量和可维护性。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">基本类型</h2>
            <p className="text-gray-600 mb-4">
              TypeScript 提供了多种基本类型，如 number、string、boolean、null、undefined、symbol 等。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">高级类型</h2>
            <p className="text-gray-600 mb-4">
              TypeScript 支持高级类型，如联合类型、交叉类型、泛型、类型守卫等。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型</h2>
            <p className="text-gray-600 mb-4">
              泛型允许你编写可重用的组件，这些组件可以与多种类型一起工作。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">装饰器</h2>
            <p className="text-gray-600 mb-4">
              装饰器是一种特殊类型的声明，它可以附加到类声明、方法、访问器、属性或参数上。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">接口的继承特性</h2>
            <p className="text-gray-600 mb-4">
              TypeScript 中的接口可以从其他接口继承，这样可以减少代码重复，提高代码的可维护性。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              interface IPerson{'{'}
              <br />&nbsp;&nbsp;name: string
              <br />&nbsp;&nbsp;age: number
              <br />{'}'}
              <br />
              <br />// 可以从其他的接口中继承过来的特性
              <br />// 1、减少了相同代码的重复编写
              <br />// 2、如果使用第三方库，给我们定义了一些属性
              <br />// 自定义一个接口，同时希望接口拥有第三方某一个类型的所有的属性
              <br />// 可以使用接口继承来实现
              <br />interface IKun extends IPerson{'{'}
              <br />&nbsp;&nbsp;slogan: string
              <br />{'}'}
              <br />
              <br />const ikun: IKun = {'{'}
              <br />&nbsp;&nbsp;name: "why"
              <br />&nbsp;&nbsp;age: 18
              <br />&nbsp;&nbsp;slogan: "干嘛"
              <br />{'}'}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">严格字面量赋值检测</h2>
            <p className="text-gray-600 mb-4">
              对于对象的字面量赋值，在 TypeScript 中有个特殊的现象，称为严格字面量赋值检测。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              // 解释现象：
              <br />// • 第一次创建的对象字面量，称之为fresh
              <br />// • 对于新鲜的字面量分配给一个变量或传递一个非空类型的参数时，会进行严格的类型检测，必须完全满足类型的要求（不能有多余的属性）
              <br />// • 当类型断言或对象字面量的类型扩大时，新鲜度会消失
              <br />
              <br />interface IPerson{'{'}
              <br />&nbsp;&nbsp;name: string
              <br />&nbsp;&nbsp;age: number
              <br />{'}'}
              <br />
              <br />const info: IPerson = {'{'}
              <br />&nbsp;&nbsp;name: "lily",
              <br />&nbsp;&nbsp;age: 18,
              <br />
              <br />&nbsp;&nbsp;// 多一个height属性，报错，IPerson不含多余属性
              <br />&nbsp;&nbsp;// height: 1.8
              <br />{'}'}
              <br />
              <br />// 不报错奇怪现象一：
              <br />const obj = {'{'}
              <br />&nbsp;&nbsp;name: "lily",
              <br />&nbsp;&nbsp;age: 18,
              <br />
              <br />&nbsp;&nbsp;height: 1.8
              <br />{'}'}
              <br />const info: IPerson = obj
              <br />
              <br />// 奇怪现象二：
              <br />function printPerson(person: IPerson){'{'}
              <br />{'}'}
              <br />
              <br />const kobe = {'{'}name: "kobe", age: 30, height: 1.9{'}'}
              <br />printPerson(kobe)
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">索引签名基本使用</h2>
            <p className="text-gray-600 mb-4">
              索引签名允许我们通过字符串或数字索引来访问对象的属性。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              interface IPerson{'{'}
              <br />&nbsp;&nbsp;name: string,
              <br />&nbsp;&nbsp;age: number,
              <br />&nbsp;&nbsp;height: number
              <br />{'}'}
              <br />
              <br />const p: IPerson = {'{'}
              <br />&nbsp;&nbsp;name: "why",
              <br />&nbsp;&nbsp;age: 18,
              <br />&nbsp;&nbsp;height: 1.8
              <br />{'}'}
              <br />
              <br />interface InfoType{'{'}
              <br />&nbsp;&nbsp;// 索引签名：可以通过字符串索引，去获取到一个值，
              <br />&nbsp;&nbsp;[key: string]: string
              <br />{'}'}
              <br />
              <br />function getArray(): InfoType{'{'}
              <br />&nbsp;&nbsp;const abc: any = "haha"
              <br />&nbsp;&nbsp;return abc
              <br />{'}'}
              <br />
              <br />const info = getInfo()
              <br />console.log(info.name, info.age, info.address)
              <br />
              <br />// 索引签名的案例
              <br />interface ICollection{'{'}
              <br />&nbsp;&nbsp;[index: number]: string
              <br />&nbsp;&nbsp;length: number
              <br />{'}'}
              <br />
              <br />function printCollection(collection: ICollection){'{'}
              <br />{'}'}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">TS对象索引类型签名</h2>
            <p className="text-gray-600 mb-4">
              TypeScript 中对象索引类型签名有一些特殊的规则和限制，特别是当同时使用数字索引和字符串索引时。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              interface IIndexType {'{'}
              <br />&nbsp;&nbsp;// 两个索引类型写法
              <br />&nbsp;&nbsp;[index: number]: string
              <br />&nbsp;&nbsp;[key: string]: any
              <br />&nbsp;&nbsp;// 斜面写法是不允许的：数字类型索引的类型，必须是字符串类型索引的类型的子类型
              <br />&nbsp;&nbsp;// 原因：所有的数字裂隙都是会转成字符串类型去对象中获取内容
              <br />&nbsp;&nbsp;//[index: number]: bumber|string，当我们是一个数字的时候，纪要满足是通过number去拿到的内容，不会和sting难道的结果矛盾，不能拿到一个宽泛的类型以后又去拿到一个具体的类型
              <br />&nbsp;&nbsp;//[key: string]: string
              <br />{'}'}
              <br />
              <br />const names: IIndexType = ["abc", "bcd", "csf"]
              <br />const item1 = names[0]
              <br />const forEachFn = namas["forEach"]
            </div>
            <p className="text-gray-600 mb-4">
              <strong>结论:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>要求一：数字类型必须是比字符串类型更加确定的类型（需要是字符串类型的子类型）</li>
              <li>要求二：如果索引签名中有定义其他属性，其他属性返回的类型，必须符合string类型返的属性</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">抽象类和接口的区别</h2>
            <p className="text-gray-600 mb-4">
              抽象类在很大程度上和接口会有点类似：都可以在其中定义一个方法，让子类或实现类来实现对应的方法。
            </p>
            <p className="text-gray-600 mb-4">
              <strong>抽象类和接口有什么区别:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>抽象类是事物的抽象，抽象类用来捕捉子类的通用特性，接口通常是一些行为的描述</li>
              <li>抽象类通常用于一些列关系紧密的类之间，接口只是用来描述一个类应该具体有什么行为</li>
              <li>接口可以被多层实现，而抽象类只能单一继承</li>
              <li>抽象类中可以有实现体，接口中只能由函数的声明</li>
            </ul>
            <p className="text-gray-600 mb-4">
              <strong>通常我们会这样来描述类和抽象类、接口之间的关系:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>抽象类是对事物的抽象，表达的是 is a 的关系。猫是一种动物（动物就可以定义成一个抽象类）</li>
              <li>接口是对行为的抽象，表达的是 has a 的关系。猫可以跑（可以单独定义一个接口）、爬树（可以定义一个单独的接口）的行为</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">TypeScript 枚举类型</h2>
            <p className="text-gray-600 mb-4">
              枚举类型是为数不多的 TypeScript 特性有的特性之一。枚举其实就是将一组可能出现的值，一个个例举出来，定义在一个类型中，这个类型就是枚举类型。枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              // 定义枚举类型
              <br />enum Direction{'{'}
              <br />&nbsp;&nbsp;UP,
              <br />&nbsp;&nbsp;DOWN,
              <br />&nbsp;&nbsp;LEFT,
              <br />&nbsp;&nbsp;RIGHT
              <br />{'}'}
              <br />
              <br />const d1: Direction = Direction.UP
              <br />
              <br />function turnDirection(firection: Direction){'{'}
              <br />&nbsp;&nbsp;switch(direction){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;case Direction.LEFT:
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("橘色向左移动一个各自")
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
              <br />&nbsp;&nbsp;&nbsp;&nbsp;case Direction.RIGHT:
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("橘色向右移动一个各自")
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型语法的基础使用</h2>
            <p className="text-gray-600 mb-4">
              泛型是 TypeScript 中的一种类型参数化机制，允许我们编写可重用的代码，这些代码可以与多种类型一起工作。
            </p>
            <p className="text-gray-600 mb-4">
              例如，我们可以定义一个泛型函数，它可以接受任何类型的参数并返回相同类型的结果。泛型函数的语法使用尖括号来指定类型参数，如 function bar&lt;T&gt;(arg: T): T。
            </p>
            <p className="text-gray-600 mb-4">
              当调用泛型函数时，我们可以显式指定类型参数，如 bar&lt;number&gt;(123) 或 bar&lt;string&gt;("abc")，TypeScript 也可以根据传入的参数自动推断类型。
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型-useState 联系</h2>
            <p className="text-gray-600 mb-4">
              泛型常用于编写通用函数，比如 React 中的 useState 函数。useState 函数使用泛型来推断状态的类型，这样我们就不需要显式指定状态的类型。
            </p>
            <p className="text-gray-600 mb-4">
              例如，当我们调用 useState(100) 时，TypeScript 会自动推断状态的类型为 number；当我们调用 useState("Hello world") 时，会推断为 string 类型。
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型实现类型参数化</h2>
            <p className="text-gray-600 mb-4">
              虽然 any 是可以的，但是定义为 any 的时候，我们其实已经丢失了类型信息。比如我们传入的是一个 number，那么我们希望返回的可不是 any 类型，而是 number 类型。
            </p>
            <p className="text-gray-600 mb-4">
              所以我们需要在函数中可以捕获到参数的类型是 number，并且同时使用它来作为返回值的类型。我们需要使用一种特性的变量 - 类型变量（type variable），它作用于类型，而不是值。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              function foo&lt;Type&gt;(arg: Type): Type {'{'}
              <br />&nbsp;&nbsp;return arg
              <br />{'}'}
            </div>
            <p className="text-gray-600 mb-4">
              这里我们可以通过两种方式来调用它：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>方式一：通过 &lt;类型&gt; 的方式将类型传递给函数</li>
              <li>方式二：通过类型推导，自动推导出我们传入的能量的类型</li>
              <li>在这会推导出它们是字面量类型的，因为字面量类型对于我们的函数也是适用的</li>
            </ul>
            <p className="text-gray-600 mb-4">
              当类型推断不正确的时候手动添加上就行。
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型补充</h2>
            <p className="text-gray-600 mb-4">
              泛型支持传入多个类型参数：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              function foo&lt;Type, Element&gt;(arg1: Type, arg2: Element) {'{'}
              <br />{'}'}
              <br />
              <br />foo(10, 20)
              <br />foo(10, "abc")
            </div>
            <p className="text-gray-600 mb-4">
              平时在开发中经常看见的类型参数命名：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>T: Type 的缩写，类型</li>
              <li>K、V: key 和 value 的缩写，键值对</li>
              <li>E: Element 的缩写，元素</li>
              <li>O: Object 的缩写，对象</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型接口</h2>
            <p className="text-gray-600 mb-4">
              接口也可以使用泛型：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              interface Ikun&lt;Type = string&gt; {'{'} // 添加默认值
              <br />&nbsp;&nbsp;name: Type
              <br />&nbsp;&nbsp;age: number
              <br />&nbsp;&nbsp;slogan: Type
              <br />{'}'}
              <br />
              <br />const kun: Ikun&lt;string&gt; = {'{'}
              <br />&nbsp;&nbsp;name: "why",
              <br />&nbsp;&nbsp;age: 18,
              <br />&nbsp;&nbsp;slogan: "hahaha"
              <br />{'}'}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型类</h2>
            <p className="text-gray-600 mb-4">
              类也可以使用泛型：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              class Point&lt;Type = number&gt;{'{'}
              <br />&nbsp;&nbsp;x: Type,
              <br />&nbsp;&nbsp;y: Type,
              <br />&nbsp;&nbsp;constructor(x: Type, y: Type){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this.x = x
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this.y = y
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
              <br />
              <br />const p1 = new Point(10, 20)
              <br />const p2 = new Point("123", "321")
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">泛型约束</h2>
            <p className="text-gray-600 mb-4">
              有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中。比如 string 和 array 都有 length 的，或者某些对象也是会有 length 属性的。
            </p>
            <p className="text-gray-600 mb-4">
              那么只要是拥有 length 的属性都可以作为我们的参数类型，我们可以使用泛型约束：
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              interface ILength{'{'}
              <br />&nbsp;&nbsp;length: number
              <br />{'}'}
              <br />
              <br />// getLength 没有必要用泛型
              <br />function getLength(arg: ILength){'{'}
              <br />&nbsp;&nbsp;return arg.length
              <br />{'}'}
              <br />
              <br />getLength("aaa")
              <br />getLength(["abc", "bcd", "sgc"])
              <br />
              <br />// 获取传入的内容，这个内容必须要有length属性
              <br />// Type相当于一个变量，用于记录本次调用的类型，所以在整个函数的执行周期中，一直保留着参数的类型
              <br />function getInfo&lt;Type extends ILength&gt;(args: Type): Type{'{'}
              <br />&nbsp;&nbsp;return args
              <br />{'}'}
              <br />
              <br />const info1 = getLength("aaaa")
              <br />const info2 = getLength(["aaa", "bbb", "ccc"])
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">面向对象编程</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">readonly 修饰符</h3>
            <p className="text-gray-600 mb-4">
              readonly 修饰符用于标记属性为只读，一旦初始化后就不能再修改。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              class Person{'{'}
              <br />&nbsp;&nbsp;readonly name: string
              <br />&nbsp;&nbsp;age: number
              <br />
              <br />&nbsp;&nbsp;constructor(name: string, age: number){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this.name = name
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this.age = age
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
              <br />
              <br />// 类和实例之间的关系
              <br />const p = new Person("xiaomi", 18)
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">getters/setters</h3>
            <p className="text-gray-600 mb-4">
              在前面一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取 (getter) 和设置 (setter) 的过程，这个时候我们可以使用存取器。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              class Person {'{'}
              <br />&nbsp;&nbsp;// 私有属性:属性前面会使用_
              <br />&nbsp;&nbsp;private _name: string
              <br />
              <br />&nbsp;&nbsp;constructor(name: string){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this._name = name
              <br />&nbsp;&nbsp;{'}'}
              <br />
              <br />&nbsp;&nbsp;running(){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;console.log("running:", this._name)
              <br />&nbsp;&nbsp;{'}'}
              <br />
              <br />&nbsp;&nbsp;// setter/getter: 对属性访问进行拦截操作
              <br />&nbsp;&nbsp;set name(newValue: string){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this._name = newValue
              <br />&nbsp;&nbsp;{'}'}
              <br />
              <br />&nbsp;&nbsp;get name(){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;return this._name
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">参数属性</h3>
            <p className="text-gray-600 mb-4">
              可以通过在构造函参数前添加一个可见性修饰符来创建参数，最后这些类属性字段也会得到这些修饰符。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              class Person{'{'}
              <br />&nbsp;&nbsp;// name: string
              <br />&nbsp;&nbsp;// age: number
              <br />&nbsp;&nbsp;// height: number
              <br />
              <br />&nbsp;&nbsp;constructor(public name: string, private age: number, readonly height: number){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this.age = age
              <br />&nbsp;&nbsp;&nbsp;&nbsp;this.height = height
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
              <br />
              <br />const p = new Person()
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">抽象类 abstract 和抽象方法</h3>
            <p className="text-gray-600 mb-4">
              继承是多态的前提。抽象类不能被实例化，抽象方法必须出现在抽象类中，子类必须实现。
            </p>
            <div className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              abstract class Shape(){'{'}
              <br />&nbsp;&nbsp;// getArea方法只有声明没有实现体
              <br />&nbsp;&nbsp;// 实现让子类自己实现,可以将方法定义为抽象方法
              <br />&nbsp;&nbsp;// 抽象方法必须出现在抽象类中，子类必须实现
              <br />&nbsp;&nbsp;// 抽象类不能被实例化
              <br />&nbsp;&nbsp;abstract getArea()
              <br />{'}'}
              <br />
              <br />class Rectangle extends Shape{'{'}
              <br />&nbsp;&nbsp;constructor(public width: number, public height: number){'{'}{'}'}
              <br />&nbsp;&nbsp;getArea(){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;return this.width * this.height
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
              <br />
              <br />class Circle extends Shape{'{'}
              <br />&nbsp;&nbsp;constructor(public radius: number){'{'}{'}'}
              <br />&nbsp;&nbsp;getArea(){'{'}
              <br />&nbsp;&nbsp;&nbsp;&nbsp;return this.radius ** 2 * Math.PI
              <br />&nbsp;&nbsp;{'}'}
              <br />{'}'}
              <br />
              <br />// 通用函数
              <br />//function getArea(shape: Rectangle | Circle){'{'}
              <br />// 继承以后
              <br />function getArea(shape: Shape){'{'}
              <br /> & nbsp;&nbsp;return shape.getArea()
              <br />{'}'}
              <br />
              <br />getArea(new Rectangle())
              <br />getArea(new Circle())
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-sm py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 个人技术博客分享</p>
        </div>
      </footer>
    </div>
  );
};

const JavaScriptPage = () => {
  // 页面挂载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-contain bg-top bg-no-repeat bg-[#DEE2E1] font-sans" style={{ backgroundImage: "url('/src/assets/images/bg1.jpg')" }}>
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-primary-700">李梅琳个人技术博客分享</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">首页</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">技术栈</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">文章</Link>
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">关于</Link>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">JavaScript 高级编程</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">JavaScript</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">前端</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">高级特性</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">2026-03-28</span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              JavaScript 是一种高级编程语言，广泛应用于 Web 开发。它是一种解释型语言，具有动态类型和面向对象的特性。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">闭包</h2>
            <p className="text-gray-600 mb-4">
              闭包是指有权访问另一个函数作用域中变量的函数。它允许函数访问并操作其外部作用域中的变量，即使在外部函数已经执行完毕后。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">原型</h2>
            <p className="text-gray-600 mb-4">
              <strong>解决问题</strong>：构造函数浪费内存
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">prototype 属性</h3>
            <p className="text-gray-600 mb-4">
              <strong>目标</strong>：能够利用原型对象实现方法共享
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>构造函数通过原型分配的函数是所有对象所<strong>共享</strong>的</li>
              <li>Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象，所以我们也称为原型对象</li>
              <li>这个对象跨域挂载函数，对象实例化不会多次创建原型上的函数，节约内存</li>
              <li>我们可以把那些不变的方法，直接定义在prototype对象上，这样所有对象的实例就可以通过共享这些方法</li>
              <li>构造函数和原型对象中的this都指向实例化对象</li>
            </ul>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 构造函数 公共的属性和方法 封装到 Star 构造函数里面了
                function Star(uname, age) &lbrace;
                this.uname = uname;
                this.age = age;
                // this.sing = function () &lbrace;
                //   console.log('唱歌');
                // &rbrace;
                &rbrace;
                // 公共的方法写到原型对象身上
                Star.prototype.sing = function () &lbrace;
                console.log('唱歌');
                &rbrace;
                const ldh = new Star('刘德华', 55);
                const zxy = new Star('张学友', 58);
                ldh.sing(); // 调用
                zxy.sing(); // 调用
                console.log(ldh.sing === zxy.sing); // true
              </code>
            </pre>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">对象原型</h3>
            <p className="text-gray-600 mb-4">
              对象都会有一个属性 <strong>__proto__</strong> 指向构造函数的 prototype 原型对象，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 __proto__ 原型的存在。
            </p>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">注意：</h4>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>__proto__ 是JS非标准属性</li>
                <li>[[prototype]]和__proto__意义相同</li>
                <li>用来表明当前实例对象指向哪个原型对象prototype</li>
                <li>__proto__对象原型里面也有一个 constructor属性，指向创建该实例对象的构造函数</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">constructor 属性</h3>
            <p className="text-gray-600 mb-4">
              每个原型对象里都有一个constructor属性（constructor构造函数）
            </p>
            <p className="text-gray-600 mb-4">
              <strong>作用</strong>：该属性指向该原型对象的构造函数，简单理解，就是指向父级，让原型对象能找到父级（谁创造了这个原型）
            </p>
            <p className="text-gray-600 mb-4">
              <strong>使用场景</strong>：
            </p>
            <p className="text-gray-600 mb-4">
              如果有多个对象的方法，我们可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象constructor就不再指向当前构造函数了。此时，我们可以在修改后的原型对象中，添加一个constructor指向原来的构造函数。
            </p>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">1. 原型对象的 constructor 属性（指向创建它的构造函数）</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 定义一个构造函数 Star
                function Star(name) &lbrace;
                this.name = name;
                &rbrace;

                // 1. 访问 Star 的原型对象 Star.prototype
                // 这个原型对象的 constructor 属性，指向创建它的构造函数 Star
                console.log(Star.prototype.constructor === Star); // 输出：true

                // 用 Star 构造函数创建实例
                const sun = new Star('太阳');

                // 2. 实例的 __proto__ 指向构造函数的原型对象（Star.prototype）
                console.log(sun.__proto__ === Star.prototype); // 输出：true

                // 3. 实例通过 __proto__ 访问到原型对象的 constructor，依然指向 Star
                console.log(sun.__proto__.constructor === Star); // 输出：true
                console.log(sun.constructor === Star); // 输出：true（等价于上面的写法，实例会沿原型链查找）
              </code>
            </pre>
            <p className="text-gray-600 mb-4">
              <strong>结论</strong>：原型对象（Star.prototype）的 constructor 指向创建它的构造函数（Star）。
            </p>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2. 子类的 constructor（自身构造函数，指向子类本身，需用 super 调用父类逻辑）</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 父类：汽车
                class Car &lbrace;
                constructor(brand) &lbrace;
                this.brand = brand; // 父类的构造逻辑：初始化品牌
                &rbrace;
                &rbrace;

                // 子类：跑车（继承自 Car）
                class SportsCar extends Car &lbrace;
                constructor(brand, speed) &lbrace;
                // 子类构造函数必须先调用父类构造函数（否则报错）
                super(brand); // 调用父类的 constructor，传入品牌参数
                this.speed = speed; // 子类自己的构造逻辑：初始化最高速度
                &rbrace;
                &rbrace;

                // 1. 子类的 constructor 指向子类自身（SportsCar）
                console.log(SportsCar.prototype.constructor === SportsCar); // 输出：true

                // 用子类创建实例
                const ferrari = new SportsCar('法拉利', 350);
                console.log(ferrari.brand); // 输出：法拉利（父类构造逻辑的结果）
                console.log(ferrari.speed); // 输出：350（子类构造逻辑的结果）

              // 3. 实例的 constructor 指向子类（因为实例的原型链最终指向子类的原型）
              </code>
            </pre>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">原型继承</h3>
            <p className="text-gray-600 mb-4">
              借助原型对象实现继承的特性
            </p>
            <p className="text-gray-600 mb-4">
              继承是面向对象编程的另一个特征，通过继承进一步提升代码封装的程度，JavaScript 中大多是借助原型对象的特征
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 继续抽取 公共的部分放到原型上
                const Person = &lbrace;
                eyes: 2,
                head: 1
                &rbrace;

                // 女人 构造函数 继承Person
                function Woman() &lbrace;
                &rbrace;

                // Woman 通过原型来继承Person
                Woman.prototype = Person;
                const red = new Woman();
                console.log(red);

                // 男人 构造函数 继承Person
                function Man() &lbrace;
                &rbrace;
                const pink = new Man();
                console.log(pink);
              </code>
            </pre>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">原型链</h2>
            <p className="text-gray-600 mb-4">
              基于原型对象的继承使用不同构造函数的原型对象关联在一起，并且这种关联的关系是一种链状的结构，我们将原型对象的链状结构关系称为原型链
            </p>
            <p className="text-gray-600 mb-4">
              所有对象里面都有原型__proto__对象原型指向原型对象，所有的原型对象就有constructor，指向创建该原型对象的构造函数
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // function Object() &lbrace;&rbrace;
                console.log(Object.prototype.__proto__); // 输出：null

                function Person() &lbrace;
                &rbrace;

                const ldh = new Person();
              // console.log(ldh.__proto__ === Person.prototype);
              // console.log(Person.prototype.__proto__ === Object.prototype);
              </code>
            </pre>
            <p className="text-gray-600 mb-4">
              原型链是 JavaScript 中实现继承的机制。每个对象都有一个原型对象，当访问对象的属性或方法时，如果对象本身没有该属性或方法，就会沿着原型链向上查找。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">深浅拷贝</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">浅拷贝</h3>
            <p className="text-gray-600 mb-4">
              首先浅拷贝和深拷贝只针对引用类型
            </p>
            <p className="text-gray-600 mb-4">
              浅拷贝：拷贝的是地址值
            </p>
            <p className="text-gray-600 mb-4">
              <strong>常见方法：</strong>
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>拷贝对象：Object.assign() / 展开运算符 &lbrace; ...obj &rbrace; 拷贝对象</li>
              <li>拷贝数组：Array.prototype.concat() 或者 &lbrace; ...arr &rbrace;</li>
            </ol>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">深拷贝</h3>
            <p className="text-gray-600 mb-4">
              首先浅拷贝和深拷贝只针对引用类型
            </p>
            <p className="text-gray-600 mb-4">
              深拷贝：拷贝的是对象，不是地址
            </p>
            <p className="text-gray-600 mb-4">
              <strong>常见方法：</strong>
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>通过递归实现深拷贝</li>
              <li>Lodash/cloneDeep</li>
              <li>通过 JSON.stringify() 实现</li>
            </ol>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">深浅拷贝的区别</h3>
            <p className="text-gray-600 mb-4">
              如果是简单数据类型拷贝值，引用数据类型拷贝的是地址（简单理解：如果是单层对象，没问题；如果多层就有问题）
            </p>
            <p className="text-gray-600 mb-4">
              <strong>直接赋值和浅拷贝有什么区别：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>直接赋值的方法，只要是对象，都会互相影响，因为是直接拷贝对象栈里面的地址</li>
              <li>浅拷贝如果是一层对象，不相互影响，如果出现或称对象拷贝还会相互影响</li>
            </ul>
            <p className="text-gray-600 mb-4">
              <strong>浅拷贝如何理解：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>拷贝对象之后，里面的属性值是简单的数据类型直接拷贝值</li>
              <li>如果属性值是引用数据类型则拷贝的是地址</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">深拷贝实现示例</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">常见方式一：通过递归实现深拷贝</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const obj = &lbrace;
                uname: 'pink',
                age: 18,
                hobby: ['乒乓球', '足球']
                &rbrace;
                const o = &lbrace;
                &rbrace;
                // 拷贝函数
                function deepCopy(newObj, oldObj) &lbrace;
                for (let k in oldObj) &lbrace;
                // 处理数组的问题
                if (oldObj[k] instanceof Array) &lbrace;
                newObj[k] = [];
                // newObj[k] 接受 []
                // oldObj[k] ['乒乓球','足球']
                deepCopy(newObj[k], oldObj[k]);
                &rbrace; else &lbrace;
                // k 属性名 uname age oldObj[k] 属性值 18
                // newObj[k] ==== o.uname
                newObj[k] = oldObj[k];
                &rbrace;
                &rbrace;
                &rbrace;
                deepCopy(o, obj); // 函数调用 两个参数 o 新对象 obj旧对象
                console.log(o);
                o.age = 20;
                o.hobby[0] = '篮球';
                console.log(obj);
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">常见方式二：使用 Lodash 的 cloneDeep</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 先引用
                // &lt;script src="./lodash.min.js"&gt;&lt;/script&gt;

                const obj = &lbrace;
                uname: 'pink',
                age: 18,
                hobby: ['乒乓球', '足球'],
                family: &lbrace;
                baby: '小pink'
                &rbrace;
                &rbrace;
                const o = _.cloneDeep(obj);
                console.log(o);
                o.family.baby = '老pink';
                console.log(obj);
              </code>
            </pre>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">防抖和节流</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">防抖</h3>
            <p className="text-gray-600 mb-4">
              <strong>定义：</strong>单位时间内，频繁触发事件，只执行最后一次
            </p>
            <p className="text-gray-600 mb-4">
              <strong>举例：</strong>回城，只要被打断就需要重新来
            </p>
            <p className="text-gray-600 mb-4">
              <strong>使用场景：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>搜索框搜索输入，只需要用户最后一次输入完，再发送请求</li>
              <li>手机号、邮箱验证输入检测</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">1. Lodash 提供的防抖来处理</h4>
            <pre className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              <code>
                _.debounce(func, [wait], [options])
              // 创建一个 debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2. 手写防抖函数</h4>
            <p className="text-gray-600 mb-4">
              <strong>核心思路：</strong>防抖的核心就是利用定时器（setTimeout）来实现
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>声明一个定时器变量</li>
              <li>当鼠标每次滑动都先判断是否有定时器了，如果有定时器先清除以前的定时器</li>
              <li>如果没有定时器则开启定时器，记得存到变量里面</li>
              <li>在定时器里面调用要执行的函数</li>
            </ol>
            <pre className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              <code>
                const box = document.querySelector('.box')
                let i = 1
                function mouseMove() &lbrace;
                box.innerHTML = i++
                // 如果里面存在大量的性能消耗代码，比如dom操作，比如数据需要处理，可能造成卡顿
                &rbrace;

                // 手写防抖函数
                // 核心思路：防抖的核心就是利用定时器（setTimeout）来实现
                // 1. 声明一个定时器变量
                // 2. 当鼠标每次滑动都先判断是否有定时器了，如果有定时器先清除以前的定时器
                // 3. 如果没有定时器则开启定时器，记得存到变量里面
                // 4. 在定时器里面调用要执行的函数
                function debounce(fn, t) &lbrace;
                let timer
                // return 返回一个匿名函数
                return function () &lbrace;
                // 2.3.4
                if (timer) clearTimeout(timer)
                timer = setTimeout(function () &lbrace;
                fn() // 加小括号调用fn函数
                &rbrace;, t)
                &rbrace;
                &rbrace;

                box.addEventListener('mousemove', debounce(mouseMove, 500))
              // debounce(mouseMove, 500) // 调用函数
              </code>
            </pre>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">节流</h3>
            <p className="text-gray-600 mb-4">
              <strong>定义：</strong>单位时间内，频繁触发事件，只执行一次
            </p>
            <p className="text-gray-600 mb-4">
              <strong>举例：</strong>技能冷却，在冷却时间内无法释放技能；换弹期间不能射击
            </p>
            <p className="text-gray-600 mb-4">
              <strong>使用场景：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>高频时间：鼠标移动 mousemove、页面尺寸缩放 resize，滚动条滚动 scroll</li>
              <li>滚动加载，加载更多或滚到底部监听</li>
              <li>高频点击，如游戏中的攻击按钮</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">1. Lodash 提供的节流来处理</h4>
            <pre className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              <code>
                _.throttle(func, [wait=0], [options=])
                // 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数
                // 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用
                // 可以提供一个 options 对象决定如何调用 func 方法
                // options.leading 与或 options.trailing 决定 wait 前后如何触发

                // 使用示例
                const box = document.querySelector('.box')
                let i = 1
                function mouseMove() &lbrace;
                box.innerHTML = i++
                // 如果里面存在大量的性能消耗代码，比如dom操作，比如数据需要处理，可能造成卡顿
                &rbrace;

                // 用Lodash库实现节流 - 3000ms后采取+1
                box.addEventListener('mousemove', _.throttle(mouseMove, 3000))
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2. 手写节流函数</h4>
            <p className="text-gray-600 mb-4">
              <strong>核心思路一：</strong>节流的核心就是利用时间戳来实现
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>声明一个开始时间变量，初始值为 0</li>
              <li>当鼠标每次滑动都计算当前时间与开始时间的差</li>
              <li>如果差值大于等于设定的时间间隔，则执行函数，并更新开始时间</li>
            </ol>
            <pre className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              <code>
                const box = document.querySelector('.box')
                let i = 1
                function mouseMove() &lbrace;
                box.innerHTML = i++
                &rbrace;

                // 手写节流函数
                // 核心思路：节流的核心就是利用时间戳来实现
                // 1. 声明一个开始时间变量，初始值为 0
                // 2. 当鼠标每次滑动都计算当前时间与开始时间的差
                // 3. 如果差值大于等于设定的时间间隔，则执行函数，并更新开始时间
                function throttle(fn, t) &lbrace;
                let startTime = 0
                return function () &lbrace;
                const now = Date.now()
                if (now - startTime &gt;= t) &lbrace;
                fn()
                startTime = now
                &rbrace;
                &rbrace;
                &rbrace;

                box.addEventListener('mousemove', throttle(mouseMove, 500))
              </code>
            </pre>

            <p className="text-gray-600 mb-4">
              <strong>核心思路二：</strong>节流的核心思路就是利用定时器（setTimeout）来实现
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>声明一个定时器变量</li>
              <li>当鼠标每次滑动都先判断是否有定时器了，如果有定时器则不开启新定时器</li>
              <li>如果没有定时器则开启定时器，记得存到变量里面</li>
              <li>定时器里面调用执行的函数</li>
              <li>定时器里面要把定时器清空（清理定时器的状态而不是清理定时器的值）</li>
            </ol>
            <pre className="bg-gray-800 text-white p-3 rounded-md font-mono text-sm mb-4">
              <code>
                const box = document.querySelector('.box')
                let i = 1
                function mouseMove() &lbrace;
                box.innerHTML = i++
                // 如果里面存在大量的性能消耗代码，比如dom操作，比如数据需要处理，可能造成卡顿
                &rbrace;

                // 手写节流函数（使用 setTimeout）
                function throttle(fn, t) &lbrace;
                let timer
                return function () &lbrace;
                if (!timer) &lbrace;
                timer = setTimeout(function () &lbrace;
                fn()
                timer = null // 清空定时器状态
                &rbrace;, t)
                &rbrace;
                &rbrace;
                &rbrace;

                box.addEventListener('mousemove', throttle(mouseMove, 500))
              </code>
            </pre>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">防抖和节流的区别</h3>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">特性</th>
                    <th className="py-2 px-4 border-b text-left">防抖（Debounce）</th>
                    <th className="py-2 px-4 border-b text-left">节流（Throttle）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">触发时机</td>
                    <td className="py-2 px-4 border-b">在事件停止触发后延迟执行</td>
                    <td className="py-2 px-4 border-b">在固定时间间隔内执行一次</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">高频场景</td>
                    <td className="py-2 px-4 border-b">只执行最后一次操作</td>
                    <td className="py-2 px-4 border-b">按固定频率执行多次操作</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">应用场景</td>
                    <td className="py-2 px-4 border-b">搜索框联想、窗口 resize、按钮防重复点击</td>
                    <td className="py-2 px-4 border-b">滚动加载、高频点击（如点赞）、游戏中的技能</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">实际使用场景</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">防抖的实际使用场景：</h4>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>输入框实时搜索：当用户在输入框中输入时，可以使用防抖技术延迟执行搜索查询，减少不必要的查询和服务器压力</li>
              <li>表单验证：当用户表单输入时，可以使用防抖技术在用户停止输入一段时间后再执行验证，减少验证次数</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">节流的实际使用场景：</h4>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>滚动事件监听：监听页面滚动到底部加载更多数据时，可以使用节流技术减少检查滚动位置的频率，提高性能</li>
              <li>鼠标移动事件：实现一个拖拽功能，可以使用节流技术减少鼠标移动事件的处理频率</li>
              <li>动画效果：当实现一个基于事件的动画效果时，可以使用节流技术限制动画帧率，降低计算开销</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">异步编程</h2>
            <p className="text-gray-600 mb-4">
              JavaScript 是单线程的，但通过回调函数、Promise 和 async/await 等机制，它可以实现异步编程，处理网络请求、文件操作等耗时任务。
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">ES6+ 新语法新特性</h2>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">展开运算符</h3>
            <p className="text-gray-600 mb-4">
              展开运算符（...），将一个数组进行展开
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const arr = [1, 2, 3, 4];<br />
                console.log(...arr); // 1 2 3 4
              </code>
            </pre>
            <p className="text-gray-600 mb-4">
              <strong>说明</strong>：不会修改原数组
            </p>
            <p className="text-gray-600 mb-4">
              <strong>典型应用</strong>：求数组的最大值（最小值）、合并数组等
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 1. 求数组最值<br />
                const arr1 = [1, 2, 3, 4];<br />
                console.log(Math.max(...arr1)); // 4<br />
                console.log(Math.min(...arr1)); // 1<br />
                // 2. 合并数组<br />
                const arr2 = [5, 6, 7];<br />
                const arr = [...arr1, ...arr2];<br />
                console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
              </code>
            </pre>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">箭头函数（重要）</h3>
            <p className="text-gray-600 mb-4">
              引用箭头函数的目的是更简短的函数写法并且不绑定 this，箭头函数的语法比函数表达式更简洁
            </p>
            <p className="text-gray-600 mb-4">
              <strong>使用场景</strong>：箭头函数适用于那些本来需要匿名函数的地方
            </p>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">箭头函数的语法</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 语法一：基本写法<br />
                const fn = function() &lbrace;<br />
                &nbsp;&nbsp;console.log(123);<br />
                &rbrace;<br />
                // 箭头函数<br />
                const fn = () =&gt; &lbrace;<br />
                &nbsp;&nbsp;console.log(123);<br />
                &rbrace;<br />
                <br />
                // 语法二：只有一个参数可以省略小括号<br />
                const fn = x =&gt; &lbrace;
                &nbsp;&nbsp;console.log(x);
                &rbrace;<br />
                <br />
                // 语法三：如果函数体只有一行代码，可以写到一行上，并且无需写 return 直接返回值<br />
                const fn = x =&gt; console.log(x);<br />
                const fn = (x, y) =&gt; x + y;<br />
                console.log(fn(1, 2)); // 3<br />
                <br />
                // 语法四：加括号的函数体返回对象字面量表达式<br />
                const fn1 = (uname) =&gt; (&lbrace;name: uname &rbrace;);<br />
                console.log(fn1('user_1')); // &lbrace;name: 'user_1' &rbrace;
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">箭头函数的参数</h4>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>普通函数有 arguments 动态参数</li>
              <li>箭头函数没有 arguments 动态参数，但是有剩余参数 ...args</li>
            </ol>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 1. 利用箭头函数求和<br />
                const getSum = (...arr) =&gt; &lbrace;
                &nbsp;&nbsp;let sum = 0;
                &nbsp;&nbsp;for(let i = 0; i &lt; arr.length; i++) &lbrace;
                &nbsp;&nbsp;&nbsp;&nbsp;sum += arr[i];
                &nbsp;&nbsp;&rbrace;
                &nbsp;&nbsp;return sum; // 注意函数体有多行代码需要 return
                &rbrace;<br />
                const result = getSum(2, 3);
                console.log(result); // 5
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">箭头函数 this</h4>
            <p className="text-gray-600 mb-4">
              在箭头函数出现之前，每一个函数根据它是被如何调用的来定义这个函数的 this 值
            </p>
            <p className="text-gray-600 mb-4">
              箭头函数不会创建自己的 this，它只会从自己的作用域链的上一层沿用 this
            </p>
            <p className="text-gray-600 mb-4">
              <strong>理解</strong>：箭头函数的 this，指向调用者的调用者，谁调用了箭头函数的上一级 this 指向谁
            </p>
            <p className="text-gray-600 mb-4">
              DOM 事件回调为了简便，不推荐使用箭头函数
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">解构赋值</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">数组解构</h4>
            <p className="text-gray-600 mb-4">
              将数组的单元值快速批量赋值给一系列变量的简洁语法
            </p>
            <p className="text-gray-600 mb-4">
              <strong>基本语法</strong>：赋值运算符 = 左侧的 [ ] 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
            </p>
            <p className="text-gray-600 mb-4">
              变量的顺序对应数组单元值的位置依次进行赋值操作
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const arr = [100, 60, 80];<br />
                // 数组解构 赋值<br />
                const [max, min, avg] = arr;<br />
                console.log(max); // 100<br />
                console.log(avg); // 80
              </code>
            </pre>
            <p className="text-gray-600 mb-4">
              <strong>典型应用</strong>：交换 2 个变量
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                let a = 1;
                let b = 2; // 必须加分号
                [b, a] = [a, b];
                console.log(a, b); // 2 1
              </code>
            </pre>
            <p className="text-gray-600 mb-4">
              <strong>注</strong>：js 前面必须加分号的情况
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>立即执行函数</li>
              <li>数组解构（数组开头）</li>
            </ol>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">变量多 单元值少的情况</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const [a, b, c, d] = [1, 2, 3];
                console.log(a); // 1
                console.log(b); // 2
                console.log(c); // 3
                console.log(d); // undefined
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">变量少 单元值多的情况</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const [a, b] = [1, 2, 3];
                console.log(a); // 1
                console.log(b); // 2
              </code>
            </pre>
            <p className="text-gray-600 mb-4">
              利用剩余参数解决变量少 单元值多的情况：
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const [a, b, ...c] = [1, 2, 3, 4];
                console.log(a); // 1
                console.log(b); // 2
                console.log(c); // [3, 4] 真数组
              </code>
            </pre>

            <p className="text-gray-600 mb-4">
              防止有 undefined 传入单元值的情况，可以设置默认值：
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const [a = 0, b = 0] = [1, 2];
                console.log(a); // 1
                console.log(b); // 2
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">按需导入，忽略某些返回值</h4>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const [a, b, , d] = [1, 2, 3, 4];
                console.log(a); // 1
                console.log(b); // 2
                console.log(d); // 4
                <br />
                // 多维数组的解构
                const [a, b, [c, d]] = [1, 2, [3, 4]];
                console.log(a); // 1
                console.log(b); // 2
                console.log(c); // 3
                console.log(d); // 4
              </code>
            </pre>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">对象解构</h4>
            <p className="text-gray-600 mb-4">
              将对象属性和方法快速批量赋值给一系列变量的简洁语法
            </p>
            <p className="text-gray-600 mb-4">
              <strong>基本语法</strong>：赋值运算符 = 左侧 { } 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
            </p>
            <p className="text-gray-600 mb-4">
              对象属性的值被赋值给与属性名相同的变量
            </p>
            <p className="text-gray-600 mb-4">
              注意解构的变量名不要和外面的变量名冲突否则报错<br />
              对象中找不到与变量名一致的属性时变量值为 undefined
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 结构的语法 变量名和属性名要一致
                const &lbrace; uname, age &rbrace; = &lbrace; uname: 'lily', age: 18 &rbrace;;
                // 等价于 const uname = obj.uname
                console.log(uname); // lily
                console.log(age); // 18
              </code>
            </pre>

            <h5 className="text-md font-semibold text-gray-700 mt-4 mb-2">给新的变量名赋值：</h5>
            <p className="text-gray-600 mb-4">
              可以从一个对象中提取变量并同时修改新的变量名
            </p>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const uname = 'Tom';
                // 结构前语法
                // const &lbrace; uname, age &rbrace; = &lbrace; uname: 'Lily', age: 18 &rbrace;;
                // // 等价于 const uname = obj.uname
                // console.log(uname);
                // console.log(age);
                // 对象解构的变量名 可以重新改名 旧变量名: 新变量名
                const &lbrace; uname: username, age &rbrace; = &lbrace; uname: 'lily', age: 18 &rbrace;;
                console.log(username); // lily
                console.log(age); // 18
              </code>
            </pre>

            <h5 className="text-md font-semibold text-gray-700 mt-4 mb-2">数组对象的解构：</h5>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                // 解构数组对象
                const pig = [
                &lbrace;
                uname: '佩奇',
                age: 6
                &rbrace;
                ];
                const [&lbrace; uname, age &rbrace;] = pig;
                console.log(uname); // 佩奇
                console.log(age); // 6
              </code>
            </pre>

            <h5 className="text-md font-semibold text-gray-700 mt-4 mb-2">多级对象解构：</h5>
            <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <code className="text-gray-800">
                const pig = &lbrace;
                name: '佩奇',
                family: &lbrace;
                mother: 'PigM',
                father: 'Pig',
                sister: 'Pigs'
                &rbrace;,
                age: 6
                &rbrace;;
                // 多级对象解构
                const &lbrace; name, family: &lbrace; mother, father, sister &rbrace; &rbrace; = pig;
                console.log(name); // 佩奇
                console.log(mother); // PigM
                console.log(father); // Pig
                console.log(sister); // Pigs

                // 解构数组中的对象
                const person = [
                &lbrace;
                name: '佩奇',
                family: &lbrace;
                mother: 'PigM',
                father: 'Pig',
                sister: 'Pigs'
                &rbrace;,
                age: 6
                &rbrace;
                ];
                const [&lbrace; name, family: &lbrace; mother, father, sister &rbrace; &rbrace;] = person;
                console.log(name); // 佩奇
                console.log(mother); // PigM
                console.log(father); // Pig
                console.log(sister); // Pigs
              </code>
            </pre>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">创建对象的三种方式</h3>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-2">
              <li>
                <strong>利用数字字面量创建对象</strong>
                <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                  <code className="text-gray-800">
                    const obj = &lbrace;
                    uname: 'Tom'
                    &rbrace;;
                  </code>
                </pre>
              </li>
              <li>
                <strong>利用 new Object 创建对象</strong>
                <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                  <code className="text-gray-800">
                    const obj = new Object(&lbrace; uname: 'Tom' &rbrace;);
                    console.log(obj); // &lbrace; uname: 'Tom' &rbrace;
                  </code>
                </pre>
              </li>
              <li>
                <strong>利用构造函数创建对象</strong>
                <p className="text-gray-600 mb-4">
                  构造函数：一种特殊函数，主要用来初始化对象
                </p>
                <p className="text-gray-600 mb-4">
                  使用场景：常规的 &lbrace; &rbrace; 语法允许创建一个对象。例如如果我们创建了 Tom 的对象，继续创建 Lily 对象需要重新写一遍，此时可以通过构造函数来快速创建多个类似的对象
                </p>
                <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                  <code className="text-gray-800">
                    // 创建佩奇的对象
                    const Peppa = &lbrace;
                    name: '佩奇',
                    age: 6,
                    gender: '女'
                    &rbrace;;
                    // 创建乔治的对象
                    const George = &lbrace;
                    name: '乔治',
                    age: 3,
                    gender: '男'
                    &rbrace;;
                    // 构造函数
                    function Pig(name, age, gender) &lbrace;
                    this.name = name;
                    this.age = age;
                    this.gender = gender;
                    &rbrace;
                    // 创建佩奇对象
                    const Peppa = new Pig('佩奇', 6, '女');
                    // 创建乔治对象
                    const George = new Pig('乔治', 3, '男');
                    // 创建猪妈妈对象
                    const Mum = new Pig('猪妈妈', 30, '女');
                    // 创建猪爸爸对象
                    const Dad = new Pig('猪爸爸', 32, '男');
                    console.log(Peppa); // &lbrace; name: '佩奇', age: 6, gender: '女' &rbrace;
                  </code>
                </pre>
              </li>
            </ol>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">构造函数的约定</h4>
            <p className="text-gray-600 mb-4">
              构造函数在技术上是常规函数，遵循两个约定：
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>命名以大写字母开头</li>
              <li>只能由 "new" 操作符来执行</li>
            </ol>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>适用 new 关键字调用函数的行为被称为实例化</li>
              <li>实例化构造函数时没有参数时可以省略 ()</li>
              <li>构造函数内部无需写 return，返回值即为新创建的对象</li>
              <li>构造函数内部的 return 返回值即无效，所以不要写 return</li>
              <li>new Object ()、new Date () 也是实例化构造函数</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">实例成员 & 静态成员</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">实例成员：</h4>
            <p className="text-gray-600 mb-4">
              通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员（实例属性和实例方法）
            </p>
            <p className="text-gray-600 mb-4">
              构造函数创建实例对象彼此独立互不影响
            </p>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">静态成员：</h4>
            <p className="text-gray-600 mb-4">
              构造函数的属性和方法被称为静态成员（静态属性和静态方法）
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">作用域</h3>
            <p className="text-gray-600 mb-4">
              <strong>局部作用域</strong>：局部作用域分为函数作用域和块作用域
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>
                <strong>函数作用域</strong>：
                <ul className="list-circle pl-6 space-y-1">
                  <li>在函数内部声明变量只能在函数内部访问，外部无法直接访问</li>
                  <li>函数内部的参数也是函数的局部变量</li>
                  <li>不同函数的变量之间无法互相访问</li>
                  <li>函数执行完毕后，函数内部的变量实际被清空了</li>
                </ul>
              </li>
              <li>
                <strong>块作用域</strong>：
                <ul className="list-circle pl-6 space-y-1">
                  <li>在 JavaScript 中使用 { } 包裹的代码称为代码块，代码块内部声明的变量外部将【有可能】无法被访问</li>
                  <li>let 声明的变量会产生块作用域，var 不会产生块作用域</li>
                  <li>不同代码块之间的变量无法相互访问</li>
                  <li>推荐使用 let 或 const</li>
                </ul>
              </li>
            </ul>

            <p className="text-gray-600 mb-4">
              <strong>全局作用域</strong>：&lt;script&gt; 标签和 .js 文件的【最外层】就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>全局作用域中声明的变量，任何其他作用域都可以直接被访问</li>
              <li>为 window 对象动态添加的属性默认也是全局的，不推荐</li>
              <li>函数中未使用任何关键字声明的变量为全局变量，不推荐</li>
              <li>尽可能少的声明全局变量，防止变量被污染</li>
            </ul>

            <p className="text-gray-600 mb-4">
              <strong>作用域链</strong>：本质上是底层的变量查找机制
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>在函数执行时，会优先查找当前函数作用域中查找变量</li>
              <li>如果在当前作用域找不到则会依次逐级查找父级作用域直到全局作用域</li>
              <li>嵌套关系的作用域串联起来形成了作用域链</li>
              <li>相同作用域链中按着从小到大的规则查找变量</li>
              <li>子作用域能够访问父作用域，父级作用域无法访问子级作用域</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">JS 垃圾回收机制（GC）</h3>
            <p className="text-gray-600 mb-4">
              <strong>内存的生命周期</strong>
            </p>
            <p className="text-gray-600 mb-4">
              JS 环境中分配的内存，一般有如下生命周期：
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>a. 内存分配：当我们声明变量、函数、对象的时候，系统会自动为他们分配内存</li>
              <li>b. 内存使用：即读写内存，也就是使用变量、函数等</li>
              <li>c. 内存回收：使用完毕，由垃圾回收器自动回收不再使用的内存</li>
            </ul>

            <p className="text-gray-600 mb-4">
              全局变量一般不回收（关闭页面回收）<br />
              一般情况下局部变量的值，不用了，会被自动回收掉
            </p>

            <p className="text-gray-600 mb-4">
              <strong>内存泄漏</strong>：程序中分配的内存由于某种原因程序未释放或无法释放
            </p>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">栈堆空间分配区别：</h4>
            <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-1">
              <li>栈（操作系统）：由操作系统自动分配释放函数的参数值、局部变量等，基本数据类型放到栈里</li>
              <li>堆（操作系统）：一般有程序员分配释放，如程序员不释放，由垃圾回收机制回收，复杂数据类型放到堆里面</li>
            </ol>

            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">垃圾回收算法：</h4>
            <p className="text-gray-600 mb-3">
              <strong>引用计数法</strong>
            </p>
            <p className="text-gray-600 mb-3">
              IE 采用引用计数算法，定义“内存不再使用”，看一个对象是否由指向它的引用，没有引用了就回收对象
            </p>
            <p className="text-gray-600 mb-2">
              <strong>算法：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>跟踪记录被引用的次数</li>
              <li>如果被引用了依次，那么就记录次数 1，多次引用会累加 ++</li>
              <li>如果减少了一个引用就减 1 --</li>
              <li>如果引用次数是 0，则释放内存</li>
            </ul>

            <p className="text-gray-600 mb-2">
              <strong>缺点：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>嵌套引用（循环引用）如果两个对象相互引用，尽管他们已不再使用，垃圾回收器不会进行回收，导致内存泄漏</li>
              <li>因为他们的引用次数永远不会是 0.这样的相互引用如果说很大量的存在就会导致大量的内存泄漏</li>
            </ul>

            <p className="text-gray-600 mb-3">
              <strong>标记清除法</strong>
            </p>
            <p className="text-gray-600 mb-3">
              现代的浏览器已经不再使用引用计数法了<br />
              现代浏览器通用的大多数是基于标记清除算法的某些改进算法，总体思想都是一致的
            </p>
            <p className="text-gray-600 mb-2">
              <strong>核心：</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>标记清除算法将“不再使用的对象”定义为“无法达到的对象”</li>
              <li>就是从根部（在 js 中就是全局对象）出发定时扫描内存中的对象。凡是能从根部到达的对象，都是还需要使用的</li>
              <li>那些无法由根部出发触及到的对象被标记为不再使用，稍后进行回收</li>
            </ul>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-sm py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 个人技术博客分享</p>
        </div>
      </footer>
    </div>
  );
};

// 主页面组件
const HomePage = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // 初始化技术卡片和过渡文字的状态
    const transitionText = document.getElementById('transition-text');
    if (transitionText) {
      transitionText.style.opacity = '0.5';
      transitionText.style.transform = 'translateY(0)';
    }

    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
      const htmlCard = card as HTMLElement;
      htmlCard.style.opacity = '1';
      htmlCard.style.transform = 'translateY(0)';
    });

    // 打字机效果
    const typewriterEffect = (elementId: string, text: string, speed: number = 100) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      // 确保元素内容被清空
      element.textContent = '';
      let i = 0;

      const type = () => {
        if (i < text.length) {
          // 只添加当前字符，不重复添加
          element.textContent = text.substring(0, i + 1);
          i++;
          setTimeout(type, speed);
        }
      };

      type();
    };

    // 只对名字应用打字机效果
    setTimeout(() => {
      typewriterEffect('intro-name', 'Hello，I\'m Limeilin', 50);
    }, 100);

    // 直接设置描述和信息文本，不使用打字机效果，也不延迟
    const descriptionElement = document.getElementById('intro-description');
    if (descriptionElement) {
      descriptionElement.textContent = '分享学习过程中的技术经验，记录学习过程中的点击收获，探索编程世界的无限可能。';
    }

    const infoElement = document.getElementById('intro-info');
    if (infoElement) {
      infoElement.textContent = '23岁/贵州毕节/';
    }

    // 数字动画函数
    const animateNumbers = (element: Element) => {
      // 检查元素是否已经动画过，避免重复触发
      if (element.classList.contains('animated')) {
        return;
      }

      const target = parseInt(element.getAttribute('data-target') || '0');
      // 直接定义后缀，避免从文本中提取导致的问题
      const text = element.textContent || '';
      let suffix = '';
      if (text.includes('%')) {
        suffix = '%';
      } else if (text.includes('+')) {
        suffix = '+';
      }

      let current = 0;
      const duration = 1000; // 动画持续时间（毫秒）
      const startTime = performance.now();

      const updateNumber = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // 使用缓动函数使动画更自然
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(easeProgress * target);
        element.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          element.textContent = target + suffix;
          // 标记元素已经动画过
          element.classList.add('animated');
        }
      };

      requestAnimationFrame(updateNumber);
    };

    // 滚动监听，实现下划线动画效果和技术卡片的淡入淡出效果
    const handleScroll = () => {
      const sections = [
        { id: 'tech-stack-section', titleClass: 'tech-underline', cards: ['react-section', 'vue-section', 'node-section', 'javascript-section', 'typescript-section'] },
        { id: 'projects-section', titleClass: 'tech-underline', cards: ['project-card-1', 'project-card-2', 'project-card-3'] },
        { id: 'contact-section', titleClass: 'tech-underline', cards: [] }
      ];

      const windowHeight = window.innerHeight;

      sections.forEach((currentSection) => {
        const sectionElement = document.getElementById(currentSection.id);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > 0;

          // 处理下划线
          const underlineElements = sectionElement.querySelectorAll(`.${currentSection.titleClass}`);
          underlineElements.forEach(underline => {
            const htmlUnderline = underline as HTMLElement;
            const titleElement = sectionElement.querySelector('h2');
            if (titleElement) {
              const titleWidth = titleElement.clientWidth;

              if (isInViewport) {
                // 进入视口时，下划线展开并标黑
                htmlUnderline.style.width = `${titleWidth}px`;
                htmlUnderline.style.backgroundColor = 'black';
              } else {
                // 离开视口时，下划线收缩并隐藏
                htmlUnderline.style.width = '0';
                htmlUnderline.style.backgroundColor = 'black';
              }
            }
          });

          // 处理技术卡片的淡入淡出
          if (currentSection.cards.length > 0) {
            currentSection.cards.forEach(cardId => {
              const cardElement = document.getElementById(cardId);
              if (cardElement) {
                const cardRect = cardElement.getBoundingClientRect();
                const cardIsInViewport = cardRect.top < windowHeight * 0.8 && cardRect.bottom > 0;

                if (cardIsInViewport) {
                  // 卡片进入视口时，淡入并从底部向上移动
                  cardElement.style.opacity = '1';
                  cardElement.style.transform = 'translateY(0)';
                  // 启动数字动画
                  cardElement.querySelectorAll('.project-number').forEach(animateNumbers);
                } else {
                  // 卡片离开视口时，淡出并向下移动
                  cardElement.style.opacity = '0';
                  cardElement.style.transform = 'translateY(20px)';
                }
              }
            });
          }
        }
      });
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    // 初始触发一次
    handleScroll();

    // 清理事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-contain bg-top bg-no-repeat font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-[#DEE2E1] text-gray-800'}`} style={{ backgroundImage: isDarkMode ? "url('/src/assets/images/bg2.jpg')" : "url('/src/assets/images/bg1.jpg')" }}>
      {/* 导航栏 */}
      <Navbar />

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex justify-center">
          {/* 个人介绍 */}
          <div className="w-full max-w-md text-center">
            <div className="relative mb-6">
              <h1 className={`text-2xl md:text-3xl font-bold mb-6 opacity-0 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Hello，I'm Limeilin</h1>
              <h1 id="intro-name" className={`text-2xl md:text-3xl font-bold mb-6 transition-transform duration-300 hover:scale-105 absolute top-0 left-0 right-0 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}></h1>
            </div>
            <p id="intro-description" className={`mb-4 text-sm md:text-base transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              分享学习过程中的技术经验，记录学习过程中的点击收获，探索编程世界的无限可能。
            </p>
            <p id="intro-info" className={`mb-6 text-sm md:text-base transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              23岁/贵州毕节/
            </p>
          </div>
        </div>

        {/* 过渡文字动画 */}
        <div className="mt-8 py-20 relative overflow-hidden">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-0 transition-opacity duration-1000 ease-out" id="transition-text">
            {
              [
                { text: 'css', size: 'text-sm' },
                { text: 'html', size: 'text-base' },
                { text: 'vue', size: 'text-lg' },
                { text: 'JavaScript', size: 'text-xl' },
                { text: 'webpack', size: 'text-sm' },
                { text: 'git', size: 'text-base' },
                { text: 'typescript', size: 'text-lg' },
                { text: 'react', size: 'text-xl' },
                { text: 'ajax', size: 'text-sm' }
              ].map((item, index) => (
                <span
                  key={index}
                  className={`${item.size} text-gray-500 font-medium transform transition-transform hover:scale-110 hover:text-primary-500`}
                  style={{
                    transform: `translateY(${Math.random() * 10 - 5}px)`,
                    opacity: 0.7 + Math.random() * 0.3
                  }}
                >
                  {item.text}
                </span>
              ))
            }
          </div>
        </div>

        {/* 相关技术栈模块 */}
        <div id="tech-stack-section" className="mt-12 container mx-auto px-4">
          <div className="mb-6 inline-block relative">
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>相关技术栈</h2>
            <div className="tech-underline h-1 bg-white w-0 transition-all duration-500 ease-out rounded-full transform-origin-center"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* React 技术模块 */}
            <div id="react-section" className={`tech-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>React 开发实践</h3>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2025-10-02</span>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>探索 React 最新特性和最佳实践，包括 Hooks、Context API 和 Server Components 等。</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">React</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>前端</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>最佳实践</span>
              </div>
              <div className="flex justify-end">
                <Link to="/react" className={`font-medium transition-colors ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>more &gt;&gt;</Link>
              </div>
            </div>

            {/* Vue 技术模块 */}
            <div id="vue-section" className={`tech-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Vue 3 实战指南</h3>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2025-05-23</span>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>深入学习 Vue 3 的 Composition API、Teleport 和 Suspense 等新特性，构建现代化的前端应用。</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Vue</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>前端</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>Composition API</span>
              </div>
              <div className="flex justify-end">
                <Link to="/vue" className={`font-medium transition-colors ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>more &gt;&gt;</Link>
              </div>
            </div>

            {/* Node.js 技术模块 */}
            <div id="node-section" className={`tech-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Node.js 基础与接口开发</h3>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2024-12-05</span>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>学习 Node.js 基础、接口编写以及 Express 路由，掌握后端开发核心技能。</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Node.js</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>接口开发</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>Express</span>
              </div>
              <div className="flex justify-end">
                <Link to="/node" className={`font-medium transition-colors ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>more &gt;&gt;</Link>
              </div>
            </div>

            {/* JavaScript 技术模块 */}
            <div id="javascript-section" className={`tech-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>JavaScript 高级编程</h3>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2024-2-24</span>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>深入学习 JavaScript 的高级特性，包括闭包、原型链、异步编程和 ES6+ 新特性等。</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">JavaScript</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>前端</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>高级特性</span>
              </div>
              <div className="flex justify-end">
                <Link to="/javascript" className={`font-medium transition-colors ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>more &gt;&gt;</Link>
              </div>
            </div>

            {/* TypeScript 技术模块 */}
            <div id="typescript-section" className={`tech-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 md:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>TypeScript 类型系统</h3>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2026-04-01</span>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>掌握 TypeScript 的高级类型、泛型和装饰器等特性，提升代码质量和可维护性。</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">TypeScript</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>类型系统</span>
                <span className={isDarkMode ? "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium" : "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"}>最佳实践</span>
              </div>
              <div className="flex justify-end">
                <Link to="/typescript" className={`font-medium transition-colors ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}>more &gt;&gt;</Link>
              </div>
            </div>
          </div>
        </div>

        {/* 相关项目模块 */}
        <div id="projects-section" className="mt-12 container mx-auto px-4">
          <div className="mb-6 inline-block relative">
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>相关项目</h2>
            <div className="tech-underline h-1 bg-white w-0 transition-all duration-500 ease-out rounded-full transform-origin-center"></div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {/* 后台管理系统 */}
            <a id="project-card-1" href="https://github.com/Lmnnnning/shop-admin" target="_blank" rel="noopener noreferrer" className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">SA</span>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>后台管理系统</h3>
              </div>
              <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>基于 Vue3 + Vite + JavaScript + Ant Design 的后台管理系统，包含用户管理、权限控制等功能。</p>
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <div className={`text-xl font-bold project-number ${isDarkMode ? 'text-white' : 'text-gray-800'}`} data-target="3">0+</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>核心功能</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold project-number ${isDarkMode ? 'text-white' : 'text-gray-800'}`} data-target="1">0</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>项目经验</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold project-number ${isDarkMode ? 'text-white' : 'text-gray-800'}`} data-target="95">0%</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>完成度</div>
                </div>
              </div>
            </a>

            {/* 租房系统 */}
            <a id="project-card-2" href="https://gitee.com/WO-Bug/rental_housing_platform" target="_blank" rel="noopener noreferrer" className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">RH</span>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>租房系统</h3>
              </div>
              <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>基于 React + TypeScript + Ant Design + Material 的租房平台，包含房源管理、用户认证等功能。</p>
              <div className="flex justify-center gap-12">
                <div className="text-center">
                  <div className={`text-xl font-bold project-number ${isDarkMode ? 'text-white' : 'text-gray-800'}`} data-target="4">0+</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>核心功能</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold project-number ${isDarkMode ? 'text-white' : 'text-gray-800'}`} data-target="1">0</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>项目经验</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold project-number ${isDarkMode ? 'text-white' : 'text-gray-800'}`} data-target="90">0%</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>完成度</div>
                </div>
              </div>
            </a>


          </div>
        </div>

        {/* 联系我模块 */}
        <div id="contact-section" className="mt-12 container mx-auto px-4">
          <div className="mb-6 inline-block relative">
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>联系我</h2>
            <div className="tech-underline h-1 bg-white w-0 transition-all duration-500 ease-out rounded-full transform-origin-center"></div>
          </div>
          <div className={`rounded-2xl shadow-md p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>期待与志同道合的伙伴一起，增加技术，打破消息壁垒</p>
            <ul className={`space-y-3 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>邮箱: 2235329077@qq.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>github仓库: <a href="https://github.com/Lmnnnning" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-primary-400 hover:underline' : 'text-blue-500 hover:underline'}`}>https://github.com/Lmnnnning</a></span>
              </li>
            </ul>
          </div>
        </div>

        {/* 占位内容，增加页面高度以便滚动 */}
        <div className="h-32 md:h-64"></div>
      </main>

      {/* 页脚 */}
      <footer className={isDarkMode ? "bg-black/80 backdrop-blur-sm shadow-sm py-6" : "bg-white/80 backdrop-blur-sm shadow-sm py-6"}>
        <div className="container mx-auto px-4 text-center">
          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>© 2026 个人技术博客分享</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/vue" element={<VuePage />} />
          <Route path="/node" element={<NodePage />} />
          <Route path="/javascript" element={<JavaScriptPage />} />
          <Route path="/typescript" element={<TypeScriptPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;