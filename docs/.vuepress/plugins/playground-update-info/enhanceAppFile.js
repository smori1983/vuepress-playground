import PlaygroundUpdateInfoList from './components/PlaygroundUpdateInfoList';
import PlaygroundUpdateInfoDebug from './components/PlaygroundUpdateInfoDebug';

export default ({Vue}) => {
  Vue.component('PlaygroundUpdateInfoList', PlaygroundUpdateInfoList);
  Vue.component('PlaygroundUpdateInfoDebug', PlaygroundUpdateInfoDebug);
}
