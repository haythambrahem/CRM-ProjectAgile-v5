import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../modelsChat/chat';
import { ChatService } from '../servicesChat/chat.service';
import { UserService } from '../Authantication/service/user.service';
//import { UserService } from '../authentication/service/user.service';
//import { UserService } from '../servicesChat/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public alluser: any = [];
  check = sessionStorage.getItem('username');
  chatId: any = 0;
  chatObj: Chat = new Chat();
  public chatData: any = [];

  constructor(private router: Router, private userService: UserService, private chatService: ChatService) { }

  ngOnInit(): void {
    let all = setInterval(() => {

      this.userService.searchAllUserss().subscribe((data) => {
        // console.log(data);
        this.alluser = data;
      })
    }, 1000);
  }


  goToChat(username: any) {
    const storedUsername: string = sessionStorage.getItem("username") ?? ""; // Use an empty string if sessionStorage returns null
  
    this.chatService.getChatByFirstUserNameAndSecondUserName(username, storedUsername).subscribe(
      (data) => {
        this.chatData = data;
        this.chatId = this.chatData[0].chatId;
        sessionStorage.setItem("chatId", this.chatId);
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = storedUsername; // Use the storedUsername variable
          this.chatObj.secondUserName = username;
          this.chatService.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              sessionStorage.setItem("chatId", this.chatData[0].chatId);
              // this.router.navigateByUrl('/chat');
              console.log("2")
            })
        } else {
          // this.router.navigateByUrl('/chat');
          console.log("3")
        }
      });
  }

}
