import { Component } from '@angular/core';
import { empdata } from './empdata'
import { emplist } from './emplist'
import Axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }

  emps: emplist[] = [];
  empdat: empdata={emp_id:null,emp_name:null};
  empupdate:emplist={emp_id:null,emp_name:null,_id:null}
  flag:number = 1;

  LoadPage(){
    this.empdat.emp_id = null;
    this.empdat.emp_name=null;
    this.empupdate = null;
    const thistemp = this;
    Axios.get('http://localhost:5000/emp-list')
        .then(
          function(res){
            thistemp.emps = res.data
            console.log(thistemp.emps)
          },
          function(error){
            console.log(error);
          }
        )
  }

  ngOnInit() {
    this.LoadPage()
  }

  editData(emp){
    this.empupdate = emp
    this.flag=0;
    this.empdat.emp_id = emp.emp_id;
    this.empdat.emp_name = emp.emp_name;

  }

  deleteData(emp){
    console.log(emp);
    const thistemp = this;
    const url = 'http://localhost:5000/delete'
    Axios.put(url,emp)
    .then(
      function(res){
        thistemp.LoadPage()
        console.log(res)
      },
      function(error){
        console.log(error);
      }
    )
  
  }

  insertData() {
    if(this.flag==1){
        console.log(this.empdat);
        const thistemp = this;
        const url = 'http://localhost:5000/insert'
        Axios.put(url,this.empdat)
        .then(
          function(res){
            thistemp.LoadPage()
            console.log(res)

          },
          function(error){
            console.log(error);
          }
        )
    }

    if(this.flag==0){
      this.empupdate.emp_id = this.empdat.emp_id;
      this.empupdate.emp_name = this.empdat.emp_name;
      // console.log(this.empupdate);
      this.flag=1;
      const thistemp = this;
      const url = 'http://localhost:5000/update'
      Axios.put(url,this.empupdate)
        .then(
          function(res){
            thistemp.LoadPage()
            console.log(res)

          },
          function(error){
            console.log(error);
          }
        )
      }
  }
}
