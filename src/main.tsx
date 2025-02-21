import { createRoot } from 'react-dom/client'
import AddRouter from './routes/AddRouter';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css'


createRoot(document.getElementById('root')!).render(
        <AddRouter/>

)
