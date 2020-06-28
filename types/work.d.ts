export interface Work {
 title : {
   title: string
   title_kana: string
   subtitle?: string
   subtitle_kana?: string
   collection: string
   collection_kana: string
   person_name: string
   author_num: number
   work_id: number
   person_id: number
 }
 work: {
   bibclass: string
   first_appearance?: string
   work_note?: string
   kana_type: string
   note: string
 }
 author: Array<{
   role: string
   author_name: string
   author_num: number
   author_kana: string
   author_en: string
   born_on: string
   died_on: string
   author_note: string
 }>
 worker: {
   input: string
   proofread: string
 }
 original_book: Array<{
   booktype: string
   book_title: string
   publisher?: string
   first_edition?: string
   input_edition?: string
   proof_edition?: string
   note?: string
 }>
 download: Array<{
  filetype: string
  compresstype: string
  filename: string
  charset: string
  encoding: string
  size: number
  created_on: string
  updated_on: string
 }>
 site: Array<{
   site_name: string
   url: string
 }>
 copyright: boolean
}