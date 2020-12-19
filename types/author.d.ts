export interface AuthorWork {
  work_id: number
  title: string
  subtitle?: string
  titleToDisplay?: string
  kana_type: string
  others: Array<{
    person_id: number
    person_name: string
    role: string
  }>
}
export interface Author {
  id: number
  name: string
  desc?: string
  alt_id: number
  alt_name: string
  name_kana: string
  name_en: string
  born_on: string
  died_on: string
  site_name: string
  site_url: string
  copyright: boolean
  work: Array<AuthorWork>
  wip: Array<AuthorWork>
}