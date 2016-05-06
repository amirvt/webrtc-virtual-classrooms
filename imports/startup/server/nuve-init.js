var N =  require('../../licode/nuve.js')
import config from '../../licode/config';

console.log("nuve-init");

let x = N.API.init(config.service.id, config.service.key, config.nuve_host);

console.log("init res = ")