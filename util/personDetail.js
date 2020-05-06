export const personDetailArray = require("../tmp/aozora_json_scrape/person_detail.json")
export const personDetail = {}
personDetailArray.forEach(e => {
  personDetail[e.id] = e
});


function groupByInitials(a, k) {
  return a.reduce((obj, cur, i, src) => {
    const key = (cur[k] || "@").slice(0,1);
    (obj[key] || (obj[key] = [])).push(cur);
    return obj
  }, {})
}
