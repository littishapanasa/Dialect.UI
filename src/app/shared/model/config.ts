export interface TopBarInfo {
    title: string;
    status: boolean;
    disable:boolean;
  }

export interface event {
  eventId:number;
  eventType:string;
}

export interface localUser {
  id: number
  first_name: string
  last_name: string
  email: string
}

export interface nextUser{
  user_id:number
  event_id:number
  event_type:string
}

export interface submissionList {
count: number
next: any
previous: any
results: Result[]
}

export interface Result {
id: number
event_id: string
event_type: string
data_created_at: string
wrapup_on: any
completed_on: any
start_on: any
is_sent_to_cx_advisor: boolean
is_accepted: number
accept_time_frame: string
submission_status: number
user: number
}

export interface SvlResult {
accepted_percent: number
total_submissions_received: number
expired_submissions: number
inprogress_submissions: number
completed_submissions: number
}