import Vue from "vue";

import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'
import Tooltip from 'vue-graph/src/widgets/tooltip'
import Guideline from 'vue-graph/src/widgets/guideline'

import Bar from 'vue-graph/src/components/bar'
import Line from 'vue-graph/src/components/line'
import Area from 'vue-graph/src/components/area'
import Stackbar from 'vue-graph/src/components/stackbar'


Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Guideline.name, Guideline);

Vue.component(Bar.name, Bar);
Vue.component(Line.name, Line);
Vue.component(Area.name, Area);
Vue.component(Stackbar.name, Stackbar);
