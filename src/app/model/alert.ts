export interface AlertResponse {
  type: string // "FeatureCollection"
  features: AlertFeature[]
  title: string
  updated: string // ISO date string
}

export interface AlertFeature {
  id: string
  type: "Feature"
  properties: AlertProperties
}

export type AlertSeverity = "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown"
export const severityOrder: Record<AlertSeverity, number> = {
  Extreme: 0,
  Severe: 1,
  Moderate: 2,
  Minor: 3,
  Unknown: 4,
};

export interface AlertProperties {
  id: string
  areaDesc: string
  geocode: {
    SAME: string[]
    UGC: string[]
  }
  affectedZones: string[]
  sent: string
  effective: string
  onset: string | null
  expires: string
  ends: string | null
  status: "Actual" | "Exercise" | "System" | "Test" | "Draft"
  messageType: "Alert" | "Update" | "Cancel"
  category: string
  severity: AlertSeverity
  certainty: "Observed" | "Likely" | "Possible" | "Unlikely" | "Unknown"
  urgency: "Immediate" | "Expected" | "Future" | "Past" | "Unknown"
  event: string
  sender: string
  senderName: string
  headline?: string
  description: string
  instruction: string
  response: string
  parameters?: {
    [key: string]: string[] // e.g. NWSheadline, VTEC, etc.
  }
}

export enum Filter {
  event = "event",
  severity = "severity",
  area = "area",
  effectiveDate = "effectiveDate",
  expiryDate = "expiryDate",
  headline = "headline",
  default = ""
}