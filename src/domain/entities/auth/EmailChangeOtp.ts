export interface EmailChangeOtpProps {
  userId: string;
  newEmail: string;
  otpHash: string;
  attempts: number;
  // requestTimeStamps: Date[];
  expiresAt: Date;
  createdAt?: Date;
}

export class EmailChangeOtp {
  private _props: EmailChangeOtpProps;

  constructor(props: EmailChangeOtpProps) {
    // Default attempts to 0 if not provided
    this._props = {
      ...props,
      attempts: props.attempts ?? 0,
    };
  }

  // ======= GETTERS =======
  get userId() {
    return this._props.userId;
  }
  get newEmail() {
    return this._props.newEmail;
  }
  get otpHash() {
    return this._props.otpHash;
  }
  get attempts() {
    return this._props.attempts;
  }
  get expiresAt() {
    return this._props.expiresAt;
  }

  // ======= COMPUTED PROPERTIES =======
  get isExpired(): boolean {
    return new Date() > this._props.expiresAt;
  }

  get hasTooManyAttempts(): boolean {
    const MAX_ATTEMPTS = 3;
    return this._props.attempts >= MAX_ATTEMPTS;
  }

  get isValid(): boolean {
    return !this.isExpired && !this.hasTooManyAttempts;
  }

  // ======= ACTIONS (Domain Logic) =======

  /**
   * Increases the attempt counter when a user enters the wrong OTP.
   */
  incrementAttempts() {
    this._props.attempts += 1;
  }

  /**
   * Extends the expiry time (useful if you want to allow a "resend"
   * without creating a totally new record)
   */
  extendExpiry(minutes: number = 15) {
    const newDate = new Date();
    newDate.setMinutes(newDate.getMinutes() + minutes);
    this._props.expiresAt = newDate;
  }

  // ======= SETTERS (Optional) =======
  setNewEmail(email: string) {
    this._props.newEmail = email;
  }

  setOtpHash(hash: string) {
    this._props.otpHash = hash;
    this._props.attempts = 0; // Reset attempts for a new OTP
  }

  public toJSON() {
    return { ...this._props };
  }
}
