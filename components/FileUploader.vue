<template>
  <div>
    <div>
      <label>
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
    </div>
    <div>
      <button class="sc-button sc-button-primary" v-on:click="submitFiles()" :disabled="files.length == 0">
        {{ actionButtonTitle }}
      </button>
      <button class="sc-button uk-margin-medium-top" v-on:click="addFiles()">{{ fileChooserButtonTitle }}</button>
    </div>
    <div class="uk-margin-medium-top">
      <div class="uk-flex uk-flex-center uk-margin-small-bottom uk-text-small" v-for="(file, key) in files" :key="key">
          <span class="uk-badge md-bg-blue-600">{{ file.name }}</span>
          <span v-if="showRemoveFileButton" class="uk-label uk-label-danger uk-margin-small-left" v-on:click="removeFile(key)">TA BORT</span>
      </div>
      <progress v-if="isLoading == true" class="uk-width-1-1" max="100" :value.prop="uploadPercentage"></progress>
    </div>
  </div>
</template>

<script>

export default {
    props: {
      postUrl: {
        type: String,
        default: '/someFolder/someMethod'
      },
      actionButtonTitle: {
        type: String,
        default: 'LADDA UPP'
      },
      fileChooserButtonTitle: {
        type: String,
        default: 'VÄLJ FIL'
      },
      showRemoveFileButton: {
        type: Boolean,
        default: true
      },
    },
    data(){
      return {
        files: [],
        uploadPercentage: 0,
		    isLoading: false,
      }
    },
    methods: {
      /* Adds a file */
      addFiles() {
        this.$refs.files.click()
      },
      /* Submits files to the server */
      async submitFiles() {
        let _this = this
        _this.isLoading = true
        /* Initialize the form data */
        let formData = new FormData();
        /* Iterate over any file sent over appending the files to the form data. */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i]
          formData.append('files[' + i + ']', file)
        }

        /* Make the request to the POST /select-files URL */
        await this.$axios.$post(this.postUrl, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ))
            }.bind(this)
        }
        ).then(function(response){
          _this.postUpload(response)
          _this.isLoading = false
          _this.files = []
        })
        .catch(function(error){
            console.log(error)
        })
        },
        postUpload(response) {
            let _this = this
            _this.$emit('postUpload', response)
        },
      /* Handles the uploading of files */
        handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files
        /* Adds the uploaded file to the files array */
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
      /* Removes a select file the user has uploaded */
      removeFile( key ){
        this.files.splice( key, 1 )
      }
    }
  }
</script>
<style lang="scss">
  input[type="file"] {
    position: absolute;
    top: -2000px;
  }
</style>
