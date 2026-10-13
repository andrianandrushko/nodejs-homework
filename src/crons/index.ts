import {testCron} from "./test.cron.js";
import {removeOldTokenCronJob} from "./remove-old-token.cron.js";
import {removeOldPassword} from "./remove-old-password.cron.js";


export const cronRunner = () => {
    testCron.start()
    removeOldTokenCronJob.start()
    removeOldPassword.start()
}