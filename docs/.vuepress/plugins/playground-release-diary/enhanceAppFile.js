import PlaygroundReleaseDiaryIndex from './components/PlaygroundReleaseDiaryIndex';
import PlaygroundReleaseDiaryDateIndex from './components/PlaygroundReleaseDiaryDateIndex';
import PlaygroundReleaseDiaryNameIndex from './components/PlaygroundReleaseDiaryNameIndex';
import PlaygroundReleaseDiaryBackLink from './components/PlaygroundReleaseDiaryBackLink';

export default ({Vue}) => {
  Vue.component('PlaygroundReleaseDiaryIndex', PlaygroundReleaseDiaryIndex);
  Vue.component('PlaygroundReleaseDiaryDateIndex', PlaygroundReleaseDiaryDateIndex);
  Vue.component('PlaygroundReleaseDiaryNameIndex', PlaygroundReleaseDiaryNameIndex);
  Vue.component('PlaygroundReleaseDiaryBackLink', PlaygroundReleaseDiaryBackLink);
};
