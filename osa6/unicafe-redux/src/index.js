import ReactDOM from 'react-dom/client'
import appExports from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<appExports.App />)
}

renderApp()
appExports.store.subscribe(renderApp)