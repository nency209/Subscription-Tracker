import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../models/supscription";
// import SERVAR_URL  from "../config/env.JS";
const require = createRequire(import.meta.url);
const reminders = [7, 5, 2, 1];

const { serve } = require("@upstash/workflow/express");
export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status != 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `renewal data has passed for subscription ${subscriptionId}.stopping workflow`
    );
  }

  for (const dayBefore of reminders) {
    const reminderDate = renewalDate.subtract(dayBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepuntilreminder(
        context,
        `Reminder ${dayBefore} days before `,
        reminderDate
      );
    }

    // await workflowclient.trigger({
    //   url:`${SERVAR_URL}`
    // })
    await triggerreminder(context, `Reminder ${dayBefore} days before`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepuntilreminder = async (context, label, date) => {
  console.log(`sleeping untill ${label} reminder at ${date}`);
  await context.sleepUntill(label, date.todate());
};

const triggerreminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`triggering ${label} reminder`);
  });
};
