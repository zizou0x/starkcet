import './style/index.css'
import kakarotLogo from '../assets/kakarot_logo.svg'
import kakarotNameLogo from '../assets/kakarot_name_logo.svg'
import styled from "styled-components"


export default function Header() {

  return (
    <Main>
       <MainTitle>
         <Image src={kakarotNameLogo} alt="Avatar" />
      </MainTitle>
      <Navigation>
      </Navigation>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  @media (max-width: 1000px) {
    padding: 0px 10px;
  }
`

const MainTitle = styled.h1`
  color: #2d2d71;
  font-weight: 400;
  font-size: 50px;
  @media (max-width: 1000px) {
    font-size: 30px;
  }
`

const EndTitle = styled.span`
  font-weight: 500;
`

const Navigation = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  @media (max-width: 1000px) {
    gap: 10px;
  }
`


const Image = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 1000px) {
    width: 35px;
    height: 35px;
  }
`
