import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommandInput,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";

// import { TENCENTCLOUD_COS_MODULE_CONFIG } from "./tencent-cloud-cos.constant";
// import { TencentCloudCosConfig, UploadedFileMetadata } from "./interfaces";

@Injectable()
export class AWSSQSService {
  private sqsClient: SQSClient;

  constructor(private readonly config: SQSClientConfig) {
    this.sqsClient = new SQSClient(config);
    Logger.log("AWS SQS module initialized!", "AWSSQSModule");
  }

  private getClient() {
    return this.sqsClient;
  }

  async sendMessage(queueUrl: string, messageBody: string): Promise<boolean> {
    const params: SendMessageCommandInput = {
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    };
    try {
      await this.getClient().send(new SendMessageCommand(params));
      Logger.log("Message sent successfully.");
      return true;
    } catch (err) {
      Logger.log("Error sending message:", err);
      return false;
    }
  }

  async sendJSONMessage(queueUrl, messageBody: Object): Promise<boolean> {
    return await this.sendMessage(queueUrl, JSON.stringify(messageBody));
  }
}
