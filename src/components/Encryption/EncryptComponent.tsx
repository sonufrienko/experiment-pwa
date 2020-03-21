import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as cryptoHelper from '../../cryptoHelper'

const EncryptComponent = ({ publicKey, setEncrypted }: { publicKey: string, setEncrypted: (result: string) => void }) => {
  const [ messageText, setMessageText ] = useState<string>('This is my top-secret message.\nKeep it safe!');
  const componentDisabled = !publicKey;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const handleEncrypt = async () => {
    try {
      const result = await cryptoHelper.encryptMessage(publicKey, messageText);
      setEncrypted(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Paper>
      <div style={{ padding: '30px 20px 20px 20px', margin: '30px 0' }}>
        <TextField 
          label="Text to encrypt" 
          variant="outlined" 
          value={messageText} 
          onChange={handleChange} 
          multiline
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button style={{ margin: '20px 0 0 0' }} onClick={handleEncrypt} variant="contained" color="primary" disabled={componentDisabled}>Encrypt</Button>
      </div>
    </Paper>
  )
}

export default EncryptComponent;