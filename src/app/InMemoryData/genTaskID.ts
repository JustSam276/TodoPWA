
export class genClass{
  static choresList: any;

  generateTaskID(): string{

    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);

    return `T-${timestamp}${random}`;
  }

  generateUseID(): string{
    const random = Math.floor(Math.random() * 1000);
    const timestamp = Date.now();

    return `U${random}${timestamp}`
  }
}
