import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SmsService {
  private logger = new Logger(SmsService.name);
  private readonly apiSmsKey = process.env.API_SMS_KEY;
  private readonly phoneNumber = process.env.MOB_NUMBER;
  private readonly sender = process.env.SENDER;

  async sendSms(message: string): Promise<void> {
    const url = 'https://5yl1lx.api.infobip.com/sms/2/text/advanced';
    const headers = new Headers();
    headers.append('Authorization', `App ${this.apiSmsKey}`);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const payload = JSON.stringify({
      messages: [
        {
          destinations: [{ to: this.phoneNumber }],
          from: this.sender,
          text: message,
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: payload,
      redirect: 'follow' as RequestRedirect,
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const result = await response.text();
        this.logger.log('Infobip API response:', result);
      } else {
        this.logger.error(
          'Failed to send SMS via Infobip:',
          response.statusText,
        );
      }
    } catch (error) {
      this.logger.error('Error sending SMS via Infobip:', error);
      throw error;
    }
  }
}
