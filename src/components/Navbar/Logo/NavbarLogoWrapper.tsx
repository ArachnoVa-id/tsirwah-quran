import Image from 'next/image';
// import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import styles from './NavbarLogoWrapper.module.scss';

import Link from '@/dls/Link/Link';
// import QuranTextLogo from '@/icons/quran-text-logo.svg';

const NavbarLogoWrapper = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <>
      {isHomePage && (
        <Link href="/" className={`${styles.logoWrapper}`} title="tsirwah-quran">
          <Image
            src="/images/logo/tsirwah-logo.png"
            alt="tsirwah-quran"
            width={120}
            height={40}
            quality={100}
          />
        </Link>
      )}
      {!isHomePage && (
        <Link href="/" className={`${styles.logoWrapper}`} title="tsirwah-quran">
          <Image src="/icons/FaHome.svg" alt="tsirwah-quran" width={70} height={28} quality={100} />
        </Link>
      )}
    </>
  );
};

export default NavbarLogoWrapper;

// change this
