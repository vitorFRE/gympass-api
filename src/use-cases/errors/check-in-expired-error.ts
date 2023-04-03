export class CheckInExpiredError extends Error {
  constructor() {
    super('Check-in expired, only 20 minutes are allowed')
  }
}