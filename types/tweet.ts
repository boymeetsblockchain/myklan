export type TweetProps={
    content:string,
    id:string | number,
    image?:string,
    createdAt?:string,
    user:UserProps
    numberOfComments?:number,
    numberOfRetweets?:number,
    numberOfLikes?:number,
    impressions?:number,
  }
  export type TweeterProps={
  tweet: TweetProps
  }
  
  export type UserProps ={
    id:string,
    name:string,
    image:string,
    username:string,
  }
  