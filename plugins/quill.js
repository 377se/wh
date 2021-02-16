import Vue from 'vue'
import Quill from 'quill';
import VueQuillEditor from 'vue-quill-editor/dist/ssr'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import ImageResize from '@taoqf/quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

Vue.use(VueQuillEditor, /* { default global options } */);
