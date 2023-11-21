type LogLevel = 'INFO' | 'WARN' | 'DEBUG' | 'ERROR' | 'FATAL';

type DiscordLogOptions = {
    webhookUrl: string;
    threadId?: string;
    ignore?: string;
};
