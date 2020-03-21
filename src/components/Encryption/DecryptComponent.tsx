import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as cryptoHelper from '../../cryptoHelper';

const DecryptComponent = ({ privateKey, encryptedMessage }: { privateKey: string, encryptedMessage: string }) => {
  const [ messageText, setMessageText ] = useState<string>('');
  const [ decryptedMessage, setDecryptedMessage ] = useState<string>('');
  const componentDisabled = !privateKey;
  
  useEffect(() => {
    setMessageText(encryptedMessage);
  }, [encryptedMessage])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const handleDecrypt = async () => {
    try {
      const result = await cryptoHelper.decryptMessage(privateKey, messageText);
      setDecryptedMessage(result);
    } catch (err) {
      console.log(err)
      setDecryptedMessage(err.message);
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
        <Button style={{ margin: '20px 0 0 0' }} onClick={handleDecrypt} variant="contained" color="primary" disabled={componentDisabled}>Decrypt</Button>
        <div style={{ marginTop: 20 }}>
          {decryptedMessage}
        </div>
      </div>
    </Paper>
  )
}

export default DecryptComponent;