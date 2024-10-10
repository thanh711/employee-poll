import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Home from "./components/homePage/Home";
import Login from "./components/loginPage/Login";
import Logout from "./components/Logout";
import Poll from "./components/pollPage/Poll";
import NotFound from "./components/notFoundPage/NotFound";
import CreatePoll  from "./components/createPollPage/CreatePoll";
import Leaderboard   from "./components/leaderboardPage/Leaderboard";
import Navigation   from "./components/navigation/Navigation";
import rootReducer from './reducers/rootReducer';
import SortQuestionsMiddleware from './middleware/SortQuestionsMiddleware';

const AppRoutes = () => {
    const routes = [
        { path: '/', element: <Navigation children={ <Home/>} /> },
        { path: '/leaderboard', element: <Navigation children={ <Leaderboard/>} /> },
        { path: '/add', element: <Navigation children={ <CreatePoll/>} /> },
        { path: '/questions/:question_id', element: <Navigation children={ <Poll/>} /> },
        { path: '/login', element: <Login /> },
        { path: '/logout', element:  <Logout /> },
        { path: '/not-found', element: <Navigation children={ <NotFound />} />  },
        { path: '*',  element: <NotFound /> },
    ];
    return useRoutes(routes);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
        .concat(SortQuestionsMiddleware)
});

const App = () => {
    return (
      <Provider store={store}>
            <Router>
                <AppRoutes />
            </Router>
        </Provider>
    );
};

export default App;
