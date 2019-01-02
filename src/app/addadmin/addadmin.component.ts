import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../model/user';
import { AdminSevice } from '../services/admin.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss', '../../assets/css/animation-css.scss']
})
export class AddadminComponent implements OnInit {

  btnText: string = "Add user";
  headingText: string = "Add new user";

  adminForm: FormGroup;
  allUsers: Array<any> = [];
  editingMode: boolean = false;
  selectedUserId: number;
  showTick: boolean = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminSevice) { }

  ngOnInit() {
    this.getData();
    this.adminForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required]
    },
      {
        validator: this.confirmPasswordValidator
      });

  }
  /**
   * @function : getData
   * @description: Making a Service call to get all users
   */
  getData(): void {
    this.adminService.getAllAdmins().subscribe(data => {
      this.allUsers = data;
    });
  }

  /**
   * @function confirmPasswordValidator
   * @description Checked password and confirm password
   * @param form 
   */
  confirmPasswordValidator(form: FormGroup): Object | null {
    return form.controls['password'].value === form.controls['confirmPass'].value ? null : { mismatch: true };
  }

  /**
   * @function saveUser
   * @description Making a service call add new user or update existing user.
   * @param user 
   */
  saveUser(user: User) {
    delete user.confirmPass;
    if (this.btnText === "Add user") {

      this.adminService.addUser(user).subscribe(data => {
        this.adminForm.reset();
        this.getData();
        this.showSuccessAnimation();
      })
    } else {
      this.adminService.updateUserById(this.selectedUserId, user).subscribe(data => {
        this.adminForm.reset();
        this.getData();
        this.cancel();

        this.showSuccessAnimation();

      })
    }
  }

  /**
   * @function selectedUser
   * @description Setting the user detail to the admin form 
   * @param user 
   */
  selectedUser(user: User) {
    this.editingMode = true;
    this.btnText = "Update user";
    this.headingText = "Update user";
    this.adminForm.controls['firstName'].setValue(user.firstName);
    this.adminForm.controls['lastName'].setValue(user.lastName);
    this.adminForm.controls['email'].setValue(user.email);
    this.adminForm.controls['password'].setValue(user.password);
    this.adminForm.controls['confirmPass'].setValue(user.password);
    this.adminForm.controls['role'].setValue(user.role);
    this.selectedUserId = user.id;
  }

  /**
   * @function cancel
   * @description If  user don't want to update then cancel the updated form
   */
  cancel() {
    this.editingMode = false;
    this.btnText = "Add user";
    this.headingText = "Add new user";
    this.adminForm.reset();
    this.getData();
  }

  /**
   * @function deleteUser
   * @description Making a service call to delete selected user
   */
  deleteUser() {
    this.adminService.deleteUserById(this.selectedUserId).subscribe(data => {
      this.showSuccessAnimation();
      this.cancel();
    })
  }

  /**
   * @function showSuccessAnimation
   * @description Showing animation on Success
   */
  showSuccessAnimation() {
    this.showTick = true;
    setTimeout(() => {
      this.showTick = false;
    }, 3000);
  }
}
