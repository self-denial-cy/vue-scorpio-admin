import { ContentType } from '@/enum';

export async function transformRequestData(data: unknown, contentType?: string) {
  const transformedData = data; // application/json 不处理
  if (contentType === ContentType.formUrlencoded) {
    // TODO
  }
  return transformedData;
}
