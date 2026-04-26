import Botchat from './components/botUi'
import bgImg from './assets/bg.png'
import './App.css'

function App() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <Botchat />
    </div>
  )
}

export default App
