// 최적회관 폰트를 생성하고 사용하는 방법 : font.ts -> layout.tsx
import { Inter, Lusitana } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
  });