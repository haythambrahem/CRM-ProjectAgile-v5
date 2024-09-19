import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from '../modelsChat/chat';
import { Message } from '../modelsChat/message';
import { ChatService } from '../servicesChat/chat.service';
import { UserService } from '../Authantication/service/user.service';

interface User {
  id: number | null;
    email: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: User[] = []
   //public users: any= [];
  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  // chatId: number = 22;
  public messageList: any = [];
  public chatList: any = [];
  replymessage: String = "checking";
  public chatData: any;
  msg = "Good work";
  chatId: any = sessionStorage.getItem('chatId');
  color = "";
  secondUserName = "";
  check = sessionStorage.getItem('username');
  timesRun = 0;
  timesRun2 = 0;


  firstUserName = sessionStorage.getItem('username');
  senderEmail = sessionStorage.getItem('username');
  senderCheck = sessionStorage.getItem('username');

  request = {
    page: 0,
    size: 10, 
    criteria: "firstName",
    direction: "asc",
    searchTerm: "",
  }

  constructor(
    private chatService: ChatService, 
    private router: Router, 
    private service: UserService,
    private cdref: ChangeDetectorRef) {

    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  searchAllUsers() {
  this.service.searchAllUserss()
 
}
fetchUsers(): void {
  console.log('Fetching users...');
  this.service.searchAllUsers(this.request).subscribe({
    next: (payload: {
      content: User[],  totalPage: number, totalElements: number, pageNumber: number }) => {
      console.log('Users fetched:', payload.content);
      this.users = payload.content;
    },
    error: error => {
      console.error('Error fetching users:', error);
    }
  });
}
  ngOnInit(): void {
    this.fetchUsers();
  
    // Fetch chat data and set chatId in sessionStorage
    setInterval(() => {
      const chatId = sessionStorage.getItem('chatId');
      if (chatId) {
        this.chatService.getChatById(chatId).subscribe(data => {
          this.chatData = data;
          this.secondUserName = this.chatData.secondUserName;
          this.firstUserName = this.chatData.firstUserName;
  
          this.chatService.getAllMessagesByChatId(chatId).subscribe(data => {
            this.chatData = data;
            this.messageList = this.chatData;
            this.searchAllUsers();
          });
        });
      } else {
        console.error('No chatId found in sessionStorage.');
      }
    }, 1000);
  
    // Fetch chat list based on logged-in user's email
    let getByname = setInterval(() => {
      let email = sessionStorage.getItem('username');
      if (email) {
        this.chatService.getChatByFirstUserNameOrSecondUserName(email).subscribe(data => {
          this.chatData = data;
          this.chatList = this.chatData;
        });
      } else {
        console.error('No email found in session storage.');
        clearInterval(getByname);
      }
  
      this.timesRun2 += 1;
      if (this.timesRun2 === 2) {
        clearInterval(getByname);
      }
    }, 1000);
  
    // Fetch all users
    let all = setInterval(() => {
      this.service.searchAllUserss().subscribe((data) => {
        console.log(data);
        this.users = data;
      });
  
      this.timesRun += 1;
      if (this.timesRun === 2) {
        clearInterval(all);
      }
    }, 1000);
  }
  
  loadChatByEmail(event: string, event1: string) { 
    console.log(event1, event);
    // For removing the previous chatId
    sessionStorage.removeItem("chatId");

    // For checking the chat room by both the emails , if there is present then it will give the chat Id in sessionStorage
    this.chatService.getChatByFirstUserNameAndSecondUserName(event1, event).subscribe(data => {
       console.log(data);
      this.chatData = data;
      this.chatId = this.chatData[0].chatId;
      console.log(this.chatId);
      sessionStorage.setItem('chatId', this.chatId)


      setInterval(() => {
        this.chatService.getChatById(this.chatId).subscribe(data => {
          this.chatData = data;
          this.secondUserName = this.chatData.secondUserName;
          this.firstUserName = this.chatData.firstUserName;
          
          this.chatService.getAllMessagesByChatId(this.chatId).subscribe(data => {
            console.log(data);
            this.chatData = data;
            this.messageList = this.chatData;
            console.log("#######################");

            console.log(this.messageList);

          });
        });
      }, 1000)

    });

  }

  sendMessage() {
    console.log(this.chatForm.value);

    // This will call the update chat method whenever the user sends the message
    this.messageObj.replymessage = this.chatForm.value.replymessage;

    // Check if senderEmail is not null before assigning it
    if (this.senderEmail !== null) {
        this.messageObj.senderEmail = this.senderEmail;
    } else {
        console.error('Sender email is null'); // Log an error message
        return; // Exit the function or handle the error appropriately
    }

    this.chatObj.chatId = this.chatId;
    this.messageObj.chatId = this.chatId;
    console.log(this.messageObj);

    this.chatService.addMessageToChatRoom(this.messageObj).subscribe(data => {
        console.log(data);
        this.chatForm.reset();

        // For displaying the messageList by the chatId
        this.chatService.getAllMessagesByChatId(this.chatId).subscribe(data => {
            console.log(data);
            this.chatData = data;
            this.messageList = this.chatData.messageList;
            this.secondUserName = this.chatData.secondUserName;
            this.firstUserName = this.chatData.firstUserName;
        });
    });
}


  routeX() {
    // this.router.navigateByUrl('/navbar/recommendation-service');
    sessionStorage.clear();
    // window.location.reload();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }


  goToChat(email: any) {
    const storedUsername: string = sessionStorage.getItem("username") ?? ""; // Use an empty string if sessionStorage returns null
  
    this.chatService.getChatByFirstUserNameAndSecondUserName(email, storedUsername).subscribe(
      (data) => {
        this.chatData = data;
        this.chatId = this.chatData[0].chatId;
        sessionStorage.setItem("chatId", this.chatId);
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = storedUsername; // Use the storedUsername variable
          this.chatObj.secondUserName = email;
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