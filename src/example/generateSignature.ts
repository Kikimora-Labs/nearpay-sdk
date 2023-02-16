import {makeSignatureString} from '../index';

// pad string to the left
function padStart(str: string, length: number, pad: string) {
  return pad.repeat(Math.ceil(str.length / length)) + str;
}

function buf2hex(buffer: ArrayBuffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => padStart(x.toString(16), 2, '0'))
    .join('');
}

export async function generateSignature(
  secretKey: string,
  params: Record<string, string>,
) {
  const encoder = new TextEncoder();
  const algo = {name: 'HMAC', hash: 'SHA-256'};
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    algo,
    false,
    ['sign', 'verify'],
  );

  const signature = await crypto.subtle.sign(
    algo.name,
    key,
    encoder.encode(makeSignatureString(params)),
  );

  const digest = buf2hex(new Uint8Array(signature));

  return digest;
}
