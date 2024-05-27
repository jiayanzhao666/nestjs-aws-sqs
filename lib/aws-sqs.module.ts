import { DynamicModule, Module, Global } from "@nestjs/common";
import { AWSSQSService } from "./aws-sqs.service";
import {
  SQSClient,
  SQSClientConfig,
  SendMessageCommandInput,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";
import { AWS_SQS_MODULE_CONFIG } from "./aws-sqs.constant";
// import { TencentCloudCosConfig } from "./interfaces/tencent-cloud-cos-config.interface";
// import { TENCENTCLOUD_COS_MODULE_CONFIG } from "./tencent-cloud-cos.constant";
// import { TencentCloudCosService } from "./tencent-cloud-cos.service";

@Global()
@Module({
  providers: [AWSSQSService],
  exports: [AWSSQSService],
})
export class TencentCloudCOSModule {
  public static withConfig(config: SQSClientConfig): DynamicModule {
    return {
      module: TencentCloudCOSModule,
      providers: [{ provide: AWS_SQS_MODULE_CONFIG, useValue: config }],
    };
  }
}
