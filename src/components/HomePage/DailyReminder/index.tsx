/* eslint-disable i18next/no-literal-string */
import React from 'react';

// import useTranslation from 'next-translate/useTranslation';

import styles from './DailyReminder.module.scss';
// import QuickLink from './Quotes';

import { isLoggedIn } from '@/utils/auth/login';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

const QUICK_LINKS = [
  {
    slug: 'about-the-quran',
    logKey: 'about-quran',
    key: 'about-quran',
  },
  {
    slug: 'surah-al-mulk',
    logKey: 'surah-al-mulk',
    key: 'mulk',
  },
  {
    slug: 'surah-ya-sin',
    logKey: 'surah-ya-sin',
    key: 'yaseen',
  },
  {
    slug: 'surah-al-kahf',
    logKey: 'surah-al-kahf',
    key: 'kahf',
  },
  {
    slug: 'surah-al-waqiah',
    logKey: 'surah-al-waqiah',
    key: 'waqiah',
  },
];

// TODO: this is temporary and needs to be updated.
if (isLoggedIn() && isProduction) {
  QUICK_LINKS.push({
    slug: 'collections/the-authority-and-importance-of-the-sunnah-clem7p7lf15921610rsdk4xzulfj',
    key: 'sunnah',
    logKey: 'sunnah_collection',
  });
}

const DailyReminder: React.FC = () => {
  //   const { t } = useTranslation('quick-links');

  return (
    <div className={styles.quoteContainer}>
      <div className={styles.arabicText}>
        إِنَّ اللَّهَ يَرْفَعُ بِهَذَا الْقُرْآنِ أَقْوَامًا وَيَضَعُ بِهِ آخَرِينَ
      </div>
      <div className={styles.translationText}>
        “Sesungguhnya Allah mengangkat derajat seseorang dengan kitab ini (Al Qur&apos;an) dan
        merendahkan yang lain dengan kitab ini.”{' '}
      </div>
      <div className={styles.reference}>(HR. Muslim no. 817, dari &apos;Umar bin Al Khattab)</div>
    </div>
  );
};

export default DailyReminder;
