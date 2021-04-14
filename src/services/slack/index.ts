import config from '../../config';
import slack from '../../helpers/slack';

class Slack {
  retrieveInformation = async () => {
    return {
      currentUsersCount: await this.getUsersCount(),
      latestAnnouncement: await this.getLatestAnnouncement(),
      channelsList: await this.getChannels(),
    };
  };

  private getLatestAnnouncement = async () => {
    let article = await slack.requestData('conversations.history', {
      channel: config.services.slack.channels.announcement,
    });

    article = article.messages[0];

    const author = await slack.requestData('users.info', {
      user: article.user,
    });

    article.user = author.user;

    return {
      body: article.text,
      user: article.user.real_name,
      profile: article.user.profile.image_original,
      createdAt: parseInt(article.ts.split('.')[0]),
    };
  };

  private getUsersCount = async () => {
    const result = await slack.requestData('users.list');

    return result.members.length;
  };

  private getChannels = async () => {
    const result = await slack.requestData('conversations.list');

    return result.channels
      .filter((channel: any) => {
        if (channel.is_archived) return false;
        return true;
      })
      .map((channel: any) => {
        return {
          name: channel.name,
          topic: channel.topic.value,
          purpose: channel.purpose.value,
          usersCount: channel.num_members,
          createdAt: channel.created,
        };
      });
  };
}

export default new Slack();
