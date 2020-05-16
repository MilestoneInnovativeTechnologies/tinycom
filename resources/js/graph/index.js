import Vue from "vue";

import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'
import Tooltip from 'vue-graph/src/widgets/tooltip'

import Bar from 'vue-graph/src/components/bar'
import Line from 'vue-graph/src/components/line'


Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);
Vue.component(Tooltip.name, Tooltip);

Vue.component(Bar.name, Bar);
Vue.component(Line.name, Line);