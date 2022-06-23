import { Song } from "./song.model";

export class Question{
    constructor(
        public questionTitle: string,
        public song: Song,
        public answerOne: string,
        public answerTwo: string,
        public answerThree: string,
        public answerFour: string,
        public correctAnswer: number 
        ){

    }
}