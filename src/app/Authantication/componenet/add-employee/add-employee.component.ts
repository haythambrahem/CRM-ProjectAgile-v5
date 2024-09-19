import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { GlobalConstants } from 'src/app/shared/global-constant';



export interface AddUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
}


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  constructor(private userService: UserService,) {
    
  }


  request: AddUserRequest = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
  }


  



  private validateString(regexStr: string, inputStr: string): boolean {
    try {
        const pattern = new RegExp(regexStr);
        return pattern.test(inputStr);
    } catch (error) {
        console.error("Invalid regular expression:", error);
        return false;
    }
  }
  


  private verifyData(): boolean {
    console.log(this.request)
    console.log(this.validateString(GlobalConstants.nameRegex, this.request.firstName))
    if (this.validateString(GlobalConstants.nameRegex, this.request.firstName) && this.validateString(GlobalConstants.nameRegex, this.request.lastName)) {
      return true
    }
    
    return false
  }





  addUser(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    if (!(this.verifyData())) {
      console.log("error")
      return
    }
    this.userService.addEmployee(this.request).subscribe({
      next: payload => {
        console.log("success")
        console.log(payload)
      },
      error: err => {
        console.log(err)
      }
    })
  }









}
