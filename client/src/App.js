
import { BrowserRouter, Route, Link,Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from '@apollo/client/link/context';
import Header from "./utils/header"

import SigninScreen from "./components/SigninScreen"
import ProfileScreen from "./components/ProfileScreen"
import UsersScreen from './components/UsersScreen';
import HolidayScreen from './components/HolidayScreen';
import HolidayRequestScreen from "./components/HolidayRequest"

import ProtectedRoute from "./utils/ProtectedRoute"
import AdminRoute from "./utils/AdminRoute"

const httpLink = createHttpLink({
  uri:`${process.env.REACT_APP_IP}/graphql`
});

const uploadLink = createUploadLink({
  uri:`${process.env.REACT_APP_IP}/graphql`
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  link: ApolloLink.from([authLink,uploadLink,httpLink]),
  cache: new InMemoryCache()
})


function App() {
  
  return (
    <ApolloProvider client={client}> 
      <BrowserRouter>
      <Header/>
         <Switch>
         <Route exact path="/" component={SigninScreen}/>
         <ProtectedRoute path="/profile" component={ProfileScreen} />
         <ProtectedRoute path="/users" component={UsersScreen}/>
         <ProtectedRoute path="/holidays" component={HolidayScreen}/>
         <ProtectedRoute path="/Request" component={HolidayRequestScreen}/>  
         </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
