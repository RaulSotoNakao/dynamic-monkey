<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-banner
          color="accent"
          elevation="12"
          icon="mdi-database"
          rounded
          single-line
        >
          {{
            selectedLabel +
            " -> " +
            JSON.stringify(this.selectedData[selectedLabel])
          }}
        </v-banner>
      </v-col>
      <v-col cols="12">
        <v-btn  color="primary">
          <v-icon dark> mdi-file-replace-outline  </v-icon> Remplazar texto seleccionado o posicion del cursor
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-text-field
          append-outer-icon="mdi-find-replace"
          :label="`Buscar  y remplazar por el dato ${selectedLabel}!`"
          type="text"
          @click:append-outer="findAndReplace()"
          :color="'primary'"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-sheet
      id="my-code-editor"
      ref="code-editor"
      class="mx-2 px-2"
      style="min-height: 13rem"
      color="grey darken-2"
      elevation="1"
      rounded
      contentEditable="true"
      spellcheck="false"
      @click="handleEditor"
      @select="handleEditor"
      @mouseup="handlerMouseDown"
    >
      {{ this.template }}
    </v-sheet>
    <v-btn color="primary" class="mx-2" @click="() => saveTemplate()">
      Guardar template
      <v-icon right> mdi-content-save </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    updater: { type: Number, required: true },
    selectedFile: { type: Object, required: true },
    selectedData: { type: Object, default: () => ({}) },
  },
  data: () => ({
    template: "",
  }),
  computed: {
    selectedLabel() {
      const keys = this.selectedData ? Object.keys(this.selectedData) : [];
      return keys.length ? `${keys[0]}` : "";
    },
  },
  methods: {
    findAndReplace() {
      this.template;
    },
    saveTemplate() {
      const dataList = document.getElementById("my-code-editor");
      const TEXT_NODE = 3;
      let mustacheTemplate = "";
      for (let i = 0; i < dataList.childNodes.length; i++) {
        let item = dataList.childNodes[i];

        if (TEXT_NODE === item.nodeType) {
          console.log(item.nodeValue);
        } else if (item.className.includes("item")) {
          console.log(item);
        }
      }
      // raul mejor a partir de un template de mustache
      // crear una lista con elementos y texto chuloski
      // renderizas eso con component de vue
      //
      // cuando añadas elementos... los añades a la lista chula...
      // para añadirlos haz calculos de separar texto y añadir componentes o cositas asín
      // para guardar same :)
      //
      // luego ya dónde sea tu tendrás tu metodo que parsea eso a mustache o lo que quieras usar men :)
      console.log(mustacheTemplate);
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
    handlerMouseDown(evt) {
      if (evt.which === 3) {
        console.log("clickDerecho");
        console.log(window.getSelection().toString());
        console.log(this.getCaretCharacterOffsetWithin(evt.target));
        window.getSelection().empty();
      }
    },
    handleEditor(ev) {
      console.log(ev);
    },
    onNewTemplate(tem) {
      this.template = tem;
    },
  },
  mounted() {
    this.onNewTemplate(this.selectedFile.template);
  },
  watch: {
    updater() {
      this.onNewTemplate(this.selectedFile.template);
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
