import { BaseUser } from "../user.model";

export interface Note {
  Title: string;
  Description: string;
  Action_Path: string;
  Action_Type: number;
  image?:string;
  userid?:BaseUser|string;
}




export interface ActionType {
    id:number;
    option:string;
    text:string;
}
export interface qayedha_screeen{
    path:string;
    label:string;
}
