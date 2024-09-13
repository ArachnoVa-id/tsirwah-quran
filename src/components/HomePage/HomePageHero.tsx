import dynamic from 'next/dynamic';
import Head from 'next/head';

// import DailyReminder from './DailyReminder';
import styles from './HomePageHero.module.scss';
import QuickLinks from './QuickLinks';

import CommandBarTrigger from '@/components/CommandBar/CommandBarTrigger';

const PlayRadioButton = dynamic(() => import('./PlayRadioButton'));

const HomePageHero = () => {
  return (
    <div className={styles.outerContainer}>
      <Head>
        <link rel="preload" as="image" href="/images/tsirwah-bg.png" />
      </Head>
      <div className={styles.backgroundImage} />
      <div data-theme="light">
        <PlayRadioButton />
        <div className={styles.innerContainer}>
          {/* <DailyReminder /> */}
          <CommandBarTrigger />
          <div className={styles.quickLinksContainer}>
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePageHero;
