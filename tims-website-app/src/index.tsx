import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/main-style.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import './assets/styles/slider.scss';
import './assets/styles/loading.scss'
import 'react-multi-carousel/lib/styles.css';
import 'react-phone-input-2/lib/style.css'
import Loading from './components/Loading';
import axios from 'axios'
import { store } from './redux/store';
import { Provider } from 'react-redux';

axios.interceptors.response.use(
  response => response,
  error => {
    // ** const { config, response: { status } } = error
    const { config, response } = error
    if (response && response.data?.message === "Not Authorized token expired, Please Login again") {
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      toast.info(
        'Votre session a expiré, vous serez redirigé dans 3s. Veuillez vous reconnecter!',
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      )
      setTimeout(() => {
        window.location.href='/login'
      }, 3000);
      return null
    }
    return Promise.reject(error)
  }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const App = React.lazy(() => import('./App'));
root.render(
  <Provider store={store}>
    <Suspense fallback = {<Loading/>}>
    <Router>
      <App />
      <ToastContainer/>
    </Router>
    </Suspense>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
