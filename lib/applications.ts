import { applicationStore, handoffStore } from '@/lib/store';
import { HandoffRecord, StoredApplication } from '@/types/application';

export function createApplicationId(): string {
  return crypto.randomUUID();
}

export function saveApplication(application: StoredApplication): void {
  applicationStore.push(application);
}

export function saveHandoffRecord(record: HandoffRecord): void {
  handoffStore.push(record);
}