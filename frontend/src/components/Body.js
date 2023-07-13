import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Faucet from "./Faucet";
import TransactionProvider from './TransactionContext';

function Body() {
  const [isBackendAlive, setIsBackendAlive] = useState(true);

  useEffect(() => {
    fetch('/health')
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Backend is not alive");
        }
      })
      .then(data => {
        if (data === 'ok') {
          setIsBackendAlive(true);
        } else {
          setIsBackendAlive(false);
        }
      })
      .catch(error => {
        setIsBackendAlive(false);
        console.error('Error:', error);
      });
  }, []);

  return (
    <BodyContainer>
      {!isBackendAlive && <BlurOverlay />}
      <TransactionProvider>
        <Faucet />
      </TransactionProvider>
      {!isBackendAlive && (
        <AlertBox>
          Unable to connect to the backend.
        </AlertBox>
      )}
    </BodyContainer >
  );
}

const BodyContainer = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 3px solid #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;
  width: 50%;
  max-width: 800px;
  transform-style: box-shadow .2s ease-in-out;
  border: 1px solid rgba(251,252,255,.3); 
  z-index: 10;
  @media (max-width: 1000px) {
    width: 90%;
  }
  :hover {
    box-shadow: 0 2px 16px #fe7506;
  }
`;

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  filter: blur(4px);
  z-index: 11;
`;

const AlertBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 5px;
  z-index: 12;
`;

export default Body;
