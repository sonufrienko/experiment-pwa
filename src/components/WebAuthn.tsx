import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const randomStringFromServer = "UZSL85T9AFC";

// sample arguments for registration
const createCredentialDefaultArgs: CredentialCreationOptions = {
  publicKey: {
    // Relying Party (a.k.a. - Service):
    rp: {
      name: 'Acme'
    },

    // User:
    user: {
      id: Uint8Array.from("UZSL85T9AFC", c => c.charCodeAt(0)),
      name: 'sergey@mail.com',
      displayName: 'Sergey Onufrienko'
    },

    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7
      }
    ],

    attestation: 'direct',

    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      requireResidentKey: false,
      userVerification: 'preferred'
    },

    timeout: 60000,

    challenge: Uint8Array.from(randomStringFromServer, c => c.charCodeAt(0)),
  }
};

// sample arguments for login
const getCredentialDefaultArgs: CredentialRequestOptions = {
  publicKey: {
    // userVerification: "preferred",
    // rpId: 'login.example.org',
    timeout: 120000, // 2 min
    allowCredentials: [],
    challenge: Uint8Array.from(randomStringFromServer, c => c.charCodeAt(0)),
  }
};

const authCreate = async () => {
  // register / create a new credential
  navigator.credentials
    .create(createCredentialDefaultArgs)
    .then(publicKeyCredential => {
      console.log('NEW CREDENTIAL', publicKeyCredential);
    })
    .catch(err => {
      console.log('ERROR', err);
    });
};

const authGet = async () => {
  const encoder = new TextEncoder();
  const allowCredentials: PublicKeyCredentialDescriptor[] = [
    {
      id: encoder.encode('AZ4EwDtJ5Imx3ipB2CSKFeFIIdfiwu4N5aTvHQyI3ncTX7huC7WH070V-BYUtQCtSCCz5p4PGcnzMKpEmxf0gNHTeRsfQTH15oRrWW0jlQypBQ'),
      // transports: ['usb', 'nfc', 'ble', 'internal'],
      type: 'public-key'
    }
  ];

  // @ts-ignore
  getCredentialDefaultArgs.publicKey.allowCredentials = allowCredentials;
  const assertion = await navigator.credentials.get(getCredentialDefaultArgs);
  console.log('ASSERTION', assertion);
};

export default () => {
  const handleSignUp = async () => {
    if (window.PublicKeyCredential) {
      await authCreate();
    } else {
      console.log('WebAuthn not supported.');
    }
  };

  const handleSignIn = async () => {
    if (window.PublicKeyCredential) {
      await authGet();
    } else {
      console.log('WebAuthn not supported.');
    }
  };

  return (
    <Paper>
      <div style={{ padding: 20, margin: '30px 0' }}>
        <Typography gutterBottom>WebAuthn</Typography>
        <Button onClick={handleSignUp} variant="contained" color="primary">
          Sing up
        </Button>
        <Button style={{ marginLeft: 20 }} onClick={handleSignIn} variant="contained" color="primary" disabled={true}>
          Sing in
        </Button>
      </div>
    </Paper>
  );
};
