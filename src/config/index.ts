export default {
  app: {},
  services: {
    slack: {
      baseUrl: 'https://slack.com/api',
      token: process.env.SLACK_TOKEN || '',
      channels: {
        announcement: process.env.SLACK_CHANNEL_ANNOUNCEMENTS || '',
      },
    },
  },
};
