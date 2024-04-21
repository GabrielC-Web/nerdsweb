import { CC_FTEMPLATE_GATEWAY, CC_NODE_ENV, GM_APIKEY } from './constants';

import version from 'package.json';

export const environment = {
  production: true,
  CC_VERSION: version.version,
  CC_GATEWAY_URL: CC_FTEMPLATE_GATEWAY,
  GM_APIKEY: GM_APIKEY,
  CC_ENV_NAME: CC_NODE_ENV,
};
