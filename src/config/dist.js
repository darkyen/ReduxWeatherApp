'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  OWM_APP_ID: '483d9d9df81f5687b6404a52f155ce48',
  defaultUnitSystem: 'imperial'
};

export default Object.freeze({ ...baseConfig, ...config});
