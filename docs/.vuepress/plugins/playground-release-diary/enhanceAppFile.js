import PlaygroundReleaseDiaryIndex from './components/PlaygroundReleaseDiaryIndex';
import PlaygroundReleaseDiaryDateIndex from './components/PlaygroundReleaseDiaryDateIndex';
import PlaygroundReleaseDiaryBackLink from './components/PlaygroundReleaseDiaryBackLink';

export default ({Vue}) => {
  Vue.component('PlaygroundReleaseDiaryIndex', PlaygroundReleaseDiaryIndex);
  Vue.component('PlaygroundReleaseDiaryDateIndex', PlaygroundReleaseDiaryDateIndex);
  Vue.component('PlaygroundReleaseDiaryBackLink', PlaygroundReleaseDiaryBackLink);
};
