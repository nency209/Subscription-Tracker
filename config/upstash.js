import {clent as WorkflowClient } from "@upstash/workflow";

import { QSTASH_TOKEN,QSTASH_URL } from "./env.JS";

export const workflowclient=new WorkflowClient({
  baseUrl:QSTASH_URL,
  TOKEN:QSTASH_TOKEN
})