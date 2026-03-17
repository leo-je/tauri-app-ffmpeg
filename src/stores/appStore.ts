import { createStore, type Store } from '@tauri-apps/plugin-store';
import type { AppFormData, SettingForm } from '../types';

let storeInstance: Store | null = null;
let initPromise: Promise<Store> | null = null;

async function getStore(): Promise<Store> {
  if (storeInstance) return storeInstance;
  if (!initPromise) {
    initPromise = createStore('store.json').then((s: Store) => {
      storeInstance = s;
      return s;
    });
  }
  return initPromise;
}

export async function saveFormData(form: AppFormData): Promise<void> {
  const store = await getStore();
  await store.set('form', {
    filePath: form.filePath,
    format: form.format,
    outPath: form.outPath,
    formatType: form.formatType,
    isAugment: form.isAugment,
    augment: form.augment,
  });
  await store.save();
}

export async function loadFormData(): Promise<AppFormData | null> {
  const store = await getStore();
  const data = await store.get<AppFormData>('form');
  return data ?? null;
}

export async function saveSettingsForm(form: SettingForm): Promise<void> {
  const store = await getStore();
  await store.set('settings', { ...form });
  await store.save();
}

export async function loadSettingsForm(): Promise<SettingForm | null> {
  const store = await getStore();
  const data = await store.get<SettingForm>('settings');
  return data ?? null;
}

export async function saveFfmpegArgs(args: string): Promise<void> {
  const store = await getStore();
  await store.set('ffmpegArgs', args);
  await store.save();
}

export async function loadFfmpegArgs(): Promise<string> {
  const store = await getStore();
  const args = await store.get<string>('ffmpegArgs');
  return args ?? '-b:a 320k -ar 48000';
}
