export default {
  number(val){ return _.toNumber(val) },
  date(datetime){ if(!datetime) return '';
    let dtf = _.keyBy(new Intl.DateTimeFormat('en',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true }).formatToParts(new Date(datetime)),'type');
    return ('[day]/[month]/[year]').replace(/\[(\w+)\]/g,(f,m) => _.get(dtf,[m,'value']))
  },
  time(datetime){ if(!datetime) return '';
    let dtf = _.keyBy(new Intl.DateTimeFormat('en',{ year:'numeric',month:'short',day:'2-digit',hour:'numeric',minute:'numeric',hour12:true }).formatToParts(new Date(datetime)),'type');
    return ('[hour]:[minute] [dayPeriod]').replace(/\[(\w+)\]/g,(f,m) => _.get(dtf,[m,'value']))
  }
}
