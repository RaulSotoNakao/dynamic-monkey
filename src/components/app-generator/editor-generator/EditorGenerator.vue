<template>
  <c-container v-show="selectedTemplate.name">
    <template v-slot:header>
      <v-row>
        <v-col :cols="12" :md="4"> {{ selectedTemplate.name }}</v-col>
        <v-col class="d-flex justify-end" :md="8">
          <v-btn
            v-if="!render.active"
            class="mx-2 primary"
            @click="() => renderTemplate()"
          >
            <span class="background--text"> renderizado </span>

            <v-icon right color="background"> mdi-eye </v-icon>
          </v-btn>
          <v-btn
            v-if="render.active"
            class="mx-2 primary"
            @click="() => (render.active = false)"
          >
            <span class="background--text"> mostrar template </span>

            <v-icon right color="background"> mdi-eye </v-icon>
          </v-btn>

          <v-btn class="mx-2 primary" @click="() => saveTemplate()">
            <span class="background--text"> Guardar template </span>
            <v-icon right color="background"> mdi-content-save </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <v-container>
      <v-row v-show="!!selectedLabel">
        <v-col cols="12">
          <v-banner color="primary" rounded single-line>
            <v-icon right color="background"> mdi-database </v-icon>

            <span class="background--text">
              {{ selectedLabel + " -> " + JSON.stringify(parsedData) }}
            </span>
          </v-banner>
        </v-col>
        <v-col cols="12">
          <v-text-field
            append-outer-icon="mdi-find-replace"
            :label="`Buscar ${
              stringToReplace ? `'${stringToReplace}'` : 'texto'
            } y remplazar por el dato ${selectedLabel}!`"
            type="text"
            @click:append-outer="findAndReplace()"
            :color="'primary'"
            v-model="stringToReplace"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-textarea
        v-if="!render.active"
        counter
        auto-grow
        label="Template"
        v-model="template"
      ></v-textarea>
      <v-textarea
        v-else
        counter
        auto-grow
        label="Template"
        :value="render.template"
      ></v-textarea>

      <!-- <v-sheet
            id="my-code-editor"
            ref="code-editor"
            class="mx-2 px-2"
            style="min-height: 13rem"
            color="grey darken-2"
            elevation="1"
            rounded
            contentEditable="true"
            spellcheck="false"
          >
            {{ this.template }}
          </v-sheet> -->
    </v-container>
  </c-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Mustache from "mustache";
export default {
  props: {},
  data: () => ({
    template: "",
    stringToReplace: "",
    render: {
      active: false,
      template: "",
    },
  }),
  computed: {
    ...mapGetters(["selectedData", "selectedTemplate", "selectedGenerator"]),
    selectedLabel() {
      const keys = this.selectedData ? Object.keys(this.selectedData) : [];
      return keys.length ? `${keys[0]}` : "";
    },
    parsedData() {
      const keys = this.selectedData ? Object.values(this.selectedData) : [];
      const label = Array.isArray(keys[0]) ? Object.keys(keys[0][0]) : keys[0];

      return label;
    },
  },
  methods: {
    ...mapActions(["UPDATE_SELECTED_GENERATOR"]),

    renderTemplate() {
      this.render.active = true;
      this.render.template = Mustache.render(
        this.template,
        this.selectedGenerator.templateDefinitions
      );
    },
    saveTemplate() {
      const newTemplateList = this.recursiveUpdateTemplate(
        this.selectedGenerator.templatesList,
        this.selectedTemplate.id
      );
      window.ipc
        .UPDATE_GENERATOR({
          ...this.selectedGenerator,
          templatesList: newTemplateList,
        })
        .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
        .then((payload) => {
          this.UPDATE_SELECTED_GENERATOR(payload.content);
        });
    },
    recursiveUpdateTemplate(list, id) {
      return list.map((item) => {
        if (item.id === id) {
          item.template = this.template;
        } else if (item.children && item.children.length) {
          item.children = this.recursiveUpdateTemplate(item.children, id);
        }
        return item;
      });
    },

    findAndReplace() {
      const isArray = Array.isArray(this.selectedData[this.selectedLabel]);
      const stringToReplace = isArray
        ? `
        {{#${this.selectedLabel}}}
        ${Object.keys(this.selectedData[this.selectedLabel][0])
          .map((key) => `{{${key}}}`)
          .join(" ")}
        {{/${this.selectedLabel}}}
        `
        : `{{${this.selectedLabel}}}`;

      this.template = this.template.replace(
        this.stringToReplace,
        stringToReplace
      );
    },
    getCaretCharacterOffsetWithin(element) {
      var caretOffset = 0;
      var doc = element.ownerDocument || element.document;
      var win = doc.defaultView || doc.parentWindow;
      var sel;
      if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
          var range = win.getSelection().getRangeAt(0);
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length;
        }
      } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
      }
      return caretOffset;
    },
    onNewTemplate(tem) {
      this.template = tem;
    },
  },
  mounted() {
    this.onNewTemplate(this.selectedTemplate.template);
  },
  watch: {
    "selectedTemplate.template"() {
      this.onNewTemplate(this.selectedTemplate.template);
    },
  },
};
</script>

<style scoped>
::selection {
  background-color: aliceblue;
  color: #000;
}
</style>
