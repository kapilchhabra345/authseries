import { Employee } from './../appModels/emplyeee.Model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'config';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

api = config.API_URL;

constructor(private http:HttpClient,
              private _authService:AuthService) { }


saveData(data){
  //console.log(data);
  return this.http.post(this.api+'/empData2.json', data)
}


fetchData(){
 
    return this.http.get<Employee>(`${this.api}/empData2.json`).pipe(
      map(resData=>{
        const userArray = [];
        for(const key in resData){
          if(resData.hasOwnProperty(key)){
            userArray.push({userId:key,...resData[key]})
          }
        }
        return userArray
      })
    )
  }
}




// fetchData(){
//   return this._authService.user.pipe(
//   take(1),
//   exhaustMap(user=>{
//     return this.http.get<Employee>(`${this.api}/empData2.json`,{
//       params: new HttpParams().set('auth', user.token)
//         })
//   }),
//   map(resData=>{
//     const userArray = [];
//     for(const key in resData){
//       if(resData.hasOwnProperty(key)){
//         userArray.push({userId:key,...resData[key]})
//       }
//     }
//     return userArray
//   })
// )
// }
// }




//   fetchData(){
//  return this.http.get<Employee>(`${this.api}/empData2.json`)
//     .pipe(map(resData=>{  
//           const userArray = [];
//           for(const key in resData){
//                  if(resData.hasOwnProperty(key)){
//                    userArray.push({userId:key, ...resData[key]})
//                  }
//           }
//           return userArray
//         })
//       )
// }


// fetchSingleEmployee(id){
  //   return this.http.get<Employee>(`${this.api}/empData2/${id}.json`)
  // }

// deleteEmployee(userId){
//   if(confirm('Do you want to delete this user')){
//     console.log(userId);
//     return this.http.delete(`${this.api}/empData2/${userId}.json`);
//   }
// }

// empData = [
//   {id: 1, name: 'kapil', destination: 'Frontend', dept: 'Developer', status: 'Active'},
//   {id: 2, name: 'Sonu', destination: 'Frontend', dept: 'Developer', status: 'Active'},
//   {id: 3, name: 'kapil', destination: 'Frontend', dept: 'Developer', status: 'Active'},
//   {id: 4, name: 'Mohan', destination: 'Frontend', dept: 'Developer', status: 'Active'},
//   {id: 5, name: 'kapil', destination: 'Frontend', dept: 'Developer', status: 'Active'},
//   {id: 6, name: 'Rahul', destination: 'Frontend', dept: 'Developer', status: 'Active'}
// ];




