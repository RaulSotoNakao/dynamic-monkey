<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <canvas id="canvas" v-bind="attrs" v-on="on" width="300" height="300">
      </canvas>
    </template>

    <span
      >https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Basic_animations</span
    >
  </v-tooltip>
</template>

<script>
export default {
  data: () => ({
    template: "",
    ctx: null,
    id: null,
  }),
  mounted() {
    var sun = new Image();
    var moon = new Image();
    var earth = new Image();

    const init = () => {
      sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
      moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
      earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";
      window.requestAnimationFrame(draw);
    };

    const draw = () => {
      this.ctx = document.getElementById("canvas").getContext("2d");

      this.ctx.globalCompositeOperation = "destination-over";
      this.ctx.clearRect(0, 0, 300, 300); // limpiar canvas

      this.ctx.fillStyle = "rgba(0,0,0,0.4)";
      this.ctx.strokeStyle = "rgba(0,153,255,0.4)";
      this.ctx.save();
      this.ctx.translate(150, 150);

      // La tierra
      var time = new Date();
      this.ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      );
      this.ctx.translate(105, 0);
      this.ctx.fillRect(0, -12, 50, 24); // Sombra
      this.ctx.drawImage(earth, -12, -12);

      // La luna
      this.ctx.save();
      this.ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      );
      this.ctx.translate(0, 28.5);
      this.ctx.drawImage(moon, -3.5, -3.5);
      this.ctx.restore();

      this.ctx.restore();

      this.ctx.beginPath();
      this.ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
      this.ctx.stroke();

      this.ctx.drawImage(sun, 0, 0, 300, 300);

      window.requestAnimationFrame(draw);
    };

    init();
  },
  beforeDestroy() {
    function cancelAllAnimationFrames() {
      var id = window.requestAnimationFrame(function () {});
      while (id--) {
        window.cancelAnimationFrame(id);
      }
    }
    cancelAllAnimationFrames();
  },
};
</script>
