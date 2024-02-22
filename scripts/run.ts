/* eslint-disable consistent-return */
import signale from 'signale';

interface RunMessages {
  info: string;
  success: string;
  error: string;
}

export async function run<T>(
  script: Promise<T>,
  messages: RunMessages,
  onError?: () => Promise<void>
) {
  signale.info(messages.info);
  try {
    const response = await script;
    signale.success(messages.success);
    return response;
  } catch (err) {
    signale.error(messages.error);
    signale.error(err);

    if (onError) {
      await onError();
    }

    process.exit(1);
  }
}
