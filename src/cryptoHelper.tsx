const str2ab = (str: string) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

const ab2str = (buf: ArrayBuffer) => {
  // @ts-ignore
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

export const exportCryptoKeyAsPkcs8 = async (key: CryptoKey) => {
  const exportFormat = key.type === 'public' ? 'spki' : 'pkcs8';
  const keyType = key.type === 'public' ? 'PUBLIC' : 'PRIVATE';

  const exported = await window.crypto.subtle.exportKey(exportFormat, key);
  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = window.btoa(exportedAsString);
  const pemExported = `-----BEGIN ${keyType} KEY-----\n${exportedAsBase64}\n-----END ${keyType} KEY-----`;
  return pemExported;
};

export const generateKeys = async () => {
  const key: CryptoKeyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );

  return key;
};

const importKey = (pem: string, isPublicKey: boolean) => {
  const keyType = isPublicKey ? 'PUBLIC' : 'PRIVATE';
  // fetch the part of the PEM string between header and footer
  const pemHeader = `-----BEGIN ${keyType} KEY-----`;
  const pemFooter = `-----END ${keyType} KEY-----`;
  const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);

  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  
  // convert from a binary string to an ArrayBuffer
  const keyData = str2ab(binaryDerString);

  if (isPublicKey) {
    return window.crypto.subtle.importKey(
      "spki",
      keyData,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true,
      ["encrypt"]
    );
  } else {
    return window.crypto.subtle.importKey(
      'pkcs8',
      keyData,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["decrypt"]
    );
  }
}

export const encryptMessage = async (publicKey: string, message: string) => {
  const key = await importKey(publicKey, true);
  debugger;
  const enc = new TextEncoder();
  const encoded = enc.encode(message);

  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    key,
    encoded
  );

  return btoa(ab2str(ciphertext));
}

export const decryptMessage = async (privateKey: string, message: string) => {
  const key = await importKey(privateKey, false);
  const ciphertext = str2ab(atob(message));

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}