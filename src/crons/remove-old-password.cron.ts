import {CronJob} from "cron";
import {timeHelper} from "../helpers/time.helper.js";

import {oldPasswordRepository} from "../repositories/old-password.repository.js";


const handler = async () => {
    try {
        const date = timeHelper.subtractByParams(180,'days')
        const deleteCount = await oldPasswordRepository.deleteBeforeDate(date)
        console.log(`Deleted ${deleteCount} old tokens`)
    }catch (err) {
        console.log(err)
    }
}

export const removeOldPassword = new CronJob('0 0 * * *',handler)