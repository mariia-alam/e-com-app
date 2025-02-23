import { createRoot } from 'react-dom/client'
import AddRouter from './routes/AddRouter';
//redux
import { Provider } from 'react-redux';
import { store } from '@store/index.ts';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css'



createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AddRouter/>
    </Provider>

)