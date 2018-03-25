import { Component } from '@angular/core';
import { NavController,ToastController,reorderArray, AlertController } from 'ionic-angular';
import {TodoProvider} from '../../providers/todo/todo';
import {ArchivedTodosPage} from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos=[];
  public reorderIsEnabled=false;
  public archivedTodosPage=ArchivedTodosPage;


  constructor(private toastController:ToastController,public navCtrl: NavController,private alertController:AlertController,private todoProvider:TodoProvider ) {
  this.todos=todoProvider.getTodos();
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReorder($event){
    reorderArray(this.todos,$event);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodoItem(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);

  }

  editTodoItem(todoIndex){
    let editTodoAlert= this.alertController.create({
      title: "Edit a Todo",
      message: "Edit Your Todo",
      inputs:[{
        type: "text",
        name: "editTodoInput",
        value: this.todos[todoIndex]
      }],
      buttons: [{
        text: "Cancel"
      },
    {
      text: "Edit Todo",
      handler: (inputData)=>{
        let todoText =inputData.editTodoInput;
        this.todoProvider.editTodo(todoText,todoIndex);

        editTodoAlert.onDidDismiss(()=>{
          let editTodoToast =this.toastController.create({
            message: "Todo Edited",
            duration: 2000
          });
          editTodoToast.present();

        });

      }
    }]
    });
    editTodoAlert.present();

  }

  openTodoAlert(){
    let addTodoAlert=this.alertController.create({
    title:"Add a Todo",
    message:"Enter your Todo",
    inputs:[{
      type:"text",
      name:"addTodoInput"
    }],
    buttons:[{
      text:"Cancel"
    },
  {
    text:"Add Todo",
    handler:(inputData)=>{
      let todoText;
      todoText=inputData.addTodoInput;
      this.todoProvider.addTodos(todoText);

      addTodoAlert.onDidDismiss(()=>{
        let addTodoToast = this.toastController.create({
          message: "Todo Added",
          duration: 2000,
          
        });
        addTodoToast.present();

      });

      
    }
  }]    

    });
    addTodoAlert.present();
  }

}
