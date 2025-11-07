
export interface Zikr {
  id: number;
  arabic_text: string;
  repetitions: number;
  source: string;
}

export interface AzkarCategory {
  title: string;
  data: Zikr[];
}
