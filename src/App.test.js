import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store"
import { BrowserRouter } from 'react-router-dom';
import { render, screen,  fireEvent } from '@testing-library/react';
import NotFound from "./components/notFoundPage/NotFound";
import Login from "./components/loginPage/Login";

var _DATA = require('./_DATA');

describe("_saveQuestion() test", () => {
  it("_saveQuestion() success", async () => {
    const optionOneText = "Tea";
    const optionTwoText = "Coffee";
    const author = "thanhnc34";
    const question = {
      optionOneText,
      optionTwoText,
      author,
    };
    var result = await _DATA._saveQuestion(question);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('author', author);
    expect(result.optionOne).toHaveProperty('text', optionOneText);
    expect(result.optionTwo).toHaveProperty('text',optionTwoText);
    expect(result.optionTwo).toHaveProperty('votes', []);
    expect(result.optionOne).toHaveProperty('votes', []);
  });

  it("_saveQuestion() fail", async () => {
    const question = {};
    expect(_DATA._saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer() test", () => {
  it("_saveQuestionAnswer() success", async () => {
    const authedUser = "tylermcginnis";
    const qid = "vthrdm985a262al8qx3do";
    const answer = "optionOne";
    const question = {
      authedUser,
      qid,
      answer,
    };
    var result = await _DATA._saveQuestionAnswer(question);
    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  it("_saveQuestionAnswer() fail", async () => {
    const question = {};
    expect(_DATA._saveQuestionAnswer(question)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});

describe('NotFound component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <NotFound/>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Login component', () => {
  beforeAll(()=>{
    jest.spyOn(window,"alert").mockImplementation(()=>{});
  });
  afterAll(()=>{
    window.alert.mockRestore();
  });
  const mockStore=configureMockStore();
  const initialState={
    users:[{
      id: 'sarahedo',
      password:'password123',
      name: 'Sarah Edo',
      avatarURL: '/img/sarahedo.webp',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    }],
    questions:[{
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'sarahedo',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'conduct a release retrospective 1 week after a release',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'conduct release retrospectives quarterly'
      }
    }]
  }
  const store= mockStore(initialState)


  it('should alert when click login button without username and password', () => {
    render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const submitButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitButton)
  expect(window.alert).toHaveBeenCalledWith("please enter username and password and try again !!!");
  });

  it('should render username field, password field, and submit button', () => {
     render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const usernameField = screen.getByPlaceholderText('User');
    const passwordField = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should alert when click login button with incorrect username and password', () => {
    render(
     <Provider store={store}>
       <BrowserRouter>
         <Login />
       </BrowserRouter>
     </Provider>
   );

   const usernameField = screen.getByPlaceholderText('User');
   const passwordField = screen.getByPlaceholderText('Password');
   const submitButton = screen.getByRole('button', { name: /login/i });
   fireEvent.change(usernameField,{target:{value:"sarahedo"}})
   fireEvent.change(passwordField,{target:{value:"incorrect password"}})
   fireEvent.click(submitButton)
   expect(window.alert).toHaveBeenCalledWith("username or password incorrect please try again !!!");
  });

  it(`should navigte to home page at route "/" when login success`, () => {
    render(
     <Provider store={store}>
       <BrowserRouter>
         <Login />
       </BrowserRouter>
     </Provider>
   );
   
   const usernameField = screen.getByPlaceholderText('User');
   const passwordField = screen.getByPlaceholderText('Password');
   const submitButton = screen.getByRole('button', { name: /login/i });
   fireEvent.change(usernameField,{target:{value:"sarahedo"}})
   fireEvent.change(passwordField,{target:{value:"password123"}})
   fireEvent.click(submitButton);
   expect(window.location.pathname).toBe('/');
  });

  it('matches the snapshot', () => {
    const { asFragment } =  render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

