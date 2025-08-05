import Subscription from '../models/subscription.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const subscription = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/workflow/reminder`,
      body: {
        subscriptionId: subscriptions._id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: { subscriptions, workflowRunId },
    });
  } catch (error) {
    next(error);
  }
};

export const getusersubscription = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id)  {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
