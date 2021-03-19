<template>
  <div>
    <div>
      <label>
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
    </div>
    <div>
      <div class="uk-flex uk-margin-small-bottom" v-for="(file, key) in files" :key="key">
          <span class="uk-badge md-bg-blue-600">{{ file.name }}</span>
          <span class="uk-label uk-label-danger uk-margin-small-left" v-on:click="removeFile(key)">Remove</span>
      </div>
    </div>
    <br>
    <div>
      <button class="uk-button" v-on:click="addFiles()">Välj bilder</button>
    </div>
    <br>
    <div >
      <button class="uk-button" v-on:click="submitFiles()">LADDA UPP</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
        articleImages: Array,
    },
    data(){
      return {
        files: []
      }
    },
    methods: {
      /* Adds a file */
      addFiles() {
        this.$refs.files.click()
      },
      /* Submits files to the server */
      submitFiles() {
          let _this = this
        /* Initialize the form data */
        let formData = new FormData();
        /* Iterate over any file sent over appending the files to the form data. */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i]
          formData.append('files[' + i + ']', file)
        }
        /* Make the request to the POST /select-files URL */
        this.$axios.$post('/webapi/Image/PostUploadImage?imageTypeId=1&id=' + this.$route.params.id,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(response){
            _this.updateArticleImages(response)
        })
        .catch(function(error){
            console.log(error);
        })
        },
        updateArticleImages(response) {
            this.$emit('updateArticleImages', response)
        },
      /* Handles the uploading of files */
        handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        /* Adds the uploaded file to the files array */
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
      /* Removes a select file the user has uploaded */
      removeFile( key ){
        this.files.splice( key, 1 );
      }
    }
  }
</script>
<style lang="scss">
  input[type="file"] {
    position: absolute;
    top: -1000px;
  }
</style>
