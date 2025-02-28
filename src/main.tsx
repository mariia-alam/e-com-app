import { createRoot } from 'react-dom/client'
import AddRouter from './routes/AddRouter';
//redux
import { Provider } from 'react-redux';
import { store, persistor } from '@store/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css'
//axios
import "@services/axios-global.js"


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

        </PersistGate>
        <AddRouter/>
    </Provider>

)