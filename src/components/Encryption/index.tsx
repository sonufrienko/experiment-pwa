import React, { useState } from 'react';
import KeyGenerator from './KeyGenerator';
import EncryptComponent from './EncryptComponent';
import DecryptComponent from './DecryptComponent';
import * as cryptoHelper from '../../cryptoHelper'

export default () => {
  const [ publicKey, setPublicKey ] = useState<string>('');
  const [ privateKey, setPrivateKey ] = useState<string>('');
  const [ encryptedMessage, setEncrypted ] = useState<string>('');
  

  const generateKeys = async () => {
    const key = await cryptoHelper.generateKeys();
    
    const publicKeyExport = await cryptoHelper.exportCryptoKeyAsPkcs8(key.publicKey);
    setPublicKey(publicKeyExport);
    
    const privateKeyExport = await cryptoHelper.exportCryptoKeyAsPkcs8(key.privateKey);
    setPrivateKey(privateKeyExport);
  };

  return (
    <>
      <KeyGenerator generateKeys={generateKeys} publicKey={publicKey} privateKey={privateKey} />
      <EncryptComponent publicKey={publicKey} setEncrypted={setEncrypted} />
      <DecryptComponent privateKey={privateKey} encryptedMessage={encryptedMessage} />
    </>
  );
};
