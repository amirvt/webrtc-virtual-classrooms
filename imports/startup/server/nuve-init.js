var N =  require('../../licode/nuve.js')
import config from '../../licode/config';


let x = N.API.init(config.service.id, config.service.key, config.nuve_host);
if (!x)
    console.error('Failed to connect to Licode server');
   