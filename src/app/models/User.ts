export class User {
  userName: string;
  email: string;
  mobile: string;
  userConfiguration: {
    max_weather: number;
    notificationMode: {
      sms: boolean;
      email: boolean;
      application: boolean;
    }
  }
}
