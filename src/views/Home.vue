<template>
  <div id="wrapper">
    <h1>Versioning Me</h1>
    <div id="channels">
      <div class="sub-header">
        <h2>チャンネル一覧</h2>
      </div>
      <div class="channels-content">
        チャンネルコンテンツ
      </div>
    </div>
    <div id="files">
      <div class="sub-header">
        <h2>ファイル一覧</h2>
      </div>
      <div class="files-content" ref="target">
        <div class="files" v-for="(files, index) in info" :key="index">
          {{ files.VersionName }}<br>
          <img :src="files.Url" style="max-width: 200px;">
        </div>
      </div>
      <div class="files-form" ref="target">
        <form>
            <h2>ファイルアップロード</h2>
            <div id="upload" class="form-group commonStyle" v-bind:class="{'styleA':styleA, 'styleB':styleB}" @dragover.prevent="changeStyle($event,'ok')" @dragleave.prevent="changeStyle($event,'no')" @drop.prevent="selectedFile($event)">
              <input @change="selectedFile($event)" type="file" name="file" style="display:none;">
              <!-- ここからプレビュー機能の部分 -->
              <p>またはここに画像ファイルをドラッグ＆ドロップ</p>
              <img v-show="preview" v-bind:src="preview" style="width:300px;">
              <p v-show="preview"> {{name}} </p>
              <!-- ここまでプレビュー機能の部分 -->
            </div>
            <button class="button" type="button" @click="upload">投稿する</button>
        </form>
      </div>
    </div>
    <div id="versions">
      <div class="sub-header">
        <h2>バージョン一覧</h2>
      </div>
      <div class="versions-content">
        バージョンコンテンツ
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      preview: "",
      name: "",
      styleA: true,
      styleB: false,
      uploadFile: null,
      info: null
    };
  },
  mounted() {
    this.getFiles();
    this.scrollToEnd();
  },
  updated() {
    this.scrollToEnd();
  },
methods: {
    scrollToEnd() {
      this.$nextTick(() => {
          const chatLog = this.$refs.target
          if (!chatLog) return
          chatLog.scrollTop = chatLog.scrollHeight
        })
    },
    moveToTop() {
      const duration = 1000;  // 移動速度（1秒で終了）
      const interval = 25;    // 0.025秒ごとに移動
      const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
      const timer = setInterval(() => {
        window.scrollBy(0, step);   // スクロール位置を移動
        if(window.scrollY <= 0) {
          clearInterval(timer);
        }
      }, interval);

    },
    getFiles() {
      this.axios
        .get("http://localhost:8080/files")
        .then(response => (this.info = response.data.files))
    },
    selectedFile: function(event) {
      this.styleA = true;
      this.styleB = false;
      
      // 選択された File の情報を保存しておく
      event.preventDefault();
      //let files = e.target.files;
      const files = event.target.files ? event.target.files : event.dataTransfer.files;
      this.uploadFile = files[0];

      //const file = files[0];
      const reader = new FileReader();
      reader.onload = event => {
          this.preview = event.target.result;
      };
      reader.readAsDataURL(this.uploadFile);
      this.name = files[0].name;
      //document.getElementById("upload_image").files = files;
    },
    //ファイル送信処理
    upload:function(){
      // FormData を利用して File を POST する
      let formData = new FormData();
      formData.append('file', this.uploadFile);
      console.log(this.uploadFile)
      let config = {
          withCredentials: true,
          headers: {
            'content-type': 'multipart/form-data'
          }
      };
      this.axios
        .post('http://localhost:8080/file', formData, config)
        //.then(response => (this.info = response.data.files))
        .then((response) => {
          this.info = response.data.files;
          this.preview = "";
          this.name = "";
        })
        // .then(function(response) {
        //   // response 処理
        //   console.log("success")
        //   console.log(response)
        //   //this.getFiles()
        // })
        .catch(function(error) {
          // error 処理
          console.log("error")
          console.log(error)
        })
    },
    changeStyle: function(event,flag){
      if(flag=='ok'){
          this.styleA = false;
          this.styleB = true;
      }else{
          this.styleA = true;
          this.styleB = false;
      }
    },
  },
};
</script>
