import { useContext } from 'react';

import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { shallowEqual, useSelector } from 'react-redux';
import useSWR from 'swr';

import { ReadingGoalTabProps } from './hooks/useReadingGoalReducer';
import styles from './ReadingGoalPage.module.scss';

import DataContext from '@/contexts/DataContext';
import HoverablePopover from '@/dls/Popover/HoverablePopover';
import Spinner from '@/dls/Spinner/Spinner';
import { selectQuranFont, selectQuranMushafLines } from '@/redux/slices/QuranReader/styles';
import {
  CreateGoalRequest,
  EstimatedGoalDay,
  RangeEstimatedQuranGoalDay,
  QuranGoalPeriod,
  GoalType,
  GoalCategory,
} from '@/types/auth/Goal';
import { Mushaf } from '@/types/QuranReader';
import { getMushafId } from '@/utils/api';
import { estimateReadingGoal } from '@/utils/auth/api';
import { makeEstimateReadingGoalUrl } from '@/utils/auth/apiPaths';
import { getChapterData } from '@/utils/chapter';
import { dateToReadableFormat, secondsToReadableFormat, getFullDayName } from '@/utils/datetime';
import { toLocalizedNumber } from '@/utils/locale';
import { convertNumberToDecimal } from '@/utils/number';
import { parseVerseRange } from '@/utils/verseKeys';

const makePayload = (state: ReadingGoalTabProps['state'], mushafId: Mushaf): CreateGoalRequest => {
  const payload: CreateGoalRequest = {
    mushafId,
    type: state.type,
    amount: {
      [GoalType.PAGES]: state.pages,
      [GoalType.TIME]: state.seconds,
      [GoalType.RANGE]: `${state.rangeStartVerse}-${state.rangeEndVerse}`,
    }[state.type],
    category: GoalCategory.QURAN,
  };

  if (state.period === QuranGoalPeriod.Continuous) payload.duration = state.duration;

  return payload;
};

const ReadingGoalWeekPreviewTab: React.FC<ReadingGoalTabProps> = ({ state, nav }) => {
  const { t, lang } = useTranslation('reading-goal');
  const chaptersData = useContext(DataContext);

  const quranFont = useSelector(selectQuranFont, shallowEqual);
  const mushafLines = useSelector(selectQuranMushafLines, shallowEqual);
  const { mushaf } = getMushafId(quranFont, mushafLines);

  const payload = makePayload(state, mushaf);
  const { data, isValidating } = useSWR(
    makeEstimateReadingGoalUrl(payload),
    () => estimateReadingGoal(payload),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    },
  );

  const getDailyAmount = (idx: number) => {
    const { type } = state;
    const day = data.data.week[idx];

    if (type === GoalType.RANGE) {
      const range = day.amount as string;

      const [
        { chapter: startingChapter, verse: startingVerse },
        { chapter: endingChapter, verse: endingVerse },
      ] = parseVerseRange(range);

      const startingChapterName = getChapterData(chaptersData, startingChapter).transliteratedName;
      const endingChapterName = getChapterData(chaptersData, endingChapter).transliteratedName;

      return (
        <div className={styles.rangePreview}>
          <p>
            {t('reciter:read')} {startingChapterName}{' '}
            {toLocalizedNumber(Number(startingVerse), lang)}
          </p>
          <p>
            {t('common:to').toLowerCase()} {endingChapterName}{' '}
            {toLocalizedNumber(Number(endingVerse), lang)}
          </p>
        </div>
      );
    }

    const numberAmount = day.amount as number;
    if (type === GoalType.TIME) {
      return `${t('reciter:read')} ${secondsToReadableFormat(numberAmount, t, lang)}`;
    }

    const pages = convertNumberToDecimal(numberAmount, 2);
    return `${t('reciter:read')} ${t('x-pages', {
      count: pages,
      pages: toLocalizedNumber(pages, lang),
    })}`;
  };

  const getSkeleton = () => {
    return Array.from({
      length: Math.min(state.period === QuranGoalPeriod.Continuous ? state.duration : 7, 7),
      // eslint-disable-next-line @typescript-eslint/naming-convention
    }).map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={idx} className={styles.dayPreview}>
        <Spinner />
      </li>
    ));
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{t('preview-schedule.title')}</h1>
        <p className={styles.subtitle}>{t('preview-schedule.description')}</p>
      </div>
      <ol className={classNames(styles.optionsContainer, styles.previewWrapper)}>
        {isValidating
          ? getSkeleton()
          : data.data.week.map(
              (day: EstimatedGoalDay | RangeEstimatedQuranGoalDay, idx: number) => {
                const date = new Date(day.date);

                return (
                  <li key={day.date} className={styles.dayPreview}>
                    <HoverablePopover content={dateToReadableFormat(date, lang)}>
                      <h3>{getFullDayName(date, lang)}</h3>
                    </HoverablePopover>

                    <p>{getDailyAmount(idx)}</p>
                  </li>
                );
              },
            )}

        {nav}
      </ol>
    </>
  );
};

export default ReadingGoalWeekPreviewTab;
