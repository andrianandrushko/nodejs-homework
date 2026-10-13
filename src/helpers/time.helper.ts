import  {type ManipulateType} from "dayjs";
import  dayjs from "dayjs";

class TimeHelper{
    public subtractByParams(value: number, unit:ManipulateType):Date {
        return dayjs().subtract(value, unit).toDate();
    }
    public parseConfigString(string: string) {
        const [value, unit] = string.split(' ') as [string,string]
        return {value: parseInt(value), unit: unit as ManipulateType}
    }
}

export const timeHelper = new TimeHelper()