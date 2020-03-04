export default async function checkRepo({user, repo}) {
  const repoUrl = `https://api.github.com/repos/${user}/${repo}`;
  console.log('checkRepo: ', repoUrl);
  // eslint-disable-next-line no-undef
  return fetch(repoUrl)
    .then(res => {
      if (!res.ok) {
        return {
          type: 'REPO_ERROR',
          errorType: 'REPO_ERROR',
          text: 'Check username or password.',
        };
      } else {
        return {ok: res.ok, type: 'REPO_SUCCESS'};
      }
    })
    .catch(e => {
      return {type: 'REPO_ERROR', errorType: 'REPO_ERROR', text: e};
    });
}
