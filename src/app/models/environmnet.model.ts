import { FirebaseOptions } from "@angular/fire/app";

export interface Environment {
  environment: environment;
  firebaseConfig: FirebaseOptions
}

export type environment = "production" | "development"

