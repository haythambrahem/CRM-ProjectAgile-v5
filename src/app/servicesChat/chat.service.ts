import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../modelsChat/chat';
import { Message } from '../modelsChat/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = "http://localhost:8089";

  constructor(private httpClient: HttpClient) { }


  updateChat(message: Message, chatId: any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/chats/message/" + `${chatId}`, message);
  }

  getChatById(chatId: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/" + chatId)
  }

  addMessageToChatRoom(message: Message): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/chats/add/message1", message);
  }

  getAllMessagesByChatId(chatId: any) {
    return this.httpClient.get<Message[]>(this.baseUrl + "/chats/all/messages/from/chat/" + chatId)
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/chats/add", chat);
  }

  
  
    getChatByFirstUserNameAndSecondUserName(firstUserName: String, secondUserName: String) {
     return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstUserNameAndSecondUserName" + '?firstUserName=' + firstUserName + '&secondUserName=' + secondUserName)
   } 
  /* getChatByFirstUserNameAndSecondUserName(firstUserName: string, secondUserName: string) {
    const url = `${this.baseUrl}/chats/getChatByFirstUserNameAndSecondUserName`;
    const params = new HttpParams()
      .set('firstUserName', firstUserName)
      .set('secondUserName', secondUserName);
  
    return this.httpClient.get<Chat>(url, { params });
  } */
  

  getChatByFirstUserNameOrSecondUserName(username: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstUserNameOrSecondUserName/" + username)
  }

}