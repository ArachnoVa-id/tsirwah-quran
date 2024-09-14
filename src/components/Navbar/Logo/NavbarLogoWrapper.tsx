import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

import styles from './NavbarLogoWrapper.module.scss';

import Link from '@/dls/Link/Link';
// import QuranTextLogo from '@/icons/quran-text-logo.svg';

const NavbarLogoWrapper = () => {
  const { t } = useTranslation('common');
  return (
    <Link href="/" className={styles.logoWrapper} title={t('quran-com')}>
      {/* <QuranTextLogo /> */}
      {/* <TsirwahLogo /> */}
      <Image
        src="/icons/tsirwah-logo.png"
        alt={t('quran-com')}
        width={120}
        height={40}
        quality={100}
      />
    </Link>
  );
};

export default NavbarLogoWrapper;

// change this
