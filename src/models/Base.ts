import databaseConnect from "../database/index";
import {PostType} from "./Post";


export default class Base {
  static getPost(sql: string, ...args: any){
    return new Promise(async function (resolve, reject){
      let db: any
      try {
        db = await databaseConnect()
        db.get(sql, ...args, (err: any, result: PostType | null) => {
          if(err != null){
            reject(err)
          } else if (err == null && result){
            resolve(result)
          } else if (result){
            resolve(result)
          } else {
            reject(err)
          }
        })
      } catch (ex){
        console.log(ex, "SSSSSSSS")
        reject(ex)
      } finally {
        db && db.shutdown()
      }
    })
  }
}