import {CronJob} from "cron";
import {configs} from "../configs/user.config.js";
import {timeHelper} from "../helpers/time.helper.js";
import {tokenRepository} from "../repositories/token.repository.js";


const handler = async () => {
    try {
        const {value,unit} = timeHelper.parseConfigString(configs.JWT_REFRESH_EXPIRATION);
        const date = timeHelper.subtractByParams(value,unit)
        const deleteCount = await tokenRepository.deleteBeforeDate(date)
        console.log(`Deleted ${deleteCount} old tokens`)
    }catch (err) {
       console.error(err);
    }
}

export const removeOldTokenCronJob = new CronJob('* * * * *', handler)