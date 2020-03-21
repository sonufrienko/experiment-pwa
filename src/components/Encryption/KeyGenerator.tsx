import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

interface KeyGeneratorProps {
  generateKeys: () => void, publicKey: string, privateKey: string
}

const KeyGenerator = ({ generateKeys, publicKey, privateKey }: KeyGeneratorProps) => (
  <Paper>
    <div style={{ padding: 20, margin: '30px 0' }}>
      <Typography gutterBottom>Keys</Typography>
      <Button onClick={generateKeys} variant="contained" color="primary">
        Generate a keys
      </Button>
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <TextField 
              label="Public Key" 
              variant="outlined"
              multiline
              rowsMax="10"
              style={{ flex: '0 0 49%' }}
              value={publicKey}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField 
              label="Private Key" 
              variant="outlined"
              multiline
              rowsMax="10"
              style={{ flex: '0 0 49%' }}
              value={privateKey}
              InputLabelProps={{
                shrink: true,
              }}
            />
      </div>
    </div>
  </Paper>
)

export default KeyGenerator;