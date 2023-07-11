import styled from 'styled-components';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/style/theme';

function App() {
    return (
        <Main>
            <ThemeProvider theme={theme}>
                <Header />
                <BodyWrapper>
                    <Body />
                </BodyWrapper>
                <ToastContainer position="top-center" />
            </ThemeProvider>
            <Footer />
        </Main>
    );
}

const Main = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  // background: linear-gradient(280deg, rgba(255, 164, 63, 0.45) , rgba(255, 164, 63, 0.1) 70.71%),
  //           linear-gradient(355deg, rgba(113, 95, 255, 0.6), rgba(113, 95, 255, 0.1) 70.71%),
  //           linear-gradient(120deg, rgba(255, 164, 63, 1) , rgba(255, 164, 63, 0.1) 100.71%);
`


const BodyWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export default App;
