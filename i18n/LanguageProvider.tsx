'use client'; // This is a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const router = useRouter();
  const [locale, setLocale] = useState<'ar' | 'he' | 'en' | null>(null);

  useEffect(() => {
    // قراءة اللغة من localStorage عند التبديل
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      setLocale(storedLocale as 'ar' | 'he' | 'en');
    } else {
      setLocale('en'); // fallback إلى اللغة الافتراضية
    }
  }, []);

  useEffect(() => {
    // إذا تم تغيير اللغة، نقوم بتحديث URL
    if (locale) {
      // تحديث المسار ليشمل اللغة المختارة
      const currentPath = window.location.pathname.split('/').slice(1).join('/');
      router.push(`/${locale}/${currentPath}`);
    }
  }, [locale, router]);

  const toggleLocale = (newLocale: 'ar' | 'he' | 'en') => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale); // تخزين اللغة في localStorage
  };

  return (
    <>
      {/* يمكنك هنا إضافة زر للتبديل بين اللغات */}
      <button onClick={() => toggleLocale('ar')}>عربي</button>
      <button onClick={() => toggleLocale('he')}>עברית</button>
      <button onClick={() => toggleLocale('en')}>English</button>
      {children}
    </>
  );
};

export default LanguageProvider;
