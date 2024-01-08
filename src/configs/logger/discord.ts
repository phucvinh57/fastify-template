import { envs } from '@configs/env';
import { WebhookClient } from 'discord.js';
import moment from 'moment-timezone';
import build from 'pino-abstract-transport';

export default function (options: DiscordLogOptions) {
    const threadId = options.threadId;

    const webhookClient = new WebhookClient({
        url: options.webhookUrl
    });

    const fields = options.ignore ? options.ignore.split(',') : null;
    const ignoreFields = fields && fields.length > 0 ? fields.map((field) => field.trim()) : null;

    return build(async function (source) {
        for await (const obj of source) {
            const level = obj.level;
            let levelName: LogLevel;
            if (level === 60) levelName = 'FATAL';
            else if (level === 50) levelName = 'ERROR';
            else if (level === 40) levelName = 'WARN';
            else if (level === 30) levelName = 'INFO';
            else if (level === 20) levelName = 'DEBUG';
            else levelName = 'TRACE';

            if (ignoreFields) ignoreFields.forEach((field) => delete obj[field]);
            const time = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss DD/MM/YYYY');
            const payload = JSON.stringify(obj, null, 2);

            const header = `🪲 [**${envs.NODE_ENV.toUpperCase()}**] [${levelName}] [${time}] 🪲\n`;
            const beginBody = '```bash\n';
            const endBody = '\n```';
            if (payload.length > 1800) {
                // Split message
                const subMessages: string[] = [];
                let i = 0;
                while (i * 1800 < payload.length) {
                    subMessages.push(payload.substring(i * 1800, (i + 1) * 1800));
                    i++;
                }
                for (const message of subMessages) {
                    try {
                        await webhookClient.send({
                            threadId,
                            content: header + beginBody + message + endBody
                        });
                    } catch (e) {
                        // Do nothing
                    }
                }
            } else {
                webhookClient
                    .send({
                        threadId,
                        content: header + beginBody + payload + endBody
                    })
                    .catch(() => {
                        // Do nothing
                    });
            }
        }
    });
}
