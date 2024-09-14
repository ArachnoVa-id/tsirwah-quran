import Image from 'next/image';
// import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import styles from './NavbarLogoWrapper.module.scss';

import Link from '@/dls/Link/Link';
// import QuranTextLogo from '@/icons/quran-text-logo.svg';

const NavbarLogoWrapper = () => {
  // const { t } = useTranslation('common');
  const router = useRouter();
  return (
    <Link href="/" className={styles.logoWrapper} title="tsirwah-quran">
      {/* <QuranTextLogo /> */}
      {/* <TsirwahLogo /> */}
      <Image
        src={
          router.pathname === '/'
            ? '/images/logo/tsirwah-logo.png'
            : '/images/logo/tsirwah-logo-white.png'
        }
        alt="tsirwah-quran"
        width={120}
        height={40}
        quality={100}
      />
    </Link>
  );
};

export default NavbarLogoWrapper;

// change this
