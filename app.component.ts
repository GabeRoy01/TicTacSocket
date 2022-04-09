import {Component, OnInit} from '@angular/core';
import {TtsService} from "./tts.service";
import {Message} from "./message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board = new Array(3).fill(new Array(3).fill(-1));
  gameFinished = false;
  constructor(private ttsService: TtsService) {
  }

  placeTic(row: number, col: number) {
    if(this.board[row][col] < 0){
      this.ttsService.send({row, col});
    }
  }

  handleMessage(msg:Message){
    console.log(msg);

    this.board = msg.board;

    if(!msg.error){
      if(msg.finished){
        this.askToReplay();
      }
    }else{
      if(msg.finished){
        this.askToReplay();
      }
    }
  }

  askToReplay(){
    this.gameFinished = true;
  }

  tellReplay(){
    this.ttsService.send({row: -1, col: -1});
    this.gameFinished = false;
  }

  ngOnInit() {
    this.ttsService.connect();
    this.ttsService.incoming.subscribe((msg: any) => this.handleMessage(msg));
  }
}