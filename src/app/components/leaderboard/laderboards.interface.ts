export class LeaderBoard {
    isActive: boolean;
    members: Member[];
  }

export  class Member {
    rank:number;
    name: string;
    points: number;
    picture: string;
    progress?: number;
  }