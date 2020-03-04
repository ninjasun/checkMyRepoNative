const PUSHMORE_URL = `https://pushmore.marc.io/webhook`;
const PUSHMORE_TOKEN_TEST = `yRLNkQz4z2ttd1peQU78gj8x`;
const headerText = {'Content-Type': 'text/plain', Accept: 'text/plain'};
//const PUSHMORE_WEBHOOK = `https://pushmore.io/webhook/d3Gm4aEPCuhAUjfbECLLdW41`;

export default async function sendRepo({user, repo}) {
  const repoUrl = `https://github.com/${user}/${repo}`;
  console.log('sendRepo: ', repoUrl);
  var bodyParams = {
    repoUrl,
    sender: 'Davide Mezzetti',
  };

  const errorRes = {
    ok: false,
    text: null,
    type: 'BOT_ERROR',
    errorType: 'BOT_ERROR',
  };

  try {
    // eslint-disable-next-line no-undef
    const rawResponse = await fetch(`${PUSHMORE_URL}/${PUSHMORE_TOKEN_TEST}`, {
      method: 'POST',
      header: headerText,
      body: JSON.stringify(bodyParams),
    });

    const responseText = await rawResponse.text();
    if (responseText === 'OK') {
      return {
        ok: true,
        type: 'BOT_SUCCESS',
      };
    }
    errorRes.errorText = responseText;
    return errorRes;
  } catch (e) {
    errorRes.errorText = e;
    return errorRes;
  }
}
