import './App.css'
import Header from './components/Header/Header'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
      <Header />

      <div className='container'>
        <AppRoutes />
      </div>
    </>
  )
}

export default App
