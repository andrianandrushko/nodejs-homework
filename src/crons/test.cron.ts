import cron, {CronJob} from 'cron'


const handler = async () => {
    console.log('TestCron is running')
}

export const testCron = new CronJob('* * * * *', handler)