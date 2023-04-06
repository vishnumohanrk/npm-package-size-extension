const newElem = document.createElement('div');
const header = document.querySelector('#top > div > h2');
const installButton = document.querySelector('#top > div > p > code > span');

addBadge();

const observer = new MutationObserver((mutationList) => {
  for (const i of mutationList) {
    if (i.type === 'characterData') {
      addBadge();
    }
  }
});

observer.observe(installButton, { characterData: true, subtree: true });

function addBadge() {
  if (header) {
    const [pkgName, version] = location.pathname
      .replace('/package/', '')
      .split('/v/');

    const versionAt = version ? `@${version}` : '';
    const versionSlash = version ? `/${version}` : '';

    const alt = `View ${pkgName}${versionAt} on bundlephobia`;

    const bundlePhobiaURL = `https://bundlephobia.com/package/${pkgName}${versionAt}`;
    const badgeURL = `https://img.shields.io/bundlephobia/minzip/${pkgName}${versionSlash}`;

    newElem.innerHTML = `
    <a href=${bundlePhobiaURL} class="pl3" target="_blank" rel="noopener noreferrer" title="${alt}">
      <img src=${badgeURL} alt="" />
    </a>
  `;

    header.append(newElem);
  }
}
