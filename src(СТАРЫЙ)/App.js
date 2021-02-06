import { useEffect, Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Container from './components/Container';
import AppBar from './components/AppBar';
import Phonebook from './components/Phonebook';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { authOperations } from './redux/auth';
import { authSelectors } from './redux/auth';

const LoginView = lazy(() => import('./views/LoginView'));
const RegisterView = lazy(() => import('./views/RegisterView'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser,
  );

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      {!isFetchingCurrentUser && <AppBar />}
      {!isFetchingCurrentUser && (
        <Switch>
          <Suspense fallback={<p>Загружаем...</p>}>
            {/* <Route exact path="/" component={Homeview} /> */}

            <PublicRoute
              exact
              path="/register"
              redirectTo="/contacts"
              restricted
            >
              <RegisterView />
            </PublicRoute>
            <PublicRoute exact path="/login" redirectTo="/contacts" restricted>
              <LoginView />
            </PublicRoute>

            <PrivateRoute path="/contacts">
              <Phonebook />
            </PrivateRoute>
          </Suspense>
        </Switch>
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
