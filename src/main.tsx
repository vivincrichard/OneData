import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
// import TodoList from './Components/TodoList.tsx'

// import TodoList from './project/TodoList.tsx


import TodoList from './Project/TodoList.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    
    <TodoList/>
  </React.StrictMode>,
)
