export const personDetailArray: any[] = require("../tmp/aozora_json_scrape/person_detail.json")
export const personDetail: any = {}
personDetailArray.forEach(e => {
  personDetail[e.id] = e
});


function groupByInitials(a: any[], k: string) {
  return a.reduce((obj, cur, i, src) => {
    const key: string = (cur[k] || "@").slice(0,1);
    (obj[key] || (obj[key] = []))!.push(cur);
    return obj
  }, {})
}
