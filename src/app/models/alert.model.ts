export type alertType = "info" | "success" | "danger" | "warning"

export interface Alert {
  id:string,
  type:alertType,
  message:string
}
