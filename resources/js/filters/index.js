
const commonFilters = {
    number(val){ return _.toNumber(val) },
    date(datetime,format){
        let dtf = _.keyBy(new Intl.DateTimeFormat('en',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true }).formatToParts(new Date(datetime)),'type');
        return (format || '[day]/[month]/[year]').replace(/\[(\w+)\]/g,(f,m) => _.get(dtf,[m,'value']))
    },
    time(datetime,format){
        let dtf = _.keyBy(new Intl.DateTimeFormat('en',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true }).formatToParts(new Date(datetime)),'type');
        return (format || '[hour]:[minute] [dayPeriod]').replace(/\[(\w+)\]/g,(f,m) => _.get(dtf,[m,'value']))
    }
}

const pubFilters = {

}

const admFilters = {

}

export const publicFilters = _.assign({},commonFilters,pubFilters)
export const adminFilters = _.assign({},commonFilters,admFilters)
