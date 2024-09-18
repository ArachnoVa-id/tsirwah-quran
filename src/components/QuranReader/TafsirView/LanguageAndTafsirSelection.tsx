import classNames from 'classnames';

import styles from './TafsirView.module.scss';

import Button, { ButtonSize } from '@/dls/Button/Button';
import Select, { SelectSize } from '@/dls/Forms/Select';
import Skeleton from '@/dls/Skeleton/Skeleton';
import SpinnerContainer from '@/dls/Spinner/SpinnerContainer';
import { getLocaleNameByFullName } from '@/utils/locale';
import { TafsirsResponse } from 'types/ApiResponses';

type LanguageAndTafsirSelectionProps = {
  selectedTafsirIdOrSlug: number | string;
  onTafsirSelected: (tafsirId: number, tafsirSlug: string) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  languageOptions: string[];
  data: TafsirsResponse;
  isLoading: boolean;
};
const LanguageAndTafsirSelection = ({
  selectedTafsirIdOrSlug,
  onTafsirSelected,
  selectedLanguage,
  onSelectLanguage,
  languageOptions,
  data,
  isLoading,
}: LanguageAndTafsirSelectionProps) => {
  if (!data) {
    return (
      <Skeleton className={classNames(styles.tafsirSkeletonItem, styles.tafsirSelectionSkeleton)} />
    );
  }
  const options = [
    { label: 'Indonesian', value: 'indonesian' },
    ...languageOptions
      .filter((lng) => lng === 'arabic')
      .map((lng) => ({
        label: getLocaleNameByFullName(lng),
        value: lng,
      })),
  ];

  const customTafsir = [
    {
      id: 820,
      name: 'Tafsir Ringkas Kemenag',
      authorName: 'Kementrian Agama Republik Indonesia',
      slug: 'id-tafsir-ringkas-kemenag',
      languageName: 'indonesian',
      translatedName: {
        name: 'Tafsir Ringkas Kemenag',
        languageName: 'indonesian',
      },
    },
    {
      id: 821,
      name: 'Tafsir Tahlili',
      authorName: 'Kementrian Agama Republik Indonesia',
      slug: 'id-tafsir-tahlili',
      languageName: 'indonesian',
      translatedName: {
        name: 'Tafsir Tahlili',
        languageName: 'indonesian',
      },
    },
  ];

  return (
    <SpinnerContainer isLoading={isLoading}>
      <div className={styles.tafsirSelectionContainer}>
        <Select
          className={styles.languageSelection}
          size={SelectSize.Small}
          id="lang-selection"
          name="lang-selection"
          options={options}
          onChange={onSelectLanguage}
          value={selectedLanguage}
        />
        {[...data.tafsirs, ...customTafsir]
          .filter(
            (tafsir) =>
              tafsir.languageName === selectedLanguage ||
              selectedTafsirIdOrSlug === tafsir.slug ||
              Number(selectedTafsirIdOrSlug) === tafsir.id,
          )
          .map((tafsir) => {
            const selected =
              selectedTafsirIdOrSlug === tafsir.slug ||
              Number(selectedTafsirIdOrSlug) === tafsir.id;
            return (
              <Button
                onClick={() => onTafsirSelected(tafsir.id, tafsir.slug)}
                size={ButtonSize.Small}
                key={tafsir.id}
                className={classNames(styles.tafsirSelectionItem, {
                  [styles.tafsirItemSelected]: selected,
                })}
              >
                {tafsir.translatedName.name}
              </Button>
            );
          })}
      </div>
    </SpinnerContainer>
  );
};

export default LanguageAndTafsirSelection;
