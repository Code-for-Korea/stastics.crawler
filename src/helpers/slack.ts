import axios from 'axios';
import config from '../config';

class SlackHelper {
  requestData = async (endpoint: string, params: any = {}) => {
    const result = await axios.get(
      `${config.services.slack.baseUrl}/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${config.services.slack.token}`,
        },
        params: params,
      }
    );

    if (!result.data.ok) return false;

    return result.data;
  };
}

export default new SlackHelper();
