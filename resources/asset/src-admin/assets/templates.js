const { formatDate } = require('quasar').date

export const t_whatsapp = `
Hi *[customer_name_trimmed]*,
Thank you very much for your order on [company_name].

Here is your order details
\`\`\`Order  :\`\`\` *[id]*
\`\`\`Date   :\`\`\` *[human_date]*
\`\`\`Time   :\`\`\` *[human_time]*

\`\`\`Items  : \`\`\`
[items_text]
\`\`\`--------------------\`\`\`
\`\`\`-[total_center]-\`\`\`
\`\`\`--------------------\`\`\`

\`\`\`Address:\`\`\`
[address_text]
\`\`\`Phone  : \`\`\` *[customer_phone_trimmed]*

[order_note]
`
export const t_items = `\`\`\`[idx].\`\`\` *[item_name]*
[price_detail]
`
export const methods = {
  company_name(){ return `${COMPANY}` },
  human_date({ updated_at }){ return formatDate(new Date(updated_at),'DD/MMM/YY') },
  human_time({ updated_at }){ return formatDate(new Date(updated_at),'hh:mm A') },
  total_center({ total }){ return _.pad('``` *'+_.toNumber(total).toFixed(2)+'* ```',28) },
  customer_name_trimmed({ customer_name }){ return _.trim(customer_name) },
  customer_phone_trimmed({ customer_phone }){ return _.trim(customer_phone) },
  idx(itm,idx){ return _.padStart(_.toNumber(idx),2,'0') },
  item_name({ item },idx,item_details){ return _.get(item_details,[item,'name']) },
  item_price({ price }){ return '```@  '+_.padEnd(_.toNumber(price).toFixed(2),7)+'```' },
  item_quantity({ quantity }){ return _.padStart(_.toNumber(quantity),2,'0') },
  item_total({ amount }){ return '```=' + _.padStart('``` *'+_.toNumber(amount).toFixed(2)+'*',12) },
  price_detail({ price,quantity,amount }){
    return '```@  '
      + _.padEnd(_.toNumber(price).toFixed(2),7)
      + 'x '
      + _.padStart(_.toNumber(quantity),2,'0')
      + ' ='
      + _.padStart('``` *' +_.toNumber(amount).toFixed(2)+'* ',15)
  },
  order_note({ note }){ return (note) ? "```--------------------```\n_" +_.trim(note)+ "_\n```--------------------```" : ''; }
}
