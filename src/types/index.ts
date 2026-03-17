export type Platform = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'freebsd' | 'dragonfly' | 'netbsd' | 'openbsd' | 'solaris' | string;

export type AudioFormat = 'mp3' | 'wav' | 'ogg' | 'flac' | 'aac' | 'wma' | 'm4a' | 'ape' | 'aiff' | 'au' | 'mid' | 'midi' | 'mp2' | 'mpa' | 'mpga';
export type VideoFormat = 'mp4' | 'avi' | 'mkv' | 'mov' | 'wmv' | 'flv' | 'webm';
export type MediaFormat = AudioFormat | VideoFormat;
export type FormatType = 'audio' | 'video';

export interface ConvertForm {
  filePath: string | null;
  format: string | null;
  outPath: string | null;
  formatType: FormatType;
  isAugment: boolean;
  augment: string;
  isConverting: boolean;
}

export interface SettingForm {
  inputFile: string;
  outputFile: string;
  videoCodec: string;
  audioCodec: string;
  resolution: string;
  audioSampleRate: string;
  audioBitrate: string;
  bitrate: string;
  framerate: string;
}

export interface WindowOptions {
  label: string;
  url: string;
  title: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizable?: boolean;
  x?: number;
  y?: number;
  center?: boolean;
  alwaysOnTop?: boolean;
  fullscreen?: boolean;
  decorations?: boolean;
  skipTaskbar?: boolean;
  contentProtected?: boolean;
  focus?: boolean;
  visible?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  transparent?: boolean;
  onDestroyed?: (e: unknown) => void;
  onCreated?: () => void;
  onError?: (e: unknown) => void;
}

export interface AppFormData {
  filePath: string | null;
  format: string | null;
  outPath: string | null;
  formatType: FormatType;
  isAugment: boolean;
  augment: string;
}

export interface FfmpegValidationResult {
  valid: boolean;
  errors: string[];
  command: string;
}
