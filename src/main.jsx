import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);