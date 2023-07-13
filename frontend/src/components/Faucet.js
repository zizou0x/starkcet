import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import kakarot_logo from '../assets/kakarot_logo.svg'
import { toast } from 'react-toastify';


const notifyError = function (text) { toast.error(text); }

async function makeTransfer(toAddress) {
  try {
    const response = await fetch('/faucet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: toAddress }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error in makeTransfer: ${error.message}`);
  }
}

async function getBalanceOf(ofAddress) {
  try {
    const response = await fetch('/balance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ of: ofAddress }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.balance;
  } catch (error) {
    console.error(`Error in getBalanceOf: ${error.message}`);
  }
}

function Faucet() {
  const [addressInput, setAddressInput] = useState("")

  function assertAddressInputFormat() {
    // Regular expression to match hexadecimal strings (both uppercase and lowercase).
    const hexRegex = /^0x[0-9A-Fa-f]+$/;

    if (!hexRegex.test(addressInput)) {
      notifyError('Invalid address!');
      return;
    }
    if (addressInput.length > 66) {
      notifyError('Wrong address length!');
      return;
    }
  }

  async function starkcetFaucet() {
    assertAddressInputFormat();
    const data = await makeTransfer(addressInput);
    toast.info("Transaction sent:" + data.hash)
  };

  async function getBalance() {
    assertAddressInputFormat();
    const balance = await getBalanceOf(addressInput);
    if (balance !== undefined) {
      toast.info("Balance: " + balance);
    } else {
      toast.error("Something went wrong when trying to get balance")
    }
  };

  return (
    <FaucetContainer>
      <Col style={{ width: '100%' }}>
        <Image src={kakarot_logo} alt="Avatar" />
          <TextField style={{ width: '100%' }} label="Enter Your Wallet Address (0x...)" variant="outlined" onChange={(e) => setAddressInput(e.target.value)} />
      </Col>
      <Col>
        <Button style={{ minWidth: '120px' }} color='primary' variant="contained" onClick={() => { starkcetFaucet() }}>Get Tokens</Button>
      </Col>
      <Col>
        <Button style={{ minWidth: '120px' }} color='primary' variant="contained" onClick={() => { getBalance() }}>Get Balance</Button>
      </Col>
    </FaucetContainer>

  )
}

const Image = styled.img`
  width: 50px;
  height: 50px;
`



const FaucetContainer = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

const Col = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 1000px) {
    justify-content: center;
  }
`
export default Faucet
