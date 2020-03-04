<template>
  <form>
      <h2>ファイルアップロード</h2>
      <div id="upload" class="form-group commonStyle" v-bind:class="{'styleA':styleA, 'styleB':styleB}" @dragover.prevent="changeStyle($event,'ok')" @dragleave.prevent="changeStyle($event,'no')" @drop.prevent="selectedFile($event)">
        <input @change="selectedFile($event)" type="file" name="file" style="display:none;">
        <input type="hidden" name="file_id" :value="file_id" />
        <!-- ここからプレビュー機能の部分 -->
        <p>画像ID-{{ file_id }} を更新するファイルをドラッグ＆ドロップ</p>
        <img v-show="preview" v-bind:src="preview" style="max-height: 100px;max-width: 200px;">
        <p v-show="preview"> {{name}} </p>
        <!-- ここまでプレビュー機能の部分 -->
      </div>
      <button class="button" type="button" @click="upload">投稿する</button>
  </form>
</template>

<script>
export default {
  name: "Upload",
  props: {
    file_id: Number,
  },
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
  methods: {
    selectedFile: function(event) {
      this.styleA = true;
      this.styleB = false;

      // 選択された File の情報を保存しておく
      event.preventDefault();
      //let files = e.target.files;
      const files = event.target.files ? event.target.files : event.dataTransfer.files;
      this.uploadFile = files[0];
      console.log(this.uploadFile)
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
      console.log(123)
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
        .finally(() => {
          this.scrollToEnd();
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
  }
};
</script>
<style scoped lang="scss">
.commonStyle{
  padding:10px; text-align:center; margin:10px;;
}
.styleA{border:3px dotted gray;}
.styleB{border:3px dotted rgba(0,200,0,0.7);}
.button{border:1px solid green; padding:3px; border-radius:5px; background-color:white;cursor: pointer;}
.button p {color:green; margin-top:10px; margin-left:10px; margin-right: 10px;}
</style>
